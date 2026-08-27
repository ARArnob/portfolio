(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  // nav gains a background only once the page has scrolled
  var topnav = document.querySelector('.topnav');
  if (topnav) {
    var updateNavBg = function () {
      topnav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', updateNavBg, { passive: true });
    updateNavBg();
  }

  // trailing cursor dot
  var dot = document.getElementById('cursor-dot');
  if (dot && !isCoarse) {
    var mx = innerWidth / 2, my = innerHeight / 2, dx = mx, dy = my;
    window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
    (function raf() {
      if (reduceMotion) { dx = mx; dy = my; }
      else { dx += (mx - dx) * 0.22; dy += (my - dy) * 0.22; }
      dot.style.transform = 'translate(' + dx + 'px,' + dy + 'px) translate(-50%,-50%)';
      requestAnimationFrame(raf);
    })();
  } else if (dot) { dot.style.display = 'none'; }

  // scroll progress bar for the works section
  var worksSection = document.getElementById('works');
  var fill = document.getElementById('progress-fill');
  function updateProgress() {
    var rect = worksSection.getBoundingClientRect();
    var vh = window.innerHeight;
    var total = rect.height + vh;
    var scrolled = vh - rect.top;
    var pct = Math.min(1, Math.max(0, scrolled / total));
    fill.style.width = (pct * 100) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  // dim non-hovered rows in the works list (preview show/hide is pure CSS)
  var listCol = document.getElementById('list-col');
  var rows = listCol.querySelectorAll('.work-row');
  rows.forEach(function (row) {
    row.addEventListener('mouseenter', function () { listCol.classList.add('hovering'); });
    row.addEventListener('focus', function () { listCol.classList.add('hovering'); });
  });
  listCol.addEventListener('mouseleave', function () { listCol.classList.remove('hovering'); });

})();
