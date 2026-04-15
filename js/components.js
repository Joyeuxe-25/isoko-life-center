// components.js — shared header and footer for all pages

(function () {
  // ─── HEADER ────────────────────────────────────────────────────────────────
  const headerHTML = `
  <header class="site-header" id="home">
    <div class="container header-inner">

      <!-- Language switcher -->
      <div class="lang-switcher">
        <button onclick="setLang('en')" class="lang-btn" data-lang="en">English</button>
        <button onclick="setLang('fr')" class="lang-btn" data-lang="fr">Français</button>
        <button onclick="setLang('rw')" class="lang-btn" data-lang="rw">Kinyarwanda</button>
      </div>

      <!-- Logo -->
      <a href="index.html" class="logo">
        <span class="logo-icon" aria-hidden="true">IL</span>
        <span class="logo-text">Isoko Life<br /><strong>Center Ltd</strong></span>
      </a>

      <!-- Nav -->
      <nav class="main-nav" id="main-nav">
        <ul>
          <li><a href="index.html" data-i18n="nav_home">Home</a></li>
          <li><a href="products.html" data-i18n="nav_products">Products</a></li>
          <li><a href="about.html" data-i18n="nav_about">About Us</a></li>
          <li><a href="consultation.html" data-i18n="nav_consultation">Consultation</a></li>
          <li><a href="contact.html" data-i18n="nav_contact">Contact</a></li>
          <li><a href="partner.html" data-i18n="nav_partner">Partner With Us</a></li>
        </ul>
      </nav>

      <!-- Mobile menu toggle -->
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>

    </div>
  </header>
  `;

  // ─── FOOTER ────────────────────────────────────────────────────────────────
  const footerHTML = `
  <footer class="site-footer">
    <div class="container footer-grid">

      <!-- Brand -->
      <div class="footer-brand">
        <a href="index.html" class="logo logo--light">
          <span class="logo-icon" aria-hidden="true">IL</span>
          <span class="logo-text">Isoko Life<br /><strong>Center Ltd</strong></span>
        </a>
        <p data-i18n="footer_tagline">
          Trusted wellness and beauty products for Rwanda — backed by certified health professionals.
        </p>
      </div>

      <!-- Quick Links -->
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

      <!-- Contact -->
      <div class="footer-col">
        <h5 data-i18n="footer_contact">Contact Us</h5>
        <ul class="footer-contact-list">
          <li>Remera Kanombe Kucyamitsingi KN5Road, Kigali, Rwanda</li>
          <li><a href="tel:+250788333339">+250 788 333 339</a></li>
          <li><a href="mailto:info@isokolifecenter.com">info@isokolifecenter.com</a></li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div class="footer-col">
        <h5 data-i18n="footer_newsletter">Newsletter</h5>
        <p style="font-size:0.88rem; opacity:0.75; margin-bottom:12px;" data-i18n="footer_newsletter_sub">
          Subscribe for health tips, product updates, and exclusive offers.
        </p>
        <form class="newsletter-form" onsubmit="return false;">
          <input type="email" placeholder="your@email.com" data-i18n-placeholder="footer_email_placeholder" />
          <button type="submit" data-i18n="footer_subscribe">Subscribe</button>
        </form>
      </div>

    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; <span id="footer-year"></span> Isoko Life Center Ltd. <span data-i18n="footer_rights">All rights reserved.</span></p>
        <div class="footer-legal-links">
          <a href="#" data-i18n="footer_privacy">Privacy Policy</a>
          <a href="#" data-i18n="footer_terms">Terms of Service</a>
          <a href="#" data-i18n="footer_cookies">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
  `;

  // ─── INJECT ─────────────────────────────────────────────────────────────────
  const headerEl = document.getElementById('header-placeholder');
  const footerEl = document.getElementById('footer-placeholder');

  if (headerEl) headerEl.outerHTML = headerHTML;
  if (footerEl) footerEl.outerHTML = footerHTML;

  // Set footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        nav.classList.toggle('nav--open');
        toggle.classList.toggle('is-active');
      });
    }
  });

})();