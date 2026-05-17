// Mark JS-ready immediately so reveal-hidden styles can kick in
document.documentElement.classList.add('js-ready');

// ===== Add pathLength="100" to every .draw-path SVG element =====
(function() {
  document.querySelectorAll('.draw-path').forEach(el => {
    if (!el.hasAttribute('pathLength')) el.setAttribute('pathLength', '100');
  });
})();

// ===== Active nav link based on current page =====
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ===== Mobile menu toggle =====
(function() {
  const toggle = document.querySelector('.mobile-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
})();

// ===== Scroll reveal =====
(function() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// ===== Respect reduced-motion preference =====
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reduce-motion');
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}
