// ===== Theme (light / dark) =====
// The saved choice is applied by a tiny script in each page's <head> so the page
// never flashes the wrong theme. This part wires up the switch.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  function current() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  function label() { btn.lastChild.textContent = current() === 'dark' ? 'Light mode' : 'Dark mode'; }
  label();

  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    label();
  });

  // Follow the system setting until the visitor makes their own choice
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem('theme'); } catch (err) {}
      if (saved) return;
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      label();
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
  }
})();

// ===== Mobile menu =====
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var panel = document.getElementById('site-panel');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', function () {
    var open = panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? 'Close' : 'Menu';
  });
})();

// ===== Home page: schematic Gram-stained field =====
// Pink rods are Gram-negative (Bacteroides, safranin counterstain).
// Violet rods are Gram-positive (Lactiplantibacillus, crystal violet).
// Drawn on a single canvas laid over the static SVG circle. One canvas redraw per
// frame is much steadier than animating ~50 separate SVG elements, which could flicker.
// Positions come from a seeded generator, so the field looks the same every visit.
(function () {
  var canvas = document.getElementById('field-cells');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  var CX = 200, CY = 200, R = 196;
  var CYCLE = 22000;      // ms for one fill, hold, and drain
  var STAGGER = 70;       // ms between one cell and the next

  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var rand = mulberry32(1927);
  function between(a, b) { return a + rand() * (b - a); }

  var placed = [], cells = [];

  function fits(x, y, r) {
    if (Math.hypot(x - CX, y - CY) > R - r - 8) return false;
    if (x > 196 && x < 334 && y > 318 && y < 362) return false; // keep clear of the scale bar
    for (var i = 0; i < placed.length; i++) {
      var p = placed[i];
      if (Math.hypot(x - p.x, y - p.y) < r + p.r) return false;
    }
    return true;
  }
  function add(x, y, len, w, angle, fill) {
    placed.push({ x: x, y: y, r: len * 0.42 });
    cells.push({ x: x, y: y, len: len, w: w, angle: angle * Math.PI / 180, fill: fill, delay: 0 });
  }

  var violets = ['#4a2f8f', '#573a9f'];
  var pinks = ['#c9385f', '#d24a70', '#bd2f57'];

  var seeds = 0, tries = 0;
  while (seeds < 7 && tries < 3000) {
    tries++;
    var len = between(26, 42), w = between(7, 8.5);
    var x = between(40, 360), y = between(40, 360), a = between(0, 180);
    if (!fits(x, y, len * 0.42)) continue;
    var fill = violets[Math.floor(rand() * violets.length)];
    add(x, y, len, w, a, fill);
    seeds++;
    var links = Math.floor(rand() * 3), cx = x, cy = y;
    for (var k = 0; k < links; k++) {
      var rad = a * Math.PI / 180;
      cx += Math.cos(rad) * (len + 3);
      cy += Math.sin(rad) * (len + 3);
      if (!fits(cx, cy, len * 0.42)) break;
      add(cx, cy, len, w, a + between(-6, 6), fill);
    }
  }
  var pinkCount = 0; tries = 0;
  while (pinkCount < 44 && tries < 6000) {
    tries++;
    var l = between(22, 40), wd = between(8.5, 11);
    var px = between(30, 370), py = between(30, 370), pa = between(0, 180);
    if (!fits(px, py, l * 0.42)) continue;
    add(px, py, l, wd, pa, pinks[Math.floor(rand() * pinks.length)]);
    pinkCount++;
  }
  for (var i = cells.length - 1; i > 0; i--) {   // scatter the order they appear in
    var j = Math.floor(rand() * (i + 1));
    var tmp = cells[i]; cells[i] = cells[j]; cells[j] = tmp;
  }
  cells.forEach(function (c, idx) { c.delay = idx * STAGGER; });

  // Nothing in the field moves, it only fades, so it keeps fading even when the
  // visitor's system asks for reduced motion (that setting is aimed at movement).

  function smooth(x) { return x * x * (3 - 2 * x); }
  // 0 to 16% of the cycle: fade in. 16 to 68%: hold. 68 to 84%: fade out. Rest: empty.
  function alphaAt(t, delay) {
    var p = ((((t - delay) % CYCLE) + CYCLE) % CYCLE) / CYCLE;
    if (p < 0.16) return smooth(p / 0.16);
    if (p < 0.68) return 1;
    if (p < 0.84) return 1 - smooth((p - 0.68) / 0.16);
    return 0;
  }

  function capsule(c) {
    var r = c.w / 2, h = c.len / 2;
    ctx.beginPath();
    ctx.moveTo(-h + r, -r);
    ctx.lineTo(h - r, -r);
    ctx.arc(h - r, 0, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(-h + r, r);
    ctx.arc(-h + r, 0, r, Math.PI / 2, Math.PI * 1.5);
    ctx.closePath();
  }

  function draw(t) {
    var s = canvas.width / 400;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < cells.length; i++) {
      var c = cells[i];
      var a = alphaAt(t, c.delay);
      if (a < 0.003) continue;
      ctx.globalAlpha = a;
      ctx.fillStyle = c.fill;
      ctx.setTransform(s, 0, 0, s, 0, 0);
      ctx.translate(c.x, c.y);
      ctx.rotate(c.angle);
      capsule(c);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function resize() {
    var w = canvas.getBoundingClientRect().width;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.height = Math.max(1, Math.round(w * dpr));
    draw(current);
  }

  var start = performance.now(), current = 0, last = 0, running = false, visible = true;

  function frame(now) {
    if (!running) return;
    if (now - last >= 33) {            // about 30 frames a second is plenty for a slow fade
      last = now;
      current = now - start;
      draw(current);
    }
    requestAnimationFrame(frame);
  }
  function play() {
    if (running || !visible) return;
    running = true;
    requestAnimationFrame(frame);
  }
  function stop() { running = false; }

  resize();
  window.addEventListener('resize', resize);
  // Re-measure whenever the figure changes size (fonts loading, layout shifts, rotation)
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) play(); else stop();
    }).observe(canvas);
  }
  play();
})();

// ===== Publications: filter by research area =====
(function () {
  var buttons = document.querySelectorAll('.filter');
  if (!buttons.length) return;
  var pubs = document.querySelectorAll('.pub');
  var groups = document.querySelectorAll('.pub-group');
  var status = document.querySelector('.filter-status');

  function apply(filter) {
    var shown = 0;
    pubs.forEach(function (p) {
      var area = p.getAttribute('data-area');
      if (area === 'env') area = 'other'; // "Environmental and other" is one filter
      var show = filter === 'all' || area === filter;
      p.hidden = !show;
      if (show) shown++;
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector('.pub:not([hidden])'); });
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-filter') === filter ? 'true' : 'false');
    });
    status.textContent = filter === 'all' ? '' : shown + (shown === 1 ? ' paper' : ' papers');
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      apply(b.getAttribute('aria-pressed') === 'true' && f !== 'all' ? 'all' : f);
    });
  });
})();