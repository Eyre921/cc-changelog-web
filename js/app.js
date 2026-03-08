/* ========================================
   CC Changelog Web — App Module
   ======================================== */

const App = (() => {
  // ---- Theme management ----
  function getPreferredTheme() {
    const saved = localStorage.getItem('cc-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cc-theme', theme);
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // ---- Fade-in observer ----
  function initFadeIn() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  // ---- Nav active state ----
  function initNavHighlight() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (scrollY >= top) current = section.getAttribute('id');
      });
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    });
  }

  // ---- Back to top button ----
  function initBackToTop() {
    const backBtn = document.querySelector('.back-to-top');
    if (!backBtn) return;
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('show', scrollY > 600);
    }, { passive: true });
  }

  // ---- Terminal typing animation ----
  function initTypingAnimation() {
    const typingEl = document.querySelector('.typing');
    if (!typingEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const fullText = typingEl.textContent;
    typingEl.textContent = '';
    let i = 0;
    function startTyping() {
      if (i < fullText.length) {
        typingEl.textContent += fullText.charAt(i);
        i++;
        setTimeout(startTyping, 60 + Math.random() * 40);
      }
    }
    const heroObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(startTyping, 800);
        heroObserver.disconnect();
      }
    });
    heroObserver.observe(typingEl);
  }

  // ---- Language selector ----
  function initLangSelector() {
    const selector = document.querySelector('.lang-select');
    if (!selector) return;
    selector.value = I18n.getLang();
    selector.addEventListener('change', (e) => {
      I18n.setLanguage(e.target.value);
    });
    I18n.onChange((lang) => {
      selector.value = lang;
    });
  }

  // ---- Theme toggle button ----
  function initThemeToggle() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', toggleTheme);
  }

  // ---- Init ----
  async function init() {
    // Apply theme immediately (before paint)
    applyTheme(getPreferredTheme());

    // Init i18n
    await I18n.init();

    // Init UI components
    initFadeIn();
    initNavHighlight();
    initBackToTop();
    initTypingAnimation();
    initLangSelector();
    initThemeToggle();
  }

  return { init, toggleTheme, applyTheme };
})();

// Start the app
App.init();
