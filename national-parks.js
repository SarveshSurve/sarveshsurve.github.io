// National parks page: map of visited states, photos, and a checklist.
// All data comes from national-parks-data.js.
(function () {
  var NP = window.NP;
  if (!NP) return;

  var ABBR = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado',
    CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
    IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
    ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
    MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
    NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina',
    ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
    RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas',
    UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
    WI: 'Wisconsin', WY: 'Wyoming', DC: 'District of Columbia'
  };
  var FIFTY = Object.keys(ABBR).filter(function (k) { return k !== 'DC'; })
    .map(function (k) { return ABBR[k]; });

  var BY_NAME = {};
  Object.keys(ABBR).forEach(function (k) { BY_NAME[ABBR[k].toLowerCase()] = ABBR[k]; });
  // Accepts "UT", "ut", "Utah" or "utah"
  function stateName(s) {
    var key = String(s).trim();
    return ABBR[key.toUpperCase()] || BY_NAME[key.toLowerCase()] || key;
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function $(id) { return document.getElementById(id); }

  // ----- who is visited -----
  var visited = {};
  (NP.visitedStates || []).forEach(function (s) { visited[stateName(s)] = true; });
  NP.parks.forEach(function (p) {
    if (!p.visited) return;
    p.st.forEach(function (a) { if (ABBR[a]) visited[ABBR[a]] = true; });
  });
  var parksDone = NP.parks.filter(function (p) { return p.visited; }).length;
  var total = NP.parks.length;
  var statesDone = FIFTY.filter(function (n) { return visited[n]; });

  // ----- intro line -----
  $('np-lede').textContent = parksDone
    ? 'I\u2019m working toward visiting all ' + total + ' national parks. So far I\u2019ve been to ' + parksDone + '.'
    : 'I\u2019m working toward visiting all ' + total + ' national parks.';

  // ----- checklist -----
  var list = $('np-list');
  NP.parks.forEach(function (p) {
    var li = el('li', p.visited ? 'visited' : '');
    li.appendChild(el('span', '', p.name));
    li.appendChild(el('small', '', p.st.join(', ')));
    if (p.visited) li.setAttribute('aria-label', p.name + ', visited');
    list.appendChild(li);
  });
  $('np-total').textContent = total;
  $('np-done').textContent = parksDone;

  // ----- photos -----
  var feat = (NP.featured || []);
  var photos = $('np-photos');
  if (!feat.length) {
    $('np-photos-wrap').hidden = true;
  } else {
    feat.forEach(function (f) {
      var li = el('li');
      var fig = el('figure');
      var img = document.createElement('img');
      img.src = f.photo;
      img.alt = f.alt || (f.park + ' National Park');
      img.loading = 'lazy';
      img.addEventListener('error', function () {
        li.remove();
        if (!photos.children.length) $('np-photos-wrap').hidden = true;
      });
      fig.appendChild(img);
      var cap = el('figcaption', '', (f.park + ' National Park') + (f.caption ? '. ' + f.caption : ''));
      fig.appendChild(cap);
      li.appendChild(fig);
      photos.appendChild(li);
    });
  }

  // ----- map -----
  var mapBox = $('np-map');
  $('np-state-count').textContent = statesDone.length + ' of 50 states visited.';
  if (statesDone.length) {
    $('np-state-list').textContent = statesDone.slice().sort().join(', ') + '.';
  } else {
    $('np-state-list').hidden = true;
  }

  // Minimal TopoJSON decoder (the us-atlas file is already projected, so the
  // coordinates can be drawn directly in a 975 x 610 viewBox).
  function decode(topo) {
    var tr = topo.transform;
    var arcs = topo.arcs.map(function (arc) {
      var x = 0, y = 0;
      return arc.map(function (p) {
        if (tr) {                      // quantized: delta-encoded integers
          x += p[0]; y += p[1];
          return [x * tr.scale[0] + tr.translate[0], y * tr.scale[1] + tr.translate[1]];
        }
        return [p[0], p[1]];           // not quantized: absolute positions
      });
    });
    function ring(indexes) {
      var pts = [];
      indexes.forEach(function (i) {
        var a = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
        pts = pts.concat(pts.length ? a.slice(1) : a);
      });
      return pts;
    }
    function d(geom) {
      var polys = geom.type === 'Polygon' ? [geom.arcs] : geom.type === 'MultiPolygon' ? geom.arcs : [];
      var out = '';
      polys.forEach(function (poly) {
        poly.forEach(function (r) {
          var pts = ring(r);
          out += 'M' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('L') + 'Z';
        });
      });
      return out;
    }
    return { d: d };
  }

  var NS = 'http://www.w3.org/2000/svg';
  function draw(topo) {
    var dec = decode(topo);
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 975 610');
    svg.setAttribute('class', 'us-map');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Map of the United States. ' + statesDone.length + ' of 50 states visited.');
    var seen = {};
    topo.objects.states.geometries.forEach(function (g) {
      var name = g.properties && g.properties.name;
      var path = document.createElementNS(NS, 'path');
      path.setAttribute('d', dec.d(g));
      path.setAttribute('fill-rule', 'evenodd');
      if (name && visited[name]) { path.setAttribute('class', 'visited'); seen[name] = true; }
      var t = document.createElementNS(NS, 'title');
      t.textContent = name ? name + (visited[name] ? ' (visited)' : '') : '';
      path.appendChild(t);
      svg.appendChild(path);
    });
    Object.keys(visited).forEach(function (n) {
      if (!seen[n] && ABBR && FIFTY.indexOf(n) === -1 && n !== 'District of Columbia') {
        console.warn('national-parks-data.js: "' + n + '" is not a US state name or postal code.');
      }
    });
    // Visited parks: a dot on the park, a name in a column at the left or right
    var dots = NP.parks.filter(function (p) { return p.visited && p.xy; }).map(function (p) {
      return { name: p.name, x: p.xy[0], y: p.xy[1] };
    });
    var leftCol = dots.filter(function (d) { return d.x < 490; }).sort(function (a, b) { return a.y - b.y; });
    var rightCol = dots.filter(function (d) { return d.x >= 490; }).sort(function (a, b) { return a.y - b.y; });
    function place(col, x, anchor) {
      if (!col.length) return;
      var step = Math.min(30, 560 / col.length);
      var mid = col.reduce(function (s, d) { return s + d.y; }, 0) / col.length;
      var span = step * (col.length - 1);
      mid = Math.max(20 + span / 2, Math.min(590 - span / 2, mid));
      col.forEach(function (d, i) { d.lx = x; d.ly = mid + (i - (col.length - 1) / 2) * step; d.anchor = anchor; });
    }
    place(leftCol, -12, 'end');
    place(rightCol, 987, 'start');

    var marks = document.createElementNS(NS, 'g');
    marks.setAttribute('class', 'park-marks');
    function svgEl(tag, attrs) {
      var n = document.createElementNS(NS, tag);
      Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
      return n;
    }
    dots.forEach(function (d) {
      marks.appendChild(svgEl('line', {
        x1: d.anchor === 'end' ? d.lx + 8 : d.lx - 8, y1: d.ly - 6, x2: d.x, y2: d.y
      }));
    });
    dots.forEach(function (d) {
      var c = svgEl('circle', { cx: d.x, cy: d.y, r: 6.5 });
      var t = document.createElementNS(NS, 'title');
      t.textContent = d.name + ' National Park';
      c.appendChild(t);
      marks.appendChild(c);
    });
    dots.forEach(function (d) {
      var t = svgEl('text', { x: d.lx, y: d.ly, 'text-anchor': d.anchor });
      t.textContent = d.name;
      marks.appendChild(t);
    });
    svg.appendChild(marks);

    // Labels need room on both sides; on narrow screens keep the dots and drop the labels
    var narrow = window.matchMedia('(max-width: 44rem)');
    function layout() {
      var compact = narrow.matches;
      svg.setAttribute('viewBox', compact ? '0 0 975 610' : '-190 0 1340 610');
      svg.classList.toggle('compact', compact);
    }
    layout();
    if (narrow.addEventListener) narrow.addEventListener('change', layout);

    mapBox.textContent = '';
    mapBox.appendChild(svg);
  }

  fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json')
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(draw)
    .catch(function () {
      mapBox.textContent = '';
      mapBox.appendChild(el('p', 'map-note', 'The map could not be loaded. The states I\u2019ve visited are listed below.'));
    });
})();
