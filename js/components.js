/* ============================================================
   ISOKO LIFE CENTER — components.js
   Loads shared header.html and footer.html into every page.
   Sets the active nav link based on current filename.
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

  // Set active nav link based on current page filename
  const page = location.pathname.split('/').pop() || 'index.html';
  const key  = page.replace('.html', '') || 'index';
  const link = document.querySelector(`.nav-links a[data-page="${key}"]`);
  if (link) link.classList.add('nav-active');

  // Set footer year
  const yr = document.getElementById('currentYear');
  if (yr) yr.textContent = new Date().getFullYear();

  // Re-init mobile menu (inserted by header load)
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

  // Re-init navbar scroll shadow
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Re-init language buttons (inserted by header load)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang && typeof translations !== 'undefined' && translations[lang]) {
        translatePage(lang);
      }
    });
  });

  // Re-init newsletter in footer
  const newsletter = document.querySelector('.newsletter-input-wrap');
  if (newsletter) {
    newsletter.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsletter.querySelector('input[type="email"]').value;
      if (email) {
        showNotification(`Thank you for subscribing with ${email}!`, 'success');
        newsletter.reset();
      }
    });
  }

  // Re-init nav login/register buttons
  document.querySelector('.btn-nav-login')?.addEventListener('click', () => {
    showNotification('Login page coming soon.', 'info');
  });
  document.querySelector('.btn-nav-register')?.addEventListener('click', () => {
    showNotification('Registration page coming soon.', 'info');
  });
}

document.addEventListener('DOMContentLoaded', initComponents);
