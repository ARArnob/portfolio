(function () {
  var canvas = document.getElementById('matrix-canvas');
  if (!canvas || !canvas.getContext) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx = canvas.getContext('2d');
  var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
  var fontSize = 15;
  var cols, drops, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.max(1, Math.floor(rect.width / fontSize));
    drops = [];
    for (var i = 0; i < cols; i++) drops[i] = Math.floor(Math.random() * -40);
  }

  function draw() {
    var w = canvas.width / dpr, h = canvas.height / dpr;
    ctx.fillStyle = 'rgba(3, 8, 4, 0.14)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = fontSize + 'px monospace';

    for (var i = 0; i < cols; i++) {
      var ch = chars[Math.floor(Math.random() * chars.length)];
      var x = i * fontSize;
      var y = drops[i] * fontSize;
      if (y >= 0) {
        ctx.fillStyle = '#c9ffd8';
        ctx.fillText(ch, x, y);
        ctx.fillStyle = 'rgba(60, 220, 120, 0.75)';
        ctx.fillText(ch, x, y - fontSize);
      }
      if (y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  resize();
  ctx.fillStyle = '#030804';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (reduceMotion) {
    draw();
  } else {
    setInterval(draw, 60);
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
})();
