/**
 * Legacy Terrain background — picks a random design preset on each load.
 */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.getElementById("bg-terrain");
  if (!canvas) return;

  var ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var W = 0;
  var H = 0;
  var seed2 = (Math.random() * 233280) | 0 || 77;
  var perm2 = new Uint8Array(512);
  var t = Math.random() * 200;
  var running = true;
  var off = document.createElement("canvas");
  var octx = off.getContext("2d", { alpha: false });
  var driftX = Math.random() * 40;
  var driftY = Math.random() * 40;
  var beamPhase = Math.random() * Math.PI * 2;
  var particlePhase = Math.random() * Math.PI * 2;

  /**
   * Design presets (colors, noise, contour, beams). One is chosen at random per load.
   */
  var DESIGNS = [
    {
      name: "0 Neon Cyan (current)",
      cell: 5,
      speed: 0.022,
      timeScale: 0.145,
      noiseDiv: 30,
      n1Scale: 0.4,
      n2Scale: 0.8,
      n3Scale: 1.6,
      n1Amp: 0.5,
      n2Amp: 0.25,
      n3Amp: 0.15,
      warp: 3,
      contourFreq: 6.5,
      contourWidth: 0.028,
      base: [1, 2, 4],
      lift: [4, 8, 14],
      glow: [8, 70, 110],
      glowBoost: [28, 70, 90],
      beams: 3,
      beamRgb: [65, 221, 238],
      beamMid: [30, 140, 200],
      beamA: [0.014, 0.008],
      particles: 14,
      particleRgb: [120, 230, 245],
      particleA: [0.025, 0.03],
      veil: [0.22, 0.28, 0.4],
      trail: 0.18,
    },
    {
      name: "1 Pixel Cyan",
      // Same terrain scale as #0; larger cells + nearest-neighbor = visible pixels
      cell: 16,
      scaleCell: 5,
      speed: 0.022,
      timeScale: 0.145,
      noiseDiv: 30,
      n1Scale: 0.4,
      n2Scale: 0.8,
      n3Scale: 1.6,
      n1Amp: 0.5,
      n2Amp: 0.25,
      n3Amp: 0.15,
      warp: 3,
      contourFreq: 6.5,
      contourWidth: 0.028,
      base: [1, 2, 4],
      lift: [4, 8, 14],
      glow: [8, 70, 110],
      glowBoost: [28, 70, 90],
      beams: 3,
      beamRgb: [65, 221, 238],
      beamMid: [30, 140, 200],
      beamA: [0.014, 0.008],
      particles: 10,
      particleRgb: [120, 230, 245],
      particleA: [0.025, 0.03],
      veil: [0.22, 0.28, 0.4],
      trail: 0.18,
      pixelated: true,
    },
    {
      name: "2 Magenta Ridges",
      cell: 4,
      speed: 0.02,
      timeScale: 0.12,
      noiseDiv: 26,
      n1Scale: 0.55,
      n2Scale: 1.1,
      n3Scale: 2.2,
      n1Amp: 0.55,
      n2Amp: 0.28,
      n3Amp: 0.18,
      warp: 4.5,
      contourFreq: 9,
      contourWidth: 0.022,
      base: [8, 1, 6],
      lift: [22, 3, 16],
      glow: [90, 10, 70],
      glowBoost: [120, 20, 90],
      beams: 2,
      beamRgb: [255, 36, 224],
      beamMid: [120, 20, 100],
      beamA: [0.02, 0.01],
      particles: 18,
      particleRgb: [255, 140, 220],
      particleA: [0.03, 0.04],
      veil: [0.28, 0.34, 0.48],
      trail: 0.2,
    },
    {
      name: "3 Violet Fog",
      cell: 6,
      speed: 0.016,
      timeScale: 0.09,
      noiseDiv: 38,
      n1Scale: 0.28,
      n2Scale: 0.55,
      n3Scale: 1.1,
      n1Amp: 0.6,
      n2Amp: 0.22,
      n3Amp: 0.12,
      warp: 2,
      contourFreq: 4.2,
      contourWidth: 0.04,
      base: [6, 3, 14],
      lift: [12, 6, 28],
      glow: [40, 20, 100],
      glowBoost: [70, 40, 140],
      beams: 4,
      beamRgb: [158, 124, 255],
      beamMid: [80, 50, 160],
      beamA: [0.018, 0.01],
      particles: 10,
      particleRgb: [190, 170, 255],
      particleA: [0.02, 0.035],
      veil: [0.25, 0.32, 0.46],
      trail: 0.22,
    },
    {
      name: "4 Amber Contours",
      cell: 5,
      speed: 0.024,
      timeScale: 0.16,
      noiseDiv: 28,
      n1Scale: 0.45,
      n2Scale: 0.9,
      n3Scale: 1.8,
      n1Amp: 0.48,
      n2Amp: 0.3,
      n3Amp: 0.16,
      warp: 3.2,
      contourFreq: 7.5,
      contourWidth: 0.025,
      base: [10, 5, 1],
      lift: [28, 14, 3],
      glow: [120, 55, 8],
      glowBoost: [140, 80, 20],
      beams: 3,
      beamRgb: [249, 135, 55],
      beamMid: [180, 80, 20],
      beamA: [0.016, 0.009],
      particles: 12,
      particleRgb: [255, 190, 120],
      particleA: [0.028, 0.035],
      veil: [0.24, 0.3, 0.44],
      trail: 0.16,
    },
    {
      name: "5 Ice Grid",
      cell: 3,
      speed: 0.018,
      timeScale: 0.11,
      noiseDiv: 22,
      n1Scale: 0.7,
      n2Scale: 1.4,
      n3Scale: 2.8,
      n1Amp: 0.4,
      n2Amp: 0.35,
      n3Amp: 0.2,
      warp: 1.2,
      contourFreq: 12,
      contourWidth: 0.018,
      base: [2, 6, 12],
      lift: [6, 16, 28],
      glow: [20, 90, 140],
      glowBoost: [40, 110, 160],
      beams: 5,
      beamRgb: [140, 220, 255],
      beamMid: [40, 120, 180],
      beamA: [0.012, 0.007],
      particles: 22,
      particleRgb: [200, 240, 255],
      particleA: [0.02, 0.03],
      veil: [0.2, 0.26, 0.38],
      trail: 0.14,
    },
    {
      name: "6 Emerald Drift",
      cell: 5,
      speed: 0.019,
      timeScale: 0.13,
      noiseDiv: 32,
      n1Scale: 0.35,
      n2Scale: 0.75,
      n3Scale: 1.5,
      n1Amp: 0.52,
      n2Amp: 0.26,
      n3Amp: 0.14,
      warp: 3.8,
      contourFreq: 5.8,
      contourWidth: 0.03,
      base: [1, 8, 5],
      lift: [3, 22, 12],
      glow: [10, 100, 60],
      glowBoost: [20, 130, 80],
      beams: 3,
      beamRgb: [60, 230, 160],
      beamMid: [20, 140, 90],
      beamA: [0.015, 0.008],
      particles: 16,
      particleRgb: [140, 255, 200],
      particleA: [0.025, 0.035],
      veil: [0.26, 0.32, 0.45],
      trail: 0.19,
    },
    {
      name: "7 Soft Bloom",
      cell: 7,
      speed: 0.014,
      timeScale: 0.08,
      noiseDiv: 42,
      n1Scale: 0.22,
      n2Scale: 0.4,
      n3Scale: 0.85,
      n1Amp: 0.65,
      n2Amp: 0.2,
      n3Amp: 0.1,
      warp: 5.5,
      contourFreq: 3.4,
      contourWidth: 0.055,
      base: [4, 3, 8],
      lift: [10, 8, 18],
      glow: [50, 40, 90],
      glowBoost: [80, 60, 120],
      beams: 2,
      beamRgb: [180, 150, 255],
      beamMid: [100, 80, 160],
      beamA: [0.022, 0.012],
      particles: 8,
      particleRgb: [220, 200, 255],
      particleA: [0.035, 0.04],
      veil: [0.18, 0.24, 0.36],
      trail: 0.26,
    },
    {
      name: "8 Hot Wire",
      cell: 4,
      speed: 0.028,
      timeScale: 0.2,
      noiseDiv: 24,
      n1Scale: 0.6,
      n2Scale: 1.2,
      n3Scale: 2.4,
      n1Amp: 0.45,
      n2Amp: 0.32,
      n3Amp: 0.2,
      warp: 2.5,
      contourFreq: 11,
      contourWidth: 0.016,
      base: [12, 2, 2],
      lift: [30, 4, 4],
      glow: [140, 20, 10],
      glowBoost: [160, 40, 20],
      beams: 4,
      beamRgb: [255, 80, 40],
      beamMid: [180, 40, 20],
      beamA: [0.02, 0.011],
      particles: 20,
      particleRgb: [255, 160, 100],
      particleA: [0.03, 0.04],
      veil: [0.3, 0.36, 0.5],
      trail: 0.12,
    },
    {
      name: "9 Dual Tone",
      cell: 5,
      speed: 0.021,
      timeScale: 0.14,
      noiseDiv: 29,
      n1Scale: 0.42,
      n2Scale: 0.85,
      n3Scale: 1.7,
      n1Amp: 0.5,
      n2Amp: 0.27,
      n3Amp: 0.15,
      warp: 3.6,
      contourFreq: 6.8,
      contourWidth: 0.026,
      base: [3, 2, 10],
      lift: [8, 6, 22],
      glow: [20, 80, 120],
      glowBoost: [100, 40, 140],
      beams: 3,
      beamRgb: [65, 221, 238],
      beamMid: [180, 60, 200],
      beamA: [0.017, 0.01],
      particles: 15,
      particleRgb: [200, 140, 255],
      particleA: [0.025, 0.035],
      veil: [0.23, 0.29, 0.42],
      trail: 0.17,
      dualGlow: true,
    },
    {
      name: "10 Sparse Lines",
      cell: 6,
      speed: 0.017,
      timeScale: 0.1,
      noiseDiv: 36,
      n1Scale: 0.3,
      n2Scale: 0.6,
      n3Scale: 1.2,
      n1Amp: 0.58,
      n2Amp: 0.24,
      n3Amp: 0.12,
      warp: 2.8,
      contourFreq: 4.8,
      contourWidth: 0.012,
      base: [2, 2, 5],
      lift: [5, 6, 12],
      glow: [15, 90, 130],
      glowBoost: [35, 120, 160],
      beams: 1,
      beamRgb: [90, 200, 230],
      beamMid: [30, 90, 130],
      beamA: [0.01, 0.006],
      particles: 6,
      particleRgb: [160, 220, 240],
      particleA: [0.018, 0.025],
      veil: [0.32, 0.38, 0.52],
      trail: 0.24,
    },
    {
      name: "11 Plasma Field",
      cell: 4,
      speed: 0.026,
      timeScale: 0.18,
      noiseDiv: 25,
      n1Scale: 0.5,
      n2Scale: 1.0,
      n3Scale: 2.0,
      n1Amp: 0.5,
      n2Amp: 0.3,
      n3Amp: 0.18,
      warp: 6,
      contourFreq: 8.5,
      contourWidth: 0.032,
      base: [6, 1, 12],
      lift: [16, 4, 30],
      glow: [70, 20, 130],
      glowBoost: [110, 40, 160],
      beams: 6,
      beamRgb: [200, 80, 255],
      beamMid: [40, 180, 220],
      beamA: [0.018, 0.01],
      particles: 24,
      particleRgb: [255, 120, 220],
      particleA: [0.028, 0.04],
      veil: [0.22, 0.28, 0.42],
      trail: 0.15,
      dualGlow: true,
    },
  ];

  DESIGNS = DESIGNS.map(function (d, i) {
    var beams = [
      [58, 111, 154],
      [74, 130, 176],
      [47, 95, 133],
    ][i % 3];
    return Object.assign({}, d, {
      base: [6, 9, 16],
      lift: [10, 18, 30],
      glow: [18, 48, 78],
      glowBoost: [36, 78, 118],
      beamRgb: beams,
      beamMid: [24, 56, 88],
      particleRgb: [138, 168, 196],
      veil: [0.22, 0.3, 0.44],
    });
  });

  var designIndex = (Math.random() * DESIGNS.length) | 0;
  var D = DESIGNS[designIndex];

  function seededRand2() {
    seed2 = (seed2 * 9301 + 49297) % 233280;
    return seed2 / 233280;
  }

  for (var i = 0; i < 512; i++) perm2[i] = Math.floor(seededRand2() * 256);

  function vn6(x, y) {
    var ix = Math.floor(x);
    var iy = Math.floor(y);
    var fx = x - ix;
    var fy = y - iy;
    var ux = fx * fx * (3 - 2 * fx);
    var uy = fy * fy * (3 - 2 * fy);
    var ixM512 = ((ix % 512) + 512) % 512;
    var iyM512 = ((iy % 512) + 512) % 512;
    var idx1 = (ixM512 + iyM512 * 157) % 512;
    var idx2 = (ixM512 + 1 + iyM512 * 157) % 512;
    var idx3 = (ixM512 + (iyM512 + 1) * 157) % 512;
    var idx4 = (ixM512 + 1 + (iyM512 + 1) * 157) % 512;
    var n1 = perm2[idx1] / 256;
    var n2 = perm2[idx2] / 256;
    var n3 = perm2[idx3] / 256;
    var n4 = perm2[idx4] / 256;
    return n1 * (1 - ux) * (1 - uy) + n2 * ux * (1 - uy) + n3 * (1 - ux) * uy + n4 * ux * uy;
  }

  function fbm6(x, y, oct) {
    var v = 0;
    var a = 0.5;
    var f = 1;
    for (var k = 0; k < oct; k++) {
      v += vn6(x * f, y * f) * a;
      a *= 0.5;
      f *= 2;
    }
    return v;
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paint(true);
  }

  function paint(solid) {
    if (W === 0 || H === 0) return;

    var cell = D.cell;
    var cols = Math.max(1, Math.ceil(W / cell));
    var rows = Math.max(1, Math.ceil(H / cell));
    if (off.width !== cols || off.height !== rows) {
      off.width = cols;
      off.height = rows;
    }

    var to = t * D.timeScale;
    var img = octx.createImageData(cols, rows);
    var data = img.data;
    var p = 0;
    var base = D.base;
    var lift = D.lift;
    var glow = D.glow;
    var glowBoost = D.glowBoost;
    var dual = !!D.dualGlow;

    // scaleCell keeps contour frequency like design 0 even when cell is larger (pixel look)
    var sc = D.scaleCell || cell;

    for (var gy = 0; gy < rows; gy++) {
      for (var gx = 0; gx < cols; gx++) {
        var nX = ((gx * cell) / sc / sc) / D.noiseDiv + driftX;
        var nY = ((gy * cell) / sc / sc) / D.noiseDiv + driftY;
        var n1 = fbm6(nX * D.n1Scale + to, nY * D.n1Scale + to * 0.6, 4) * D.n1Amp;
        var n2 = fbm6(nX * D.n2Scale + to * 0.3, nY * D.n2Scale + to * 0.6, 3) * D.n2Amp;
        var n3 =
          fbm6(nX * D.n3Scale + n1 * D.warp + n2 * 2, nY * D.n3Scale + n1 * 2 + n2 * D.warp, 3) *
          D.n3Amp;
        var val = (n1 + n2 + n3) / 0.9;
        var norm = val * 0.5 + 0.5;

        var r = base[0] + norm * lift[0];
        var g = base[1] + norm * lift[1];
        var b = base[2] + norm * lift[2];

        var contour = Math.abs(Math.sin((n1 * 0.5 + 0.25 + n2 * 4 + n3) * D.contourFreq));
        if (contour < D.contourWidth) {
          var gAmt = 1 - contour / D.contourWidth;
          gAmt *= gAmt;
          if (dual && (gx + gy) % 2 === 0) {
            r = Math.min(255, r + glowBoost[0] + gAmt * glowBoost[0]);
            g = Math.min(255, g + glow[1] * 0.4 + gAmt * glowBoost[1] * 0.5);
            b = Math.min(255, b + glow[2] + gAmt * glowBoost[2]);
          } else {
            r = Math.min(255, r + glow[0] + gAmt * glowBoost[0]);
            g = Math.min(255, g + glow[1] + gAmt * glowBoost[1]);
            b = Math.min(255, b + glow[2] + gAmt * glowBoost[2]);
          }
        }

        data[p++] = r | 0;
        data[p++] = g | 0;
        data[p++] = b | 0;
        data[p++] = 255;
      }
    }

    octx.putImageData(img, 0, 0);

    if (solid) {
      ctx.fillStyle = "#060910";
      ctx.fillRect(0, 0, W, H);
    } else {
      ctx.fillStyle = "rgba(0, 0, 0, " + D.trail + ")";
      ctx.fillRect(0, 0, W, H);
    }

    ctx.imageSmoothingEnabled = !D.pixelated;
    if ("imageSmoothingQuality" in ctx) {
      ctx.imageSmoothingQuality = D.pixelated ? "low" : "medium";
    }
    ctx.drawImage(off, 0, 0, W, H);

    var br = D.beamRgb;
    var bm = D.beamMid;
    for (var lr = 0; lr < D.beams; lr++) {
      var lx = (0.12 + (lr / Math.max(1, D.beams - 1 || 1)) * 0.7 + Math.sin(t * 0.12 + lr * 2.5 + beamPhase) * 0.05) * W;
      if (D.beams === 1) lx = (0.45 + Math.sin(t * 0.12 + beamPhase) * 0.08) * W;
      var lw = 28 + Math.sin(t * 0.28 + lr * 3 + beamPhase) * 8;
      var lGrd = ctx.createLinearGradient(
        lx,
        0,
        lx + lw * 0.25 * Math.sin(t * 0.1 + lr + beamPhase),
        H
      );
      var beamA = D.beamA[0] + D.beamA[1] * Math.sin(t * 0.45 + lr + beamPhase);
      lGrd.addColorStop(0, "rgba(" + br[0] + "," + br[1] + "," + br[2] + "," + beamA + ")");
      lGrd.addColorStop(0.4, "rgba(" + bm[0] + "," + bm[1] + "," + bm[2] + ",0.008)");
      lGrd.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, H);
      ctx.clip();
      ctx.fillStyle = lGrd;
      ctx.beginPath();
      ctx.moveTo(lx - lw / 2, 0);
      ctx.lineTo(lx + lw / 2, 0);
      ctx.lineTo(lx + lw, H);
      ctx.lineTo(lx - lw, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    var pr = D.particleRgb;
    for (var fp = 0; fp < D.particles; fp++) {
      var fpx = (Math.sin(t * 0.09 + fp * 7.3 + particlePhase) * 0.5 + 0.5) * W;
      var fpy = (Math.cos(t * 0.065 + fp * 5.1 + particlePhase) * 0.5 + 0.5) * H;
      var fa = D.particleA[0] + D.particleA[1] * Math.sin(t * 0.38 + fp * 3 + particlePhase);
      if (fa > 0.03) {
        ctx.fillStyle = "rgba(" + pr[0] + "," + pr[1] + "," + pr[2] + "," + fa + ")";
        ctx.beginPath();
        ctx.arc(fpx, fpy, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    var veil = ctx.createLinearGradient(0, 0, 0, H);
    veil.addColorStop(0, "rgba(0, 0, 0, " + D.veil[0] + ")");
    veil.addColorStop(0.5, "rgba(0, 0, 0, " + D.veil[1] + ")");
    veil.addColorStop(1, "rgba(0, 0, 0, " + D.veil[2] + ")");
    ctx.fillStyle = veil;
    ctx.fillRect(0, 0, W, H);
  }

  function frame() {
    if (!running) return;
    paint(Math.floor(t * 30) % 600 >= 590);
    t += D.speed;
    if (t > 1000000) t = 0;
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });
  requestAnimationFrame(frame);
})();
