// ── Theme toggle: Auto → ☀ Claro → ☾ Oscuro → Auto ──
const html = document.documentElement;
const btn  = document.getElementById('themeBtn');
const themes = ['system', 'light', 'dark'];
const labels  = { system: 'Auto', light: '☀ Claro', dark: '☾ Oscuro' };

function applyTheme(theme) {
  const effective = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  html.setAttribute('data-theme', effective);
  btn.textContent = labels[theme];
  localStorage.setItem('dvp-theme', theme);
}

btn.addEventListener('click', () => {
  const cur = localStorage.getItem('dvp-theme') || 'system';
  applyTheme(themes[(themes.indexOf(cur) + 1) % themes.length]);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if ((localStorage.getItem('dvp-theme') || 'system') === 'system') applyTheme('system');
});

applyTheme(localStorage.getItem('dvp-theme') || 'system');

// ── Section navigation ──
var SECTIONS = ['inicio', 'perfil', 'trayectoria', 'experiencia', 'stack', 'certificados', 'contacto'];
var curIdx = 0;
var navUp   = document.getElementById('navUp');
var navDown = document.getElementById('navDown');

function syncNav() {
  navUp.classList.toggle('hidden', curIdx === 0);
  navDown.classList.toggle('hidden', curIdx === SECTIONS.length - 1);
}

function goTo(idx) {
  if (idx < 0 || idx >= SECTIONS.length) return;
  curIdx = idx;
  var target = document.getElementById(SECTIONS[curIdx]);
  if (target) window.scrollTo({ top: target.offsetTop - 52, behavior: 'smooth' });
  syncNav();
}

navDown.addEventListener('click', function() { goTo(curIdx + 1); });
navUp.addEventListener('click',   function() { goTo(curIdx - 1); });

// Track active section with IntersectionObserver
var secEls = SECTIONS.map(function(id) { return document.getElementById(id); }).filter(Boolean);
var secObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      var i = secEls.indexOf(e.target);
      if (i !== -1) { curIdx = i; syncNav(); }
    }
  });
}, { threshold: 0.4 });
secEls.forEach(function(s) { secObs.observe(s); });

syncNav();

// ── Fade-in on scroll ──
var fadeObs = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
    });
  },
  { threshold: 0.07 }
);
document.querySelectorAll('.section-inner, .hero > div, .job, .tl-item, .cards article')
  .forEach(function(el) { el.classList.add('fade-in'); fadeObs.observe(el); });
