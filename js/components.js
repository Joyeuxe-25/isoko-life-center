/* ============================================================
   ISOKO LIFE CENTER — components.js
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
        <span class="logo-name" data-i18n="company_name">Isoko Life</span>
        <span class="logo-sub" data-i18n="company_tag">Center Ltd</span>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="index.html"        data-page="index"        data-i18n="nav_home">Home</a></li>
      <li><a href="products.html"     data-page="products"     data-i18n="nav_products">Products</a></li>
      <li><a href="consultation.html" data-page="consultation" data-i18n="nav_consultation">Consultation</a></li>
      <li><a href="contact.html"      data-page="contact"      data-i18n="nav_contact">Contact</a></li>
      <li><a href="partner.html"      data-page="partner"      data-i18n="nav_partner">Partner With Us</a></li>
    </ul>
    <button class="menu-toggle" aria-label="Menu"><i class="fas fa-bars"></i></button>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <div class="footer-logo">
          <div class="footer-logo-mark">IL</div>
          <div>
            <span class="footer-logo-name" data-i18n="company_name">Isoko Life</span>
            <span class="footer-logo-sub" data-i18n="company_tag">Center Ltd</span>
          </div>
        </div>
        <p class="footer-about" data-i18n="footer_description">Trusted wellness and beauty products for Rwanda — backed by certified health professionals.</p>
        <div class="social-links">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h5 data-i18n="footer_links">Quick Links</h5>
        <ul>
          <li><a href="index.html"        data-i18n="nav_home">Home</a></li>
          <li><a href="products.html"     data-i18n="nav_products">Products</a></li>
          <li><a href="consultation.html" data-i18n="nav_consultation">Consultation</a></li>
          <li><a href="partner.html"      data-i18n="nav_partner">Partner With Us</a></li>
          <li><a href="contact.html"      data-i18n="nav_contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5 data-i18n="footer_contact">Contact Us</h5>
        <ul class="contact-list">
          <li><i class="fas fa-map-marker-alt"></i><span data-i18n="contact_address">Remera, Kanombe Kucyamitsingi KN5Road</span></li>
          <li><i class="fas fa-phone"></i><span>+250 788 333 339</span></li>
          <li><i class="fas fa-envelope"></i><span>info@isokolifecenter.com</span></li>
        </ul>
      </div>
      <div class="footer-col newsletter-form">
        <h5 data-i18n="footer_newsletter">Newsletter</h5>
        <p data-i18n="newsletter_description">Subscribe for health tips, product updates, and exclusive offers.</p>
        <form class="newsletter-input-wrap" onsubmit="handleNewsletter(event)">
          <input type="email" data-i18n="placeholder_email" placeholder="Your email address" required />
          <button type="submit" class="btn-subscribe" data-i18n="btn_subscribe">Subscribe</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="currentYear"></span> Isoko Life Center Ltd. <span data-i18n="footer_rights">All rights reserved.</span></p>
      <div class="footer-legal">
        <a href="#" data-i18n="footer_privacy">Privacy Policy</a>
        <a href="#" data-i18n="footer_terms">Terms of Service</a>
        <a href="#" data-i18n="footer_cookies">Cookie Policy</a>
      </div>
    </div>
  </div>
</footer>
<a href="https://wa.me/250788333339" target="_blank" rel="noopener" class="whatsapp-btn" aria-label="WhatsApp">
  <i class="fab fa-whatsapp"></i>
</a>`;

function initComponents() {
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
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.dataset.lang;
      if (!lang || !translations[lang]) return;
      translatePage(lang, true);
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

  /* ── Navbar scroll ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Apply saved language to everything including nav ── */
  const savedLang = localStorage.getItem('isoko_lang') || 'en';
  translatePage(savedLang, false);
}

function handleNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  if (email) {
    const m = {
      en: `Thank you for subscribing with ${email}!`,
      fr: `Merci de vous être abonné avec ${email} !`,
      rw: `Murakoze kwiyandikisha na ${email}!`
    };
    showNotification(m[currentLang] || m.en, 'success');
    e.target.reset();
  }
}

document.addEventListener('DOMContentLoaded', initComponents);