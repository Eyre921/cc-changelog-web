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
    const floatingBtn = document.querySelector('.floating-theme');
    if (floatingBtn) {
      floatingBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
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
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0 });
    });
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
    if (btn) btn.addEventListener('click', toggleTheme);
    const floatingBtn = document.querySelector('.floating-theme');
    if (floatingBtn) floatingBtn.addEventListener('click', toggleTheme);
  }

  // ---- Floating language toggle ----
  function initFloatingLang() {
    const btn = document.querySelector('.floating-lang');
    if (!btn) return;
    function updateLabel() {
      const lang = I18n.getLang();
      btn.textContent = lang === 'zh-CN' ? '中/EN' : 'EN/中';
    }
    updateLabel();
    btn.addEventListener('click', () => {
      const next = I18n.getLang() === 'zh-CN' ? 'en' : 'zh-CN';
      I18n.setLanguage(next);
    });
    I18n.onChange(updateLabel);
  }

  // ---- Sync floating theme icon ----
  function syncFloatingTheme() {
    const floatingBtn = document.querySelector('.floating-theme');
    if (!floatingBtn) return;
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    floatingBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // ---- Scroll progress bar ----
  function initScrollProgress() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  // ---- Stats count-up animation ----
  function initCountUp() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stats = document.querySelectorAll('.stat .num');
    if (!stats.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();
          const match = text.match(/^([\d.]+)(\D*)$/);
          if (match) {
            const target = parseFloat(match[1]);
            const suffix = match[2];
            const duration = 1200;
            const start = performance.now();
            const isInt = Number.isInteger(target);
            function tick(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = eased * target;
              el.textContent = (isInt ? Math.round(current) : current.toFixed(1)) + suffix;
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    stats.forEach(el => observer.observe(el));
  }

  // ---- Section heading reveal ----
  function initHeadingReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const headings = document.querySelectorAll('.section h2');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    headings.forEach(el => observer.observe(el));
  }

  // ---- Hero floating particles ----
  function initHeroParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('span');
      p.className = 'hero-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 12) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.width = p.style.height = (3 + Math.random() * 3) + 'px';
      hero.appendChild(p);
    }
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
    initFloatingLang();
    syncFloatingTheme();
    initScrollProgress();
    initCountUp();
    initHeadingReveal();
    initHeroParticles();
  }

  return { init, toggleTheme, applyTheme };
})();

// Start the app
App.init();
