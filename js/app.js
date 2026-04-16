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

  // ---- Hero spotlight following cursor ----
  function initHeroSpotlight() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const spotlight = document.createElement('div');
    spotlight.className = 'hero-spotlight';
    spotlight.style.setProperty('--spot-x', '50%');
    spotlight.style.setProperty('--spot-y', '45%');
    hero.appendChild(spotlight);
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spotlight.style.setProperty('--spot-x', `${x.toFixed(1)}%`);
      spotlight.style.setProperty('--spot-y', `${y.toFixed(1)}%`);
    });
    hero.addEventListener('mouseleave', () => {
      spotlight.style.setProperty('--spot-x', '50%');
      spotlight.style.setProperty('--spot-y', '45%');
    });
  }

  // ---- Card 3D tilt on mouse move ----
  function initCardTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return;
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-2px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ---- Card click ripple ----
  function initCardRipple() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.card').forEach(card => {
      card.style.position = card.style.position || 'relative';
      card.style.overflow = 'hidden';
      card.addEventListener('click', (e) => {
        const rect = card.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'card-ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        card.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  // ---- Section label reveal on scroll ----
  function initSectionLabelReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const labels = document.querySelectorAll('.section-label');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });
    labels.forEach(el => observer.observe(el));
  }

  // ---- Timeline scroll-reveal progress line ----
  function initTimelineProgress() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    const progressLine = document.createElement('div');
    progressLine.className = 'timeline-progress';
    timeline.style.position = 'relative';
    timeline.prepend(progressLine);

    function updateProgress() {
      const rect = timeline.getBoundingClientRect();
      const windowH = window.innerHeight;
      const timelineTop = rect.top;
      const timelineH = rect.height;
      if (timelineTop > windowH) {
        progressLine.style.height = '0px';
      } else if (timelineTop + timelineH < 0) {
        progressLine.style.height = timelineH + 'px';
      } else {
        const visible = Math.min(windowH - timelineTop, timelineH);
        progressLine.style.height = Math.max(0, visible) + 'px';
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ---- Timeline active highlight ----
  function initTimelineActive() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('active', entry.isIntersecting);
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -10% 0px' });
    items.forEach(item => observer.observe(item));
  }

  // ---- Nav scroll shadow ----
  function initNavScrollShadow() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', scrollY > 10);
    }, { passive: true });
  }

  // ---- Magnetic floating buttons ----
  function initMagneticButtons() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return;
    document.querySelectorAll('.floating-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ---- Card spotlight follow cursor ----
  function initCardSpotlight() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return;
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--spot-x', `${x.toFixed(1)}%`);
        card.style.setProperty('--spot-y', `${y.toFixed(1)}%`);
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--spot-x', '50%');
        card.style.setProperty('--spot-y', '50%');
      });
    });
  }

  // ---- Scenario list hover shimmer ----
  function initScenarioShimmer() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return;
    document.querySelectorAll('.scenario-body li').forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        item.style.setProperty('--line-x', `${x.toFixed(1)}%`);
      });
      item.addEventListener('mouseleave', () => {
        item.style.setProperty('--line-x', '0%');
      });
    });
  }

  // ---- Timeline click focus pulse ----
  function initTimelineClickFocus() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.remove('focus-pulse');
        void item.offsetWidth;
        item.classList.add('focus-pulse');
      });
    });
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
    initHeroSpotlight();
    initCardTilt();
    initCardRipple();
    initSectionLabelReveal();
    initTimelineProgress();
    initTimelineActive();
    initNavScrollShadow();
    initMagneticButtons();
    initCardSpotlight();
    initScenarioShimmer();
    initTimelineClickFocus();
  }

  return { init, toggleTheme, applyTheme };
})();

// Start the app
App.init();
