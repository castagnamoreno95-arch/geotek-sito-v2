// ===== Mobile nav toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.textContent = isOpen ? '✕' : '☰';
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // ===== Reveal on scroll =====
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ===== Contact form (AJAX submit) =====
  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusEl = document.getElementById('form-status');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Invio in corso…';
      statusEl.className = 'form-status';

      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          statusEl.textContent = 'Richiesta inviata. Ti richiameremo al più presto.';
          statusEl.classList.add('show', 'ok');
          form.reset();
        } else {
          throw new Error('Invio non riuscito');
        }
      } catch (err) {
        statusEl.textContent = 'Invio non riuscito. Chiamaci al 334 537 7844 oppure riprova tra poco.';
        statusEl.classList.add('show', 'err');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
      }
    });
  }

  // ===== Cookie consent banner =====
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    const consent = localStorage.getItem('geotek_cookie_consent');
    if (!consent) {
      cookieBanner.classList.add('show');
    }
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    if (acceptBtn) acceptBtn.addEventListener('click', () => {
      localStorage.setItem('geotek_cookie_consent', 'accepted');
      cookieBanner.classList.remove('show');
    });
    if (rejectBtn) rejectBtn.addEventListener('click', () => {
      localStorage.setItem('geotek_cookie_consent', 'rejected');
      cookieBanner.classList.remove('show');
    });
  }

  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
});
