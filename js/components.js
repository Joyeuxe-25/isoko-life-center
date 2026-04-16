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

  <!-- Sidebar drawer for mobile -->
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <a href="index.html" class="sidebar-logo">
        <div class="logo-mark">IL</div>
        <div class="logo-text">
          <span class="logo-name">Isoko Life</span>
          <span class="logo-sub">Center Ltd</span>
        </div>
      </a>
      <button class="sidebar-close" id="sidebar-close">&#x2715;</button>
    </div>
    <nav class="sidebar-nav">
      <a href="index.html" class="sidebar-link" data-i18n="nav_home">
        <i class="fas fa-home"></i><span>Home</span>
      </a>
      <a href="products.html" class="sidebar-link" data-i18n="nav_products">
        <i class="fas fa-box-open"></i><span>Products</span>
      </a>
      <a href="about.html" class="sidebar-link" data-i18n="nav_about">
        <i class="fas fa-info-circle"></i><span>About Us</span>
      </a>
      <a href="consultation.html" class="sidebar-link" data-i18n="nav_consultation">
        <i class="fas fa-user-md"></i><span>Consultation</span>
      </a>
      <a href="contact.html" class="sidebar-link" data-i18n="nav_contact">
        <i class="fas fa-envelope"></i><span>Contact</span>
      </a>
      <a href="partner.html" class="sidebar-link" data-i18n="nav_partner">
        <i class="fas fa-handshake"></i><span>Partner With Us</span>
      </a>
    </nav>
    <div class="sidebar-footer">
      <a href="https://wa.me/250788333339" target="_blank" class="sidebar-whatsapp">
        <i class="fab fa-whatsapp"></i><span>Chat on WhatsApp</span>
      </a>
    </div>
  </div>
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

    // Mark active nav link in both navbar and sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .sidebar-link').forEach(link => {
      if (link.getAttribute('href') === currentPage) link.classList.add('nav-active');
    });

    initSidebar();

    if (typeof translatePage === 'function') {
      const savedLang = localStorage.getItem('isoko_lang') || 'en';
      translatePage(savedLang, false);
    }
  }

  // ─── SIDEBAR ─────────────────────────────────────────────────────────────────
  function initSidebar() {
    const toggle  = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const close   = document.getElementById('sidebar-close');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', openSidebar);
    close?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);

    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', closeSidebar);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSidebar();
    });
  }

  function openSidebar() {
    document.getElementById('sidebar')?.classList.add('open');
    document.getElementById('sidebar-overlay')?.classList.add('visible');
    document.querySelector('.menu-toggle')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('visible');
    document.querySelector('.menu-toggle')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
  } else {
    injectComponents();
  }

})();