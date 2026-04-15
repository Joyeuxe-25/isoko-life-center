/* ============================================================
   ISOKO LIFE CENTER — components.js
   Inlines header + footer directly. No fetch. No timing issues.
   Language buttons wired after injection.
   ============================================================ */

const HEADER_HTML = `
<div class="topbar">
  <div class="container">
    <button class="lang-btn" data-lang="en"><span class="fi fi-gb"></span> English</button>
    <button class="lang-btn" data-lang="fr"><span class="fi fi-fr"></span> Français</button>
    <button class="lang-btn" data-lang="rw"><span class="fi fi-rw"></span> Kinyarwanda</button>
  </div>
</div>
<nav class="navbar">
  <div class="container">
    <a href="index.html" class="logo">
      <div class="logo-mark">IL</div>
      <div class="logo-text">
        <span class="logo-name">Isoko Life</span>
        <span class="logo-sub">Center Ltd</span>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="index.html"        data-page="index">Home</a></li>
      <li><a href="products.html"     data-page="products">Products</a></li>
      <li><a href="consultation.html" data-page="consultation">Consultation</a></li>
      <li><a href="contact.html"      data-page="contact">Contact</a></li>
      <li><a href="partner.html"      data-page="partner">Partner With Us</a></li>
    </ul>
    <div class="nav-actions">
      <button class="btn-nav-login">Login</button>
      <button class="btn-nav-register">Register</button>
      <button class="menu-toggle" aria-label="Menu"><i class="fas fa-bars"></i></button>
    </div>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <div class="footer-logo">
          <div class="footer-logo-mark">IL</div>
          <div>
            <span class="footer-logo-name">Isoko Life</span>
            <span class="footer-logo-sub">Center Ltd</span>
          </div>
        </div>
        <p class="footer-about">Trusted wellness and beauty products for Rwanda — backed by certified health professionals.</p>
        <div class="social-links">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Quick Links</h5>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="products.html">Products</a></li>
          <li><a href="consultation.html">Consultation</a></li>
          <li><a href="partner.html">Partner With Us</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact Us</h5>
        <ul class="contact-list">
          <li><i class="fas fa-map-marker-alt"></i><span>Remera, Kanombe Kucyamitsingi KN5Road</span></li>
          <li><i class="fas fa-phone"></i><span>+250 788 333 339</span></li>
          <li><i class="fas fa-envelope"></i><span>info@isokolifecenter.com</span></li>
        </ul>
      </div>
      <div class="footer-col newsletter-form">
        <h5>Newsletter</h5>
        <p>Subscribe for health tips, product updates, and exclusive offers.</p>
        <form class="newsletter-input-wrap" onsubmit="handleNewsletter(event)">
          <input type="email" placeholder="Your email address" required />
          <button type="submit" class="btn-subscribe">Subscribe</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="currentYear"></span> Isoko Life Center Ltd. All rights reserved.</p>
      <div class="footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </div>
</footer>
<a href="https://wa.me/250788333339" target="_blank" rel="noopener" class="whatsapp-btn" aria-label="WhatsApp">
  <i class="fab fa-whatsapp"></i>
</a>
`;

function initComponents() {
  /* ── Inject header and footer ── */
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = HEADER_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  /* ── Footer year ── */
  const yr = document.getElementById('currentYear');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Active nav link ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  const key  = page.replace('.html', '') || 'index';
  const activeLink = document.querySelector(`.nav-links a[data-page="${key}"]`);
  if (activeLink) activeLink.classList.add('nav-active');

  /* ── Language buttons ── */
  const savedLang = localStorage.getItem('isoko_lang') || 'en';

  document.querySelectorAll('.lang-btn').forEach(btn => {
    /* Set active state */
    btn.classList.toggle('active', btn.dataset.lang === savedLang);

    /* Wire click */
    btn.addEventListener('click', function () {
      const lang = this.dataset.lang;
      if (!lang || !translations[lang]) return;

      /* Update active button */
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      /* Translate the page */
      translatePage(lang);
    });
  });

  /* ── Mobile menu ── */
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

  /* ── Login / Register buttons ── */
  document.querySelector('.btn-nav-login')?.addEventListener('click', () => {
    const lang = localStorage.getItem('isoko_lang') || 'en';
    const m = {
      en: 'Login page coming soon.',
      fr: 'Page de connexion bientôt disponible.',
      rw: 'Urupapuro rwo kwinjira ruzaza vuba.'
    };
    showNotification(m[lang] || m.en, 'info');
  });

  document.querySelector('.btn-nav-register')?.addEventListener('click', () => {
    const lang = localStorage.getItem('isoko_lang') || 'en';
    const m = {
      en: 'Registration page coming soon.',
      fr: "Page d'inscription bientôt disponible.",
      rw: 'Urupapuro rwo kwiyandikisha ruzaza vuba.'
    };
    showNotification(m[lang] || m.en, 'info');
  });
}

/* ── Newsletter handler (called from footer form) ── */
function handleNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  if (email) {
    const lang = localStorage.getItem('isoko_lang') || 'en';
    const m = {
      en: `Thank you for subscribing with ${email}!`,
      fr: `Merci de vous être abonné avec ${email} !`,
      rw: `Murakoze kwiyandikisha na ${email}!`
    };
    showNotification(m[lang] || m.en, 'success');
    e.target.reset();
  }
}

/* Run immediately on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', initComponents);