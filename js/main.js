/* ============================================================
   ISOKO LIFE CENTER — main.js
   ============================================================ */

'use strict';

let currentLang = localStorage.getItem('isoko_lang') || 'en';
let slogans     = [];
let sloganIndex = 0;
let sloganTimer = null;

const ISOKO_CONTACT_FALLBACK = Object.freeze({
  businessName: 'Isoko Life Center',
  legalName: 'Isoko Life Center Ltd',
  email: 'info@isokolifecenter.com',
  phoneDisplay: '+250 788 333 339',
  phoneTel: '+250788333339',
  whatsappNumber: '250788333339',
});

document.addEventListener('DOMContentLoaded', () => {
  startSloganRotation();
  initEnquiry();
  initSmoothScroll();
});

/* ── TRANSLATE ── */
function translatePage(lang, showToast = true) {
  if (!translations[lang]) return;
  currentLang = lang;
  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!t[key]) return;
    if (el.tagName === 'INPUT' && (el.type === 'email' || el.type === 'text' || el.type === 'tel')) {
      el.placeholder = t[key];
    } else {
      el.textContent = t[key];
    }
  });

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle && t.hero_title_main) {
    heroTitle.innerHTML = `${t.hero_title_main} <em>${t.hero_title_em}</em> ${t.hero_title_suffix}`;
  }

  const bizTitle = document.getElementById('business-title');
  if (bizTitle && t.business_title_main) {
    bizTitle.innerHTML = `${t.business_title_main} <em>${t.business_title_em}</em> ${t.business_title_suffix}`;
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('isoko_lang', lang);
  document.documentElement.lang = lang;

  buildSlogans(lang);
  showCurrentSlogan();

  if (showToast) showLangToast(lang);
}

/* ── SET LANG ── */
function setLang(lang) {
  translatePage(lang, true);
}

/* ── SLOGANS ── */
function buildSlogans(lang) {
  const t = translations[lang];
  if (!t) return;
  slogans = [t.slogan1, t.slogan2, t.slogan3, t.slogan4].filter(Boolean);
  sloganIndex = 0;
}

function showCurrentSlogan() {
  const el = document.querySelector('.hero-slogan');
  if (!el || !slogans.length) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = slogans[sloganIndex];
    el.style.opacity = '1';
  }, 200);
}

function startSloganRotation() {
  buildSlogans(currentLang);
  showCurrentSlogan();
  clearInterval(sloganTimer);
  sloganTimer = setInterval(() => {
    sloganIndex = (sloganIndex + 1) % slogans.length;
    showCurrentSlogan();
  }, 3200);
}

/* ── LANGUAGE TOAST ── */
function showLangToast(lang) {
  const names = { en: 'English', fr: 'Français', rw: 'Kinyarwanda' };
  document.querySelector('.lang-toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'lang-toast';
  toast.innerHTML = `<i class="fas fa-language"></i> Language changed to ${names[lang] || lang}`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 2800);
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      const navH    = document.querySelector('.navbar')?.offsetHeight || 0;
      const topbarH = document.querySelector('.topbar')?.offsetHeight || 0;
      window.scrollTo({ top: target.offsetTop - navH - topbarH, behavior: 'smooth' });
    });
  });
}

function getIsokoContacts() {
  return window.ISOKO_CONTACTS || ISOKO_CONTACT_FALLBACK;
}

function createWhatsAppUrl(message) {
  const contacts = getIsokoContacts();
  return `https://wa.me/${contacts.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* ── PRODUCT ENQUIRY ── */
function initEnquiry() {
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.btn-enquire, .btn-enquire-large');
    if (!btn) return;

    // If already showing WhatsApp, open it directly
    if (btn.classList.contains('showing-whatsapp')) {
      const url = btn.dataset.waUrl;
      if (url) window.open(url, '_blank');
      return;
    }

    const card  = btn.closest('.product-card, .product-detail');
    const name  = card?.querySelector('h3, h1')?.textContent?.trim() || 'a product';
    const contacts = getIsokoContacts();
    const message = card
      ? `Hello ${contacts.businessName}, I would like to enquire about ${name}.`
      : `Hello ${contacts.businessName}, I would like more information about your services.`;
    const waUrl = createWhatsAppUrl(message);

    // Store URL on button and transform it
    btn.dataset.originalHtml = btn.innerHTML;
    btn.dataset.waUrl = waUrl;
    btn.classList.add('showing-whatsapp');
    btn.innerHTML = `<i class="fab fa-whatsapp"></i> <span data-i18n="btn_chat_whatsapp">Chat on WhatsApp</span>`;

    // Reset after 6 seconds
    setTimeout(() => {
      btn.classList.remove('showing-whatsapp');
      delete btn.dataset.waUrl;
      btn.innerHTML = btn.dataset.originalHtml || `<i class="fas fa-shopping-bag"></i> <span data-i18n="btn_enquire">Enquire Now</span>`;
      delete btn.dataset.originalHtml;
    }, 6000);
  });
}

/* ── NOTIFICATION ── */
function showNotification(message, type = 'success') {
  document.querySelectorAll('.site-notification').forEach(n => n.remove());
  const colors = {
    success: { bg: '#3A5C3E', icon: 'fa-check-circle' },
    info:    { bg: '#1C2620', icon: 'fa-info-circle'  },
  };
  const { bg, icon } = colors[type] || colors.info;
  const el = document.createElement('div');
  el.className = 'site-notification lang-toast';
  el.style.cssText = `background:${bg};max-width:340px;text-align:center;`;
  el.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 350);
  }, 3200);
}
