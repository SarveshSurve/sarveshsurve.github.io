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
// Positions come from a seeded generator, so the field looks the same every visit.
(function () {
  var group = document.getElementById('cells');
  if (!group) return;

  var NS = 'http://www.w3.org/2000/svg';
  var CX = 200, CY = 200, R = 196;

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

  var placed = [];
  var cells = [];

  function fits(x, y, r) {
    if (Math.hypot(x - CX, y - CY) > R - r - 8) return false;
    // keep clear of the scale bar
    if (x > 196 && x < 334 && y > 318 && y < 362) return false;
    for (var i = 0; i < placed.length; i++) {
      var p = placed[i];
      if (Math.hypot(x - p.x, y - p.y) < r + p.r) return false;
    }
    return true;
  }

  function add(x, y, len, w, angle, fill) {
    placed.push({ x: x, y: y, r: len * 0.42 });
    cells.push({ x: x, y: y, len: len, w: w, angle: angle, fill: fill });
  }

  var violets = ['#4a2f8f', '#573a9f'];
  var pinks = ['#c9385f', '#d24a70', '#bd2f57'];

  // Violet rods first, some in short chains
  var seeds = 0, tries = 0;
  while (seeds < 7 && tries < 3000) {
    tries++;
    var len = between(26, 42), w = between(7, 8.5);
    var x = between(40, 360), y = between(40, 360), a = between(0, 180);
    if (!fits(x, y, len * 0.42)) continue;
    var fill = violets[Math.floor(rand() * violets.length)];
    add(x, y, len, w, a, fill);
    seeds++;
    var links = Math.floor(rand() * 3); // 0 to 2 more cells in the chain
    var cx = x, cy = y;
    for (var k = 0; k < links; k++) {
      var rad = a * Math.PI / 180;
      cx += Math.cos(rad) * (len + 3);
      cy += Math.sin(rad) * (len + 3);
      if (!fits(cx, cy, len * 0.42)) break;
      add(cx, cy, len, w, a + between(-6, 6), fill);
    }
  }

  // Pink rods fill the rest of the field
  var pinkCount = 0;
  tries = 0;
  while (pinkCount < 44 && tries < 6000) {
    tries++;
    var l = between(22, 40), wd = between(8.5, 11);
    var px = between(30, 370), py = between(30, 370), pa = between(0, 180);
    if (!fits(px, py, l * 0.42)) continue;
    add(px, py, l, wd, pa, pinks[Math.floor(rand() * pinks.length)]);
    pinkCount++;
  }

  // Shuffle so the cells appear in a scattered order
  for (var i = cells.length - 1; i > 0; i--) {
    var j = Math.floor(rand() * (i + 1));
    var tmp = cells[i]; cells[i] = cells[j]; cells[j] = tmp;
  }

  cells.forEach(function (c, idx) {
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('transform', 'translate(' + c.x.toFixed(1) + ' ' + c.y.toFixed(1) + ') rotate(' + c.angle.toFixed(1) + ')');
    var r = document.createElementNS(NS, 'rect');
    r.setAttribute('class', 'cell');
    r.setAttribute('x', (-c.len / 2).toFixed(1));
    r.setAttribute('y', (-c.w / 2).toFixed(1));
    r.setAttribute('width', c.len.toFixed(1));
    r.setAttribute('height', c.w.toFixed(1));
    r.setAttribute('rx', (c.w / 2).toFixed(1));
    r.setAttribute('fill', c.fill);
    r.style.animationDelay = (idx * 70) + 'ms';
    g.appendChild(r);
    group.appendChild(g);
  });
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
      // clicking the active filter again goes back to All
      apply(b.getAttribute('aria-pressed') === 'true' && f !== 'all' ? 'all' : f);
    });
  });
})();
