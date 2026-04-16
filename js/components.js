// components.js — shared header and footer for all pages

(function () {
  // ─── HEADER ────────────────────────────────────────────────────────────────
  const headerHTML = `
  <div class="topbar">
    <div class="container">
      <button onclick="setLang('en')" class="lang-btn" data-lang="en">English</button>
      <button onclick="setLang('fr')" class="lang-btn" data-lang="fr">Français</button>
      <button onclick="setLang('rw')" class="lang-btn" data-lang="rw">Kinyarwanda</button>
    </div>
  </div>

  <nav class="navbar" id="home">
    <div class="container">
      <a href="index.html" class="logo">
        <div class="logo-mark">IL</div>
        <div class="logo-text">
          <span class="logo-name">Isoko Life</span>
          <span class="logo-sub">Center Ltd</span>
        </div>
      </a>

      <ul class="nav-links">
        <li><a href="index.html" data-i18n="nav_home">Home</a></li>
        <li><a href="products.html" data-i18n="nav_products">Products</a></li>
        <li><a href="about.html" data-i18n="nav_about">About Us</a></li>
        <li><a href="consultation.html" data-i18n="nav_consultation">Consultation</a></li>
        <li><a href="contact.html" data-i18n="nav_contact">Contact</a></li>
        <li><a href="partner.html" data-i18n="nav_partner">Partner With Us</a></li>
      </ul>

      <button class="menu-toggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  `;

  // ─── FOOTER ────────────────────────────────────────────────────────────────
  const footerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">

        <div class="footer-brand">
          <div class="footer-logo">
            <div class="footer-logo-mark">IL</div>
            <div>
              <span class="footer-logo-name">Isoko Life</span>
              <span class="footer-logo-sub">Center Ltd</span>
            </div>
          </div>
          <p class="footer-about" data-i18n="footer_description">
            Trusted wellness and beauty products for Rwanda — backed by certified health professionals.
          </p>
        </div>

        <div class="footer-col">
          <h5 data-i18n="footer_links">Quick Links</h5>
          <ul>
            <li><a href="index.html" data-i18n="nav_home">Home</a></li>
            <li><a href="products.html" data-i18n="nav_products">Products</a></li>
            <li><a href="about.html" data-i18n="nav_about">About Us</a></li>
            <li><a href="consultation.html" data-i18n="nav_consultation">Consultation</a></li>
            <li><a href="partner.html" data-i18n="nav_partner">Partner With Us</a></li>
            <li><a href="contact.html" data-i18n="nav_contact">Contact</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5 data-i18n="footer_contact">Contact Us</h5>
          <ul class="contact-list">
            <li><i class="fas fa-map-marker-alt"></i><span>Remera Kanombe Kucyamitsingi KN5Road, Kigali, Rwanda</span></li>
            <li><i class="fas fa-phone"></i><span><a href="tel:+250788333339" style="color:inherit;">+250 788 333 339</a></span></li>
            <li><i class="fas fa-envelope"></i><span><a href="mailto:info@isokolifecenter.com" style="color:inherit;">info@isokolifecenter.com</a></span></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5 data-i18n="footer_newsletter">Newsletter</h5>
          <div class="newsletter-form">
            <p data-i18n="newsletter_description">Subscribe for health tips, product updates, and exclusive offers.</p>
            <div class="newsletter-input-wrap">
              <input type="email" placeholder="your@email.com" />
              <button class="btn-subscribe" data-i18n="btn_subscribe">Subscribe</button>
            </div>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <p>&copy; <span id="footer-year"></span> Isoko Life Center Ltd. <span data-i18n="footer_rights">All rights reserved.</span></p>
        <div class="footer-legal">
          <a href="#" data-i18n="footer_privacy">Privacy Policy</a>
          <a href="#" data-i18n="footer_terms">Terms of Service</a>
          <a href="#" data-i18n="footer_cookies">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
  `;

  // ─── INJECT ──────────────────────────────────────────────────────────────────
  function injectComponents() {
    const headerEl = document.getElementById('header-placeholder');
    const footerEl = document.getElementById('footer-placeholder');

    if (headerEl) headerEl.outerHTML = headerHTML;
    if (footerEl) footerEl.outerHTML = footerHTML;

    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    window.addEventListener('scroll', function () {
      const navbar = document.querySelector('.navbar');
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 10);
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      if (link.getAttribute('href') === currentPage) link.classList.add('nav-active');
    });

    initMobileMenu();

    if (typeof translatePage === 'function') {
      const savedLang = localStorage.getItem('isoko_lang') || 'en';
      translatePage(savedLang, false);
    }
  }

  // ─── MOBILE MENU ─────────────────────────────────────────────────────────────
  function initMobileMenu() {
    const toggle   = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    // Inject drawer header
    const drawerHeader = document.createElement('div');
    drawerHeader.className = 'mobile-menu-header';
    drawerHeader.innerHTML = `
      <span>Menu</span>
      <button class="mobile-menu-close" aria-label="Close menu">&#x2715;</button>
    `;
    navLinks.prepend(drawerHeader);

    // Inject overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    toggle.addEventListener('click', openMobileMenu);
    drawerHeader.querySelector('.mobile-menu-close').addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  function openMobileMenu() {
    document.querySelector('.menu-toggle')?.classList.add('open');
    document.querySelector('.nav-links')?.classList.add('open');
    document.querySelector('.nav-overlay')?.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    document.querySelector('.menu-toggle')?.classList.remove('open');
    document.querySelector('.nav-links')?.classList.remove('open');
    document.querySelector('.nav-overlay')?.classList.remove('visible');
    document.body.style.overflow = '';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
  } else {
    injectComponents();
  }

})();