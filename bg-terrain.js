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

  /** Two slate presets. Motion differs; colors match the studio UI. */
  var DESIGNS = [
    {
      name: 'slate',
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
      base: [6, 9, 16],
      lift: [10, 18, 30],
      glow: [18, 48, 78],
      glowBoost: [36, 78, 118],
      beams: 3,
      beamRgb: [58, 111, 154],
      beamMid: [24, 56, 88],
      beamA: [0.014, 0.008],
      particles: 14,
      particleRgb: [138, 168, 196],
      particleA: [0.025, 0.03],
      veil: [0.22, 0.3, 0.44],
      trail: 0.18,
    },
    {
      name: 'slate-pixel',
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
      base: [6, 9, 16],
      lift: [10, 18, 30],
      glow: [18, 48, 78],
      glowBoost: [36, 78, 118],
      beams: 3,
      beamRgb: [74, 130, 176],
      beamMid: [24, 56, 88],
      beamA: [0.014, 0.008],
      particles: 10,
      particleRgb: [138, 168, 196],
      particleA: [0.025, 0.03],
      veil: [0.22, 0.3, 0.44],
      trail: 0.18,
      pixelated: true,
    },
  ];

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
