(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
 
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
 
  const buttons = document.querySelectorAll('.lang-btn');
  const defaultLang = localStorage.getItem('lang') || 'hy';
  setLang(defaultLang);
 
  buttons.forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
 
  function setLang(lang) {
    const dict = window.I18N?.[lang] || window.I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const key = node.getAttribute('data-i18n');
      const val = get(dict, key);
      if (typeof val === 'string') node.textContent = val;
    });
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
    localStorage.setItem('lang', lang);
    if (dict?.brand) {
      document.title = dict.brand + ' — ' + (window.I18N[lang]?.hero?.title || 'Cyprus');
    }
  }
 
  function get(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : null), obj);
  }
})();
 