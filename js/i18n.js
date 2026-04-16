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

    // Apply dynamic content translations (cards, scenarios, etc.)
    applyDynamicTranslations();

    // Notify listeners
    listeners.forEach(fn => fn(currentLang));
  }

  function applyDynamicTranslations() {
    // 1. Card sections
    const cardSections = [
      'recent', 'models', 'agents', 'sessions', 'devflow',
      'mcp', 'terminal', 'security', 'sdk', 'enterprise', 'performance',
      'platform', 'vscode'
    ];

    cardSections.forEach(function(sectionId) {
      var section = document.getElementById(sectionId);
      if (!section) return;

      var grid = section.querySelector('.grid');
      if (!grid) return;

      var cards = grid.querySelectorAll('.card');
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var h3 = card.querySelector('h3');
        var p = card.querySelector('p');
        var tagEl = card.querySelector('.tag');

        var titleKey = 'cards.' + sectionId + '.' + i + '.title';
        var descKey = 'cards.' + sectionId + '.' + i + '.desc';
        var tagKey = 'cards.' + sectionId + '.' + i + '.tag';

        var titleVal = t(titleKey);
        var descVal = t(descKey);
        var tagVal = t(tagKey);

        if (h3 && titleVal !== titleKey) h3.innerHTML = titleVal;
        if (p && descVal !== descKey) p.innerHTML = descVal;
        if (tagEl && tagVal !== tagKey) tagEl.innerHTML = tagVal;
      }
    });

    // 2. Scenario sections
    var scenarioSections = [
      'models', 'agents', 'sessions', 'devflow', 'mcp',
      'terminal', 'sdk', 'enterprise', 'performance', 'platform'
    ];

    scenarioSections.forEach(function(sectionId) {
      var section = document.getElementById(sectionId);
      if (!section) return;

      var scenario = section.querySelector('.scenario');
      if (!scenario) return;

      var h3 = scenario.querySelector('.scenario-header h3');
      if (h3) {
        var titleVal = t('scenarios.' + sectionId + '.title');
        var subtitleVal = t('scenarios.' + sectionId + '.subtitle');
        if (titleVal !== 'scenarios.' + sectionId + '.title') {
          h3.innerHTML = titleVal + '<span>' + subtitleVal + '</span>';
        }
      }

      var items = scenario.querySelectorAll('.scenario-body li');
      for (var i = 0; i < items.length; i++) {
        var key = 'scenarios.' + sectionId + '.items.' + i;
        var val = t(key);
        if (val !== key) items[i].innerHTML = val;
      }
    });

    // 3. Shortcuts section: keyboard descs, slash descs, and bottom cards
    var shortcuts = document.getElementById('shortcuts');
    if (shortcuts) {
      var grids = shortcuts.querySelectorAll('.grid');

      // First grid: keyboard shortcuts + slash commands
      if (grids[0]) {
        var shortcutCards = grids[0].querySelectorAll('.card');

        // Keyboard descriptions (first card)
        if (shortcutCards[0]) {
          var kbDescs = shortcutCards[0].querySelectorAll('span[style*="text2"]');
          for (var i = 0; i < kbDescs.length; i++) {
            var key = 'keyboard_descs.' + i;
            var val = t(key);
            if (val !== key) kbDescs[i].textContent = val;
          }
        }

        // Slash command descriptions (second card)
        if (shortcutCards[1]) {
          var slashDescs = shortcutCards[1].querySelectorAll('span[style*="text2"]');
          for (var i = 0; i < slashDescs.length; i++) {
            var key = 'slash_descs.' + i;
            var val = t(key);
            if (val !== key) slashDescs[i].textContent = val;
          }
        }
      }

      // Second grid: CLI, env vars, custom commands cards
      if (grids[1]) {
        var bottomCards = grids[1].querySelectorAll('.card');
        for (var i = 0; i < bottomCards.length; i++) {
          var p = bottomCards[i].querySelector('p');
          var key = 'cards.shortcuts_cards.' + i + '.desc';
          var val = t(key);
          if (p && val !== key) p.innerHTML = val;
        }
      }
    }

    // 4. Timeline entries
    var timeline = document.getElementById('timeline');
    if (timeline) {
      var entries = timeline.querySelectorAll('.timeline-item');
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var dateEl = entry.querySelector('.timeline-date');
        var versionEl = entry.querySelector('.timeline-version');
        var descEl = entry.querySelector('.timeline-desc');

        var dateKey = 'timeline_entries.' + i + '.date';
        var versionKey = 'timeline_entries.' + i + '.version';
        var descKey = 'timeline_entries.' + i + '.desc';

        var dateVal = t(dateKey);
        var versionVal = t(versionKey);
        var descVal = t(descKey);

        if (dateEl && dateVal !== dateKey) dateEl.innerHTML = dateVal;
        if (versionEl && versionVal !== versionKey) versionEl.innerHTML = versionVal;
        if (descEl && descVal !== descKey) descEl.innerHTML = descVal;
      }
    }
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
