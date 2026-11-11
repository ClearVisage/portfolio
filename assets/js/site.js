(() => {
  const root = document.documentElement;
  root.classList.add('js');

  // Year in footer
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Nav hairline once content scrolls under it
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu (disclosure)
  const btn = document.querySelector('.menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    const setOpen = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      menu.classList.toggle('is-open', open);
      menu.toggleAttribute('inert', !open);
    };
    setOpen(false);
    btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setOpen(false); btn.focus(); }
    });
    window.matchMedia('(min-width: 960px)').addEventListener('change', (m) => { if (m.matches) setOpen(false); });
  }

  // Reveal on scroll, staggered among siblings
  const items = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const counts = new Map();
    items.forEach((el) => {
      const n = counts.get(el.parentElement) || 0;
      el.style.setProperty('--d', `${Math.min(n, 4) * 70}ms`);
      counts.set(el.parentElement, n + 1);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-in'));
  }

  // Current section in desktop nav
  const links = [...document.querySelectorAll('.nav__links a[href^="#"]')];
  const targets = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (targets.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach((t) => spy.observe(t));
  }
})();
