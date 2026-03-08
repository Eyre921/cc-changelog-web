/* ========================================
   CC Changelog Web — i18n Module
   ======================================== */

const I18n = (() => {
  let currentLang = localStorage.getItem('cc-lang') || 'zh-CN';
  let translations = {};
  const listeners = [];

  async function loadLanguage(lang) {
    try {
      const resp = await fetch(`i18n/${lang}.json`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      translations[lang] = await resp.json();
    } catch (e) {
      console.warn(`Failed to load language "${lang}":`, e);
      if (lang !== 'zh-CN') {
        await loadLanguage('zh-CN');
      }
    }
  }

  function t(key) {
    const data = translations[currentLang] || translations['zh-CN'] || {};
    const keys = key.split('.');
    let val = data;
    for (const k of keys) {
      if (val && typeof val === 'object') {
        val = val[k];
      } else {
        return key;
      }
    }
    return val || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val !== key) {
        el.innerHTML = val;
      }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = t(key);
      if (val !== key) {
        el.title = val;
      }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const val = t(key);
      if (val !== key) {
        el.setAttribute('aria-label', val);
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (val !== key) {
        el.placeholder = val;
      }
    });
    // Update meta tags
    const metaTitle = t('meta.title');
    if (metaTitle !== 'meta.title') document.title = metaTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    const descVal = t('meta.description');
    if (metaDesc && descVal !== 'meta.description') metaDesc.content = descVal;

    // Update html lang
    document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-CN';

    // Notify listeners
    listeners.forEach(fn => fn(currentLang));
  }

  async function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('cc-lang', lang);
    if (!translations[lang]) {
      await loadLanguage(lang);
    }
    applyTranslations();
  }

  function getLang() {
    return currentLang;
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  async function init() {
    await loadLanguage(currentLang);
    if (currentLang !== 'zh-CN' && !translations['zh-CN']) {
      await loadLanguage('zh-CN');
    }
    applyTranslations();
  }

  return { init, setLanguage, getLang, t, onChange };
})();
