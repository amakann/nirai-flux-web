/**
 * Studio-style demo player: current track card + Presets list.
 * Audio files are named after Nirai Flux presets (kebab-case).
 */
(function () {
  var PRESETS = [
    { id: "kawaii-chat-pop", file: "audio/kawaii-chat-pop.opus", name: "Kawaii Chat Pop" },
    { id: "happy-pikopiko", file: "audio/happy-pikopiko.opus", name: "Happy Pikopiko" },
    { id: "honobono-afternoon", file: "audio/honobono-afternoon.opus", name: "Honobono Afternoon" },
    { id: "lofi-study", file: "audio/lofi-study.opus", name: "Lofi Study" },
    { id: "sparkle-anime-bed", file: "audio/sparkle-anime-bed.opus", name: "Sparkle Anime Bed" },
    { id: "swing-jazz-chat", file: "audio/swing-jazz-chat.opus", name: "Swing Jazz Chat" },
  ];

  var PLAY_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3" fill="currentColor" stroke="none"></polygon></svg>';
  var PAUSE_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>';
  var VOL_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
  var MUTE_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';

  function t(key) {
    var lang = document.documentElement.lang === "en" ? "en" : "ja";
    var dict =
      (window.NF_COPY && window.NF_COPY[lang]) ||
      (typeof COPY !== "undefined" && COPY[lang]) ||
      null;
    return (dict && dict[key]) || key;
  }

  function hashString(input) {
    var h = 2166136261;
    for (var i = 0; i < input.length; i += 1) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  /** Same recipe as frontend/src/lib/artColor.ts */
  function artPaletteForKey(key) {
    var h1 = hashString(key);
    var h2 = hashString(key + "::b");
    var bucket = h1 % 12;
    var hue = (bucket * 30 + (h2 % 24)) % 360;
    var hue2 = (hue + 42 + (h2 % 30)) % 360;
    var sat = 48 + (h1 % 30);
    var glowSat = Math.min(82, sat + 10);
    return {
      glow: "hsl(" + hue + ", " + glowSat + "%, 42%)",
      top: "hsl(" + hue2 + ", " + Math.max(18, sat - 22) + "%, 90%)",
      bottom: "hsl(" + hue + ", " + Math.max(22, sat - 14) + "%, 78%)",
      shape: "hsl(" + hue + ", " + glowSat + "%, 30%)",
    };
  }

  function formatClock(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ":" + String(s).padStart(2, "0");
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function init() {
    var audio = byId("demo-audio");
    var playBtn = byId("demo-play");
    var timeEl = byId("demo-time");
    var waveEl = byId("demo-wave");
    var canvas = waveEl && waveEl.querySelector("canvas");
    var listEl = byId("demo-presets");
    var vol = byId("demo-volume");
    var volIcon = byId("demo-vol-icon");
    var art = byId("demo-art");
    var shape = byId("demo-art-shape");
    if (!audio || !playBtn || !listEl || !canvas) return;

    var currentId = PRESETS[0].id;
    var playing = false;
    var peaks = null;
    var peakToken = 0;
    var durations = {};

    function currentPreset() {
      return PRESETS.find(function (p) {
        return p.id === currentId;
      });
    }

    function applyArt(id) {
      var pal = artPaletteForKey(id);
      art.style.background = [
        "radial-gradient(circle at 50% 110%, " + pal.glow + " 0%, transparent 52%)",
        "linear-gradient(180deg, " + pal.top + " 0%, " + pal.bottom + " 100%)",
      ].join(", ");
      shape.style.background = pal.shape;
    }

    function draw(t, total) {
      var dpr = window.devicePixelRatio || 1;
      var width = canvas.clientWidth || waveEl.clientWidth;
      var height = canvas.clientHeight || waveEl.clientHeight || 64;
      if (!width || !height) return;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      var ctx = canvas.getContext("2d");
      if (!ctx) return;
      var theme = getComputedStyle(document.documentElement);
      var bg = theme.getPropertyValue("--wave-bg").trim() || "#0a121c";
      var played = theme.getPropertyValue("--wave-played").trim() || "#4a82b0";
      var rest = theme.getPropertyValue("--wave-rest").trim() || "#3a5068";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
      var mid = height / 2;
      var count = (peaks && peaks.length) || 240;
      var progress = total > 0 ? t / total : 0;
      for (var i = 0; i < count; i += 1) {
        var amp = peaks ? Math.min(1, peaks[i]) : 0.12;
        var h = Math.max(2, amp * (height * 0.85));
        var x = (i / count) * width;
        var w = Math.max(1.5, width / count - 1);
        ctx.fillStyle = i / count <= progress ? played : rest;
        ctx.fillRect(x, mid - h / 2, w, h);
      }
    }

    function peaksFor(id) {
      var pack = window.NF_WAVE_PEAKS;
      if (pack && pack[id] && pack[id].length) return pack[id];
      return null;
    }

    function loadPeaks(id, src) {
      var baked = peaksFor(id);
      if (baked) {
        peaks = baked;
        draw(audio.currentTime || 0, audio.duration || durations[id] || 1);
        return;
      }
      var token = ++peakToken;
      peaks = null;
      fetch(src)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          var ctx = new AudioContext();
          return ctx.decodeAudioData(buf).then(function (decoded) {
            if (token !== peakToken) {
              ctx.close();
              return;
            }
            var channel = decoded.getChannelData(0);
            var buckets = 240;
            var next = new Float32Array(buckets);
            var block = Math.floor(channel.length / buckets) || 1;
            for (var i = 0; i < buckets; i += 1) {
              var max = 0;
              var start = i * block;
              for (var j = 0; j < block && start + j < channel.length; j += 1) {
                max = Math.max(max, Math.abs(channel[start + j]));
              }
              next[i] = max;
            }
            peaks = next;
            draw(audio.currentTime || 0, audio.duration || decoded.duration || 1);
            ctx.close();
          });
        })
        .catch(function () {});
    }

    function updateTime() {
      var d = Number.isFinite(audio.duration) ? audio.duration : durations[currentId] || 0;
      timeEl.textContent = formatClock(audio.currentTime || 0) + " / " + formatClock(d);
      draw(audio.currentTime || 0, d || 1);
    }

    function refreshLabels() {
      playBtn.setAttribute("aria-label", playing ? t("pause") : t("play"));
      playBtn.textContent = playing ? "❚❚" : "▶";
      listEl.querySelectorAll(".history-item").forEach(function (row) {
        var id = row.dataset.id;
        var isCurrent = id === currentId;
        var btn = row.querySelector(".play-btn");
        if (!btn) return;
        var name = PRESETS.find(function (p) {
          return p.id === id;
        }).name;
        var showPause = isCurrent && playing;
        btn.innerHTML = showPause ? PAUSE_SVG : PLAY_SVG;
        btn.setAttribute("aria-label", (showPause ? t("pause") : t("play")) + " " + name);
      });
    }

    function renderList() {
      listEl.innerHTML = PRESETS.map(function (p) {
        var dur = durations[p.id];
        var sub = dur ? formatClock(dur) : "";
        return (
          '<div class="history-item' +
          (p.id === currentId ? " active" : "") +
          '" data-id="' +
          p.id +
          '" role="button" tabindex="0">' +
          '<button type="button" class="play-btn" aria-label="' +
          t("play") +
          " " +
          p.name +
          '">' +
          PLAY_SVG +
          "</button>" +
          "<div><p>" +
          p.name +
          "</p>" +
          (sub ? '<div class="sub">' + sub + "</div>" : "") +
          "</div></div>"
        );
      }).join("");
      refreshLabels();
    }

    function select(id, shouldPlay) {
      var preset = PRESETS.find(function (p) {
        return p.id === id;
      });
      if (!preset) return;
      var same = currentId === id && audio.src;
      currentId = id;
      byId("demo-title").textContent = preset.name;
      applyArt(id);
      renderList();
      if (!same) {
        audio.src = preset.file;
        audio.load();
        loadPeaks(id, preset.file);
        requestAnimationFrame(function () {
          draw(audio.currentTime || 0, audio.duration || durations[id] || 1);
        });
      }
      if (shouldPlay) {
        var playPromise = audio.play();
        if (playPromise && playPromise.catch) playPromise.catch(function () {});
      }
    }

    function togglePlay() {
      if (!audio.src) select(currentId, true);
      else if (audio.paused) {
        var playPromise = audio.play();
        if (playPromise && playPromise.catch) playPromise.catch(function () {});
      } else audio.pause();
    }

    listEl.addEventListener("click", function (e) {
      var row = e.target.closest(".history-item");
      if (!row) return;
      var id = row.dataset.id;
      if (e.target.closest(".play-btn")) {
        if (id === currentId && playing) {
          audio.pause();
          return;
        }
        select(id, true);
        return;
      }
      select(id, false);
    });

    listEl.addEventListener("keydown", function (e) {
      var row = e.target.closest(".history-item");
      if (!row) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(row.dataset.id, true);
      }
    });

    playBtn.addEventListener("click", togglePlay);

    audio.addEventListener("play", function () {
      playing = true;
      refreshLabels();
    });
    audio.addEventListener("pause", function () {
      playing = false;
      refreshLabels();
    });
    audio.addEventListener("ended", function () {
      playing = false;
      refreshLabels();
    });
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", function () {
      durations[currentId] = audio.duration;
      updateTime();
      renderList();
    });

    waveEl.addEventListener("click", function (e) {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      var rect = waveEl.getBoundingClientRect();
      var ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      audio.currentTime = ratio * audio.duration;
    });
    waveEl.addEventListener("keydown", function (e) {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      var step = e.shiftKey ? 10 : 5;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        audio.currentTime = Math.min(audio.duration, audio.currentTime + step);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - step);
      }
    });

    function syncVolume() {
      var v = Number(vol.value);
      audio.volume = v;
      volIcon.innerHTML = v <= 0.001 ? MUTE_SVG : VOL_SVG;
    }
    vol.addEventListener("input", syncVolume);
    syncVolume();

    window.addEventListener("resize", function () {
      updateTime();
    });
    document.addEventListener("nf-lang", refreshLabels);

    PRESETS.forEach(function (p) {
      var probe = new Audio();
      probe.preload = "metadata";
      probe.src = p.file;
      probe.addEventListener("loadedmetadata", function () {
        durations[p.id] = probe.duration;
        renderList();
      });
    });

    applyArt(currentId);
    renderList();
    select(currentId, false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
