/* ============================================================
   ISOKO LIFE CENTER — components.js
   Loads header.html and footer.html into every page.
   Language buttons wired HERE after header is injected into DOM.
   ============================================================ */

async function loadComponent(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    el.innerHTML = await res.text();
  } catch (e) {
    console.error(e);
  }
}

async function initComponents() {
  await loadComponent('#site-header', 'header.html');
  await loadComponent('#site-footer', 'footer.html');

  /* ── Active nav link ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  const key  = page.replace('.html', '') || 'index';
  const link = document.querySelector(`.nav-links a[data-page="${key}"]`);
  if (link) link.classList.add('nav-active');

  /* ── Footer year ── */
  const yr = document.getElementById('currentYear');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Language buttons — wired AFTER header is in the DOM ── */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang && typeof translations !== 'undefined' && translations[lang]) {
        translatePage(lang);
      }
    });
  });

  /* Apply saved language to newly injected header */
  const savedLang = localStorage.getItem('isoko_lang') || 'en';
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === savedLang);
  });

  /* ── Mobile menu — wired AFTER header is in the DOM ── */
  const toggle   = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  /* ── Navbar scroll shadow ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Newsletter in footer ── */
  document.querySelector('.newsletter-input-wrap')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
      showNotification(`Thank you for subscribing with ${email}!`, 'success');
      e.target.reset();
    }
  });

  /* ── Login / Register buttons ── */
  document.querySelector('.btn-nav-login')?.addEventListener('click', () => {
    const lang = localStorage.getItem('isoko_lang') || 'en';
    const m = { en: 'Login page coming soon.', fr: 'Page de connexion bientôt disponible.', rw: 'Urupapuro rwo kwinjira ruzaza vuba.' };
    showNotification(m[lang] || m.en, 'info');
  });
  document.querySelector('.btn-nav-register')?.addEventListener('click', () => {
    const lang = localStorage.getItem('isoko_lang') || 'en';
    const m = { en: 'Registration page coming soon.', fr: "Page d'inscription bientôt disponible.", rw: 'Urupapuro rwo kwiyandikisha ruzaza vuba.' };
    showNotification(m[lang] || m.en, 'info');
  });
}

document.addEventListener('DOMContentLoaded', initComponents);