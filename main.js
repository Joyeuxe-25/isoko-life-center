/* ============================================================
   ISOKO LIFE CENTER — main.js
   Translations · Slogan rotation · Nav · Cart · Newsletter · USSD
   ============================================================ */

'use strict';

/* ── STATE ── */
let currentLang = localStorage.getItem('isoko_lang') || 'en';
let slogans     = [];
let sloganIndex = 0;
let sloganTimer = null;

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  setYear();
  translatePage(currentLang, false); // no toast on initial load
  startSloganRotation();
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
  initCart();
  initNewsletter();
  initUssd();
  initNavButtons();
  initLangButtons();
});

/* ── YEAR ── */
function setYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── TRANSLATE ── */
function translatePage(lang, showToast = true) {
  if (!translations[lang]) return;
  currentLang = lang;
  const t = translations[lang];

  /* Simple text nodes */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!t[key]) return;
    if (el.tagName === 'INPUT' && el.type === 'email') {
      el.placeholder = t[key];
    } else {
      el.textContent = t[key];
    }
  });

  /* Hero title — three-part structure */
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle && t.hero_title_main) {
    heroTitle.innerHTML =
      `${t.hero_title_main} <em>${t.hero_title_em}</em> ${t.hero_title_suffix}`;
  }

  /* Business title — three-part structure */
  const bizTitle = document.getElementById('business-title');
  if (bizTitle && t.business_title_main) {
    bizTitle.innerHTML =
      `${t.business_title_main} <em>${t.business_title_em}</em> ${t.business_title_suffix}`;
  }

  /* Active lang button */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  /* Persist & set html lang */
  localStorage.setItem('isoko_lang', lang);
  document.documentElement.lang = lang;

  /* Restart slogans with new language */
  buildSlogans(lang);
  showCurrentSlogan();

  if (showToast) showLangToast(lang);
}

/* ── SLOGANS ── */
function buildSlogans(lang) {
  const t = translations[lang];
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

/* ── LANGUAGE BUTTONS ── */
function initLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang && translations[lang]) translatePage(lang);
    });
  });
}

/* ── NAVBAR SCROLL ── */
function initNavScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      const offset = document.querySelector('.navbar')?.offsetHeight || 0;
      const topbarH = document.querySelector('.topbar')?.offsetHeight || 0;
      window.scrollTo({
        top: target.offsetTop - offset - topbarH,
        behavior: 'smooth',
      });
      document.querySelector('.nav-links')?.classList.remove('open');
    });
  });
}

/* ── ADD TO CART ── */
function initCart() {
  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', function () {
      const card     = this.closest('.product-card');
      const name     = card?.querySelector('h3')?.textContent || '';
      const messages = {
        en: `"${name}" added to cart!`,
        fr: `"${name}" ajouté au panier !`,
        rw: `"${name}" yongewe mu biguzwe!`,
      };

      /* Button feedback */
      const original = this.innerHTML;
      this.classList.add('added');
      this.innerHTML = '<i class="fas fa-check"></i> <span>' +
        (currentLang === 'fr' ? 'Ajouté!' : currentLang === 'rw' ? 'Yashyizweho!' : 'Added!') +
        '</span>';

      setTimeout(() => {
        this.innerHTML = original;
        this.classList.remove('added');
      }, 2200);

      showNotification(messages[currentLang] || messages.en, 'success');
    });
  });
}

/* ── NEWSLETTER ── */
function initNewsletter() {
  const form = document.querySelector('.newsletter-form form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    if (!email) return;
    const messages = {
      en: `Thank you for subscribing with ${email}!`,
      fr: `Merci de vous être abonné avec ${email} !`,
      rw: `Murakoze kwiyandikisha na ${email}!`,
    };
    showNotification(messages[currentLang] || messages.en, 'success');
    form.reset();
  });
}

/* ── USSD ── */
function initUssd() {
  document.querySelector('.btn-ussd')?.addEventListener('click', () => {
    const messages = {
      en: 'Dial *123# on your phone to access Isoko Life Center services.',
      fr: 'Composez *123# sur votre téléphone pour accéder aux services Isoko Life Center.',
      rw: 'Kanda *123# kuri telefoni yawe kugirango ugere ku serivisi za Isoko Life Center.',
    };
    showNotification(messages[currentLang] || messages.en, 'info');
  });
}

/* ── NAV BUTTONS (Login / Register) ── */
function initNavButtons() {
  document.querySelector('.btn-nav-login')?.addEventListener('click', () => {
    const m = { en: 'Login page coming soon.', fr: 'Page de connexion bientôt disponible.', rw: 'Urupapuro rwo kwinjira ruzaza vuba.' };
    showNotification(m[currentLang] || m.en, 'info');
  });
  document.querySelector('.btn-nav-register')?.addEventListener('click', () => {
    const m = { en: 'Registration page coming soon.', fr: "Page d'inscription bientôt disponible.", rw: 'Urupapuro rwo kwiyandikisha ruzaza vuba.' };
    showNotification(m[currentLang] || m.en, 'info');
  });
}

/* ── NOTIFICATION HELPER ── */
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
