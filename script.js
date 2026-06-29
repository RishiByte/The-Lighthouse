// =============================================
// DOM ELEMENTS
// =============================================
const nav = document.getElementById("nav");
const cuisineDropdown = document.getElementById("cuisine-filter");
const menuSearch = document.getElementById("menu-search");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const heroBg = document.getElementById("heroBg");
const reservationBg = document.getElementById("reservationBg");
const reservationForm = document.getElementById("reservationForm");
const dateInput = document.getElementById("reservation-date");
const timeSelect = document.getElementById("time");
const themeToggle = document.getElementById("themeToggle");

// FIX #4 — Declare filterBtns, menuTabs, menuPanels (were used but never declared)
const filterBtns = document.querySelectorAll(".filter-btn");
const menuTabs = document.querySelectorAll(".menu-tab");
const menuPanels = document.querySelectorAll(".menu-panel");

// ── Device detection ───
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
<<<<<<< HEAD

// ── DOM ELEMENTS ──
const nav            = document.getElementById('nav');
const navToggle      = document.getElementById('navToggle');
const navMenu        = document.getElementById('navMenu');
const navLinks       = document.querySelectorAll('.nav-link');
const heroBg         = document.getElementById('heroBg');
const reservationBg  = document.getElementById('reservationBg');
const reservationForm= document.getElementById('reservationForm');
const dateInput      = document.getElementById('date');
const timeSelect     = document.getElementById('time');
const themeToggle    = document.getElementById('themeToggle');
=======
>>>>>>> 46abbe531568d6a4944880e4df703b40c06b71c6

// ── EmailJS Configuration ──
// Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
  publicKey:       'abc123XYZ',        // actual public key
  serviceId:       'service_abc1234',  //  actual service ID
  guestTemplateId: 'template_guest01', //  template ID
  adminTemplateId: 'template_admin02', // template ID
};

// Initialise EmailJS as soon as the key is set
if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}

// ── FIX #9 — show correct scroll hint based on input type ────────
const scrollHintMouse = document.querySelector('.scroll-hint-mouse');
const scrollHintTouch = document.querySelector('.scroll-hint-touch');

if (scrollHintMouse && scrollHintTouch) {
  scrollHintMouse.style.display = isTouchDevice ? 'none' : '';
  scrollHintTouch.style.display = isTouchDevice ? '' : 'none';
}

// ── FIX #13 — Date validation: min = tomorrow, max = 90 days out ─────
if (dateInput) {
  const tomorrow = new Date(Date.now() + 86400000);
  const maxDate = new Date(Date.now() + 90 * 86400000);

  dateInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);
  dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);

  dateInput.addEventListener('change', updateAvailableTimes);
}

<<<<<<< HEAD
// ── FIX #11 — Disable past time slots when today is selected ──
=======
// ── FIX #11 — Disable past time slots when today is selected ─────
>>>>>>> 46abbe531568d6a4944880e4df703b40c06b71c6
function updateAvailableTimes() {
  if (!dateInput || !timeSelect) return;

  const selectedDate = dateInput.value;
  const todayStr = new Date().toISOString().split('T')[0];
  const now = new Date();
  const currentHours = now.getHours();
  const currentMins = now.getMinutes();

  timeSelect.querySelectorAll('option').forEach((option) => {
    if (!option.value) return;

    const [optHours, optMins] = option.value.split(':').map(Number);

    if (selectedDate === todayStr) {
      const isPast =
        optHours < currentHours ||
        (optHours === currentHours && optMins <= currentMins + 30);

      option.disabled = isPast;
      if (isPast && option.selected) {
        timeSelect.value = '';
      }
    } else {
      option.disabled = false;
    }
  });
}



// ── Navigation scroll effect ──
function handleScroll() {
  const currentScroll = window.scrollY;

  nav.classList.toggle('scrolled', currentScroll > 50);

<<<<<<< HEAD
  // FIX #14 — Parallax completely skipped on touch/iOS
=======
  // Parallax skipped on touch devices
>>>>>>> 46abbe531568d6a4944880e4df703b40c06b71c6
  if (!isTouchDevice) {
    if (heroBg) {
      heroBg.style.transform = `translateY(${currentScroll * 0.5}px)`;
    }
    if (reservationBg && currentScroll > window.innerHeight) {
      const sectionTop = document.getElementById('reservation').offsetTop;
      const offset = (currentScroll - sectionTop) * 0.3;
      reservationBg.style.transform = `translateY(${offset}px)`;
    }
  }

  updateActiveNavLink();
}

// ── Active nav link on scroll ──
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ── Mobile menu ──
function toggleMobileMenu() {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
  navToggle.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = '';
}

<<<<<<< HEAD
// ── Menu tabs functionality ──
function switchMenuTab(e) {
  const targetTab = e.target.dataset.tab;

  document.querySelectorAll('.menu-tab').forEach((tab) => {
    tab.classList.remove('active');
  });
  e.target.classList.add('active');

  document.querySelectorAll('.menu-panel').forEach((panel) => {
    panel.classList.remove('active');
    if (panel.id === targetTab) {
      panel.classList.add('active');
    }
  });
}

// ── Menu search & filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const menuSearch = document.getElementById('menu-search');

function getActiveFilter() {
  return document.querySelector('.filter-btn.active').dataset.filter;
}

function getActiveDiet() {
  const activeBtn = document.querySelector('.diet-btn.active');
  return activeBtn ? activeBtn.dataset.type : 'all';
}

function filterMenuItems(filter = 'all', searchText = '', diet = 'all') {
  const menuItems = document.querySelectorAll('.menu-item');
  let visibleCount = 0;

  menuItems.forEach((item) => {
    const itemName      = item.querySelector('h3').textContent.toLowerCase();
    const category      = item.dataset.category;
    const type          = item.dataset.type;

    const matchesSearch = itemName.includes(searchText.toLowerCase());
    const matchesFilter = filter === 'all' || category === filter;
    const matchesDiet   = diet === 'all' || type === diet;

    if (matchesSearch && matchesFilter && matchesDiet) {
=======
// Menu tabs functionality
function switchMenuTab(e) {
  const targetTab = e.target.dataset.tab;

  // Update tab buttons
  menuTabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  e.target.classList.add("active");

  // Update panels
  menuPanels.forEach((panel) => {
    panel.classList.remove("active");
    if (panel.id === targetTab) {
      panel.classList.add("active");
    }
  });
}

//
// Theme Toggle
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");

  if (isLight) {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "🌙";
  }
});

// ── Menu Search and Filter ─────────────────────────

// FIX #1 — Use the correct parameter names (timeFilter, cuisineFilter) instead of undefined 'filter'
function filterMenuItems(timeFilter, cuisineFilter, searchText) {
  const menuItems = document.querySelectorAll(".menu-item");
  let visibleCount = 0;

  menuItems.forEach((item) => {
    const itemName = item.querySelector('h3')?.textContent?.toLowerCase() || '';
    const category = item.dataset.category;
    const matchesSearch = !searchText || itemName.includes(searchText.toLowerCase());
    const matchesTime = timeFilter === 'all' || category === timeFilter;
    const matchesCuisine = !cuisineFilter || cuisineFilter === 'all' || item.dataset.cuisine === cuisineFilter;

    if (matchesSearch && matchesTime && matchesCuisine) {
>>>>>>> 46abbe531568d6a4944880e4df703b40c06b71c6
      item.classList.remove('hidden-item');
      visibleCount++;
    } else {
      item.classList.add('hidden-item');
    }
  });

  // Handle "No Results" display
  let noResults = document.querySelector(".no-results");
  if (visibleCount === 0) {
    if (!noResults) {
      noResults = document.createElement('p');
      noResults.className = 'no-results';
      noResults.textContent = i18next.t('menu.no_results');
      document.querySelector('.menu-content')?.appendChild(noResults);
    }
  } else if (noResults) {
    noResults.remove();
  }
}

function triggerFilter() {
  const activeBtn = document.querySelector(".filter-btn.active");
  const timeFilter = activeBtn ? activeBtn.dataset.filter : "all";
  const cuisineFilter = cuisineDropdown ? cuisineDropdown.value : "all";
  const searchText = menuSearch ? menuSearch.value : "";
  
  filterMenuItems(timeFilter, cuisineFilter, searchText);
}

if (cuisineDropdown) {
  cuisineDropdown.addEventListener("change", triggerFilter);
}

if (menuSearch) {
  menuSearch.addEventListener("input", triggerFilter);
}

// Filter buttons
filterBtns.forEach((btn) => {
<<<<<<< HEAD
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    filterMenuItems(btn.dataset.filter, menuSearch ? menuSearch.value : '', getActiveDiet());
  });
});

if (menuSearch) {
  menuSearch.addEventListener('input', () => {
    filterMenuItems(getActiveFilter(), menuSearch.value, getActiveDiet());
  });
}

// ── Diet filter buttons ──
const dietBtns = document.querySelectorAll('.diet-btn');

dietBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    dietBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    filterMenuItems(getActiveFilter(), menuSearch ? menuSearch.value : '', btn.dataset.type);
  });
});

// ── Smooth scroll ──
=======
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    triggerFilter();
  });
});

// FIX #2 — Removed duplicate menuSearch 'input' listener (was calling filterMenuItems with wrong/missing args)

 

// Smooth scroll for navigation links
>>>>>>> 46abbe531568d6a4944880e4df703b40c06b71c6
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);

  if (targetSection) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  }
  closeMobileMenu();
}

// ── EmailJS helper: format date & time for readable email ──
function formatBookingDate(dateStr) {
  if (!dateStr) return dateStr;
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatBookingTime(timeStr) {
  if (!timeStr) return timeStr;
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

// ── Reservation toast notification ──
function showReservationToast(type, message) {
  // Remove any existing toast
  const existing = document.querySelector('.reservation-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `reservation-toast reservation-toast--${type}`;
  toast.innerHTML = `
    <div class="reservation-toast__icon">${type === 'success' ? '✓' : '✕'}</div>
    <div class="reservation-toast__body">
      <p class="reservation-toast__title">${type === 'success' ? 'Reservation Requested!' : 'Something went wrong'}</p>
      <p class="reservation-toast__msg">${message}</p>
    </div>
    <button class="reservation-toast__close" aria-label="Close">✕</button>
  `;

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('reservation-toast--visible'));

  // Close button
  toast.querySelector('.reservation-toast__close').addEventListener('click', () => {
    toast.classList.remove('reservation-toast--visible');
    setTimeout(() => toast.remove(), 400);
  });

  // Auto-remove after 6s
  setTimeout(() => {
    toast.classList.remove('reservation-toast--visible');
    setTimeout(() => toast.remove(), 400);
  }, 6000);
}

// ── Reservation form submission (with EmailJS) ──
async function handleFormSubmit(e) {
  e.preventDefault();

  const inputs = reservationForm.querySelectorAll('input, select, textarea');
<<<<<<< HEAD
  let isValid  = true;
=======
  let isValid = true;
>>>>>>> 46abbe531568d6a4944880e4df703b40c06b71c6

  inputs.forEach((input) => {
    if (input.required && !input.value) {
      input.style.borderColor = '#c94a4a';
      isValid = false;
    } else {
      input.style.borderColor = '';
    }
  });

<<<<<<< HEAD
  if (!isValid) return;

  const submitBtn    = reservationForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Gather form data
  const formData = {
    guest_name:      document.getElementById('name').value.trim(),
    guest_email:     document.getElementById('email').value.trim(),
    guest_phone:     document.getElementById('phone').value.trim(),
    guest_count:     document.getElementById('guests').value,
    booking_date:    formatBookingDate(document.getElementById('date').value),
    booking_time:    formatBookingTime(document.getElementById('time').value),
    special_requests: document.getElementById('requests').value.trim() || 'None',
    restaurant_name: 'The Lighthouse',
    restaurant_phone: '(555) 123-4567',
    restaurant_email: 'reservations@thelighthouse.com',
  };

  // Loading state
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  // EmailJS not configured → graceful fallback (still shows success UX)
  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.warn('[EmailJS] Not configured — running in demo mode. Fill in EMAILJS_CONFIG in script.js.');
    await new Promise(r => setTimeout(r, 1200));
    showReservationToast('success', `Thank you, ${formData.guest_name}! We'll confirm your table for ${formData.guest_count} guest(s) on ${formData.booking_date} at ${formData.booking_time} within 24 hours.`);
    reservationForm.reset();
    updateAvailableTimes();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    return;
  }

  try {
    // Send guest confirmation email
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.guestTemplateId,
      formData
    );

    // Send admin notification email
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.adminTemplateId,
      formData
    );

    showReservationToast(
      'success',
      `Thank you, ${formData.guest_name}! A confirmation has been sent to ${formData.guest_email}. We look forward to welcoming you on ${formData.booking_date} at ${formData.booking_time}.`
    );

    reservationForm.reset();
    updateAvailableTimes();

  } catch (err) {
    console.error('[EmailJS] Error:', err);
    showReservationToast(
      'error',
      'We couldn\'t send your confirmation email. Please call us at (555) 123-4567 or try again.'
    );
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// ── FIX #15 — Intersection Observer with prefers-reduced-motion ──
=======
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');

  // Remove old error messages
  document.querySelectorAll('.error-message').forEach(el => el.remove());

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput && !emailRegex.test(emailInput.value.trim())) {
    emailInput.style.borderColor = '#c94a4a';
    const emailError = document.createElement('small');
    emailError.className = 'error-message';
    emailError.style.color = '#c94a4a';
    emailError.textContent = i18next.t('reservation.email_error');
    emailInput.parentElement.appendChild(emailError);
    isValid = false;
  }

  // Phone validation
  if (phoneInput) {
    const phoneValue = phoneInput.value.replace(/\D/g, '');
    if (phoneValue.length !== 10) {
      phoneInput.style.borderColor = '#c94a4a';
      const phoneError = document.createElement('small');
      phoneError.className = 'error-message';
      phoneError.style.color = '#c94a4a';
      phoneError.textContent = i18next.t('reservation.phone_error');
      phoneInput.parentElement.appendChild(phoneError);
      isValid = false;
    }
  }

  if (isValid) {
    const submitBtn = reservationForm.querySelector('button[type="submit"]');
    submitBtn.textContent = i18next.t('reservation.submit_requested');
    submitBtn.style.backgroundColor = '#4a9c6a';
    submitBtn.disabled = true;

    setTimeout(() => {
      reservationForm.reset();
      updateAvailableTimes();
      submitBtn.textContent = i18next.t('reservation.submit');
      submitBtn.style.backgroundColor = '';
      submitBtn.disabled = false;
      updateAvailableTimes();
    }, 3000);
  }
}

// ── Intersection Observer with prefers-reduced-motion ──────
>>>>>>> 46abbe531568d6a4944880e4df703b40c06b71c6
function setupIntersectionObserver() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animatedElements = document.querySelectorAll(
    '.about-content, .menu-panel, .reservation-form, .location-info'
  );

  if (prefersReduced) {
    animatedElements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.1 }
  );

  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Inject .visible class styles
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ── Auto-scroll on hero click ──
const heroScroll = document.querySelector('.hero-scroll');
let autoScrollInterval = null;

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    window.scrollBy({ top: 2, behavior: 'instant' });
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      stopAutoScroll();
    }
  }, 15);
}

function stopAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
}

if (heroScroll) {
  heroScroll.style.cursor = 'pointer';
  heroScroll.addEventListener('click', () => {
    autoScrollInterval ? stopAutoScroll() : startAutoScroll();
  });
}

['mousemove', 'touchstart', 'keydown', 'wheel', 'pointerdown'].forEach((event) => {
  window.addEventListener(event, stopAutoScroll);
});

// ── Back To Top ──
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    const past = window.scrollY > 300;
    backToTopBtn.style.display = past ? 'block' : 'none';
    backToTopBtn.classList.toggle('visible', past);
  });

  backToTopBtn.addEventListener('click', () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });
}

// ── Event Listeners ──
window.addEventListener('scroll', handleScroll);

navToggle.addEventListener('click', toggleMobileMenu);

navLinks.forEach((link) => link.addEventListener('click', smoothScroll));

document.querySelectorAll('.nav-cta, .nav-cta-mobile, .hero-buttons a').forEach((link) => {
  link.addEventListener('click', smoothScroll);
});

if (reservationForm) {
  reservationForm.addEventListener('submit', handleFormSubmit);
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMobileMenu();
});

// ── Reviews (localStorage) ──
const STORAGE_KEY = 'lighthouse_reviews';

const pinnedReview = {
  name: 'Rasshi Srivastav',
  rating: 5,
  text: 'reviews.pinned_review_text',
  date: 'reviews.pinned_review_date',
};

function getReviews() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return [];
}

function saveReviews(reviews) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

function renderReviews() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;

  const userReviews = getReviews();
  const activePinnedReview = {
    ...pinnedReview,
    text: typeof i18next !== 'undefined' && i18next.t ? i18next.t(pinnedReview.text) : pinnedReview.text,
    date: typeof i18next !== 'undefined' && i18next.t ? i18next.t(pinnedReview.date) : pinnedReview.date,
  };
  const allReviews = [activePinnedReview, ...userReviews];

  grid.innerHTML = allReviews
    .map(
      (r) => `
      <div class="review-card">
        <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        <p class="review-text">${r.text}</p>
        <div class="review-author">
          <div class="review-avatar">${r.name.slice(0, 2).toUpperCase()}</div>
          <div>
            <span class="review-name">${r.name}</span>
            <span class="review-date">${r.date}</span>
          </div>
        </div>
      </div>`
    )
    .join('');
}

// ── Star rating widget ──
let selectedRating = 0;
const starBtns = document.querySelectorAll('#star-input .star-btn');

starBtns.forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    const val = +btn.dataset.value;
    starBtns.forEach((s) => s.classList.toggle('active', +s.dataset.value <= val));
  });
  btn.addEventListener('mouseleave', () => {
    starBtns.forEach((s) => s.classList.toggle('active', +s.dataset.value <= selectedRating));
  });
  btn.addEventListener('click', () => {
    selectedRating = +btn.dataset.value;
    document.getElementById('review-rating').value = selectedRating;
    starBtns.forEach((s) => s.classList.toggle('active', +s.dataset.value <= selectedRating));
  });
});

// ── Review validation helpers ──
function isMeaningfulReview(text) {
  const words = text.trim().split(/\s+/);
  const randomPattern = /^(.)\1+$|^[a-zA-Z]{1,6}$/;
  if (randomPattern.test(text.trim())) return false;
  return words.length >= 3;
}

function isValidName(name) {
  return /^[A-Za-z\s'\-]{3,30}$/.test(name.trim());
}

const reviewForm = document.getElementById('review-form');
const reviewMsg = document.getElementById('review-msg');

if (reviewForm) {
  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('review-name').value.trim();
    const reviewText = document.getElementById('review-text').value.trim();

    reviewMsg.style.display = 'block';

    if (!selectedRating) {
      reviewMsg.textContent = i18next.t('reviews.rating_error');
      reviewMsg.style.color = '#c94a4a';
      return;
    }
    if (!isValidName(name)) {
      reviewMsg.textContent = i18next.t('reviews.name_error');
      reviewMsg.style.color = '#c94a4a';
      return;
    }
    if (reviewText.length < 20) {
      reviewMsg.textContent = i18next.t('reviews.text_length_error');
      reviewMsg.style.color = '#c94a4a';
      return;
    }
    if (!isMeaningfulReview(reviewText)) {
      reviewMsg.textContent = i18next.t('reviews.meaningful_error');
      reviewMsg.style.color = '#c94a4a';
      return;
    }

    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newReview = {
      id: Date.now(),
      name,
      rating: selectedRating,
      text: reviewText,
      date: dateStr,
    };
    const reviews = getReviews();
    reviews.unshift(newReview);
    saveReviews(reviews);
    renderReviews();

    reviewForm.reset();
    selectedRating = 0;
    document.getElementById('review-rating').value = 0;
    starBtns.forEach((s) => s.classList.remove('active'));

    reviewMsg.textContent = i18next.t('reviews.success_msg');
    reviewMsg.style.color = '#4a9c6a';
    setTimeout(() => {
      reviewMsg.style.display = 'none';
    }, 3000);
  });
}

<<<<<<< HEAD
// ── Initialise ──
document.addEventListener('DOMContentLoaded', () => {
  handleScroll();
  setupIntersectionObserver();
  updateAvailableTimes();
  renderReviews();
});

// ── Veg / Non-Veg Filter ──
=======
// ── Veg / Non-Veg Filter ──────────────────────────────
// 1. Your filtering function, contained properly
>>>>>>> 46abbe531568d6a4944880e4df703b40c06b71c6
(function () {
  const dietFilterBtns = document.querySelectorAll('.diet-btn');
  if (!dietFilterBtns.length) return;

  function applyDietFilter(diet) {
    const activePanels = document.querySelectorAll('.menu-panel.active');

    activePanels.forEach((panel) => {
      const items = panel.querySelectorAll('.menu-item');
      let visibleCount = 0;

      items.forEach((item) => {
        const itemDiet = item.dataset.diet || 'all';
        const show = diet === 'all' || itemDiet === diet;
        item.classList.toggle('diet-hidden', !show);
        if (show) visibleCount++;
      });

      let noResults = panel.querySelector('.diet-no-results');
      if (!noResults) {
        noResults = document.createElement('p');
        noResults.className = 'diet-no-results';
        noResults.textContent = i18next.t('menu.diet_no_results');
        const menuItems = panel.querySelector('.menu-items');
        if (menuItems) {
          menuItems.appendChild(noResults);
        }
      }
      noResults.classList.toggle('visible', visibleCount === 0);
    });
  }

<<<<<<< HEAD
  dietFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dietFilterBtns.forEach(b => b.classList.remove('active'));
=======
  dietFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      dietFilterBtns.forEach((b) => b.classList.remove('active'));
>>>>>>> 46abbe531568d6a4944880e4df703b40c06b71c6
      btn.classList.add('active');
      applyDietFilter(btn.dataset.diet);
    });
  });

<<<<<<< HEAD
  document.querySelectorAll('.menu-tab').forEach(tab => {
=======
  document.querySelectorAll('.menu-tab').forEach((tab) => {
>>>>>>> 46abbe531568d6a4944880e4df703b40c06b71c6
    tab.addEventListener('click', () => {
      const activeDiet = document.querySelector('.diet-btn.active')?.dataset.diet || 'all';
      setTimeout(() => applyDietFilter(activeDiet), 50);
    });
  });
})();
<<<<<<< HEAD
//template_Ido6xlg
//admin-id - template_9padn1g
//SDxz-_pGgtOMpjuNF - public key
//service_gzi9gm2g 
=======

// =============================================
// 3D CARD FLIP ENHANCEMENTS
// =============================================

function handleCardFlip() {
  const cards = document.querySelectorAll('.food-card-3d');
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouch) {
    cards.forEach((card) => {
      card.addEventListener('click', function (e) {
        if (e.target.closest('a') || e.target.closest('button')) return;
        this.classList.toggle('flipped');
      });
    });
  }
}

// Reset mobile flip when clicking elsewhere
document.addEventListener('click', function (e) {
  if (!e.target.closest('.food-card-3d')) {
    document.querySelectorAll('.food-card-3d.flipped').forEach((card) => {
      card.classList.remove('flipped');
    });
  }
});

// Translate UI Content
function updateContent() {
  if (typeof i18next === 'undefined' || !i18next.t) return;
  
  // Translate standard data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach((elem) => {
    const key = elem.getAttribute("data-i18n");
    elem.textContent = i18next.t(key);
  });

  // Translate placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((elem) => {
    const key = elem.getAttribute("data-i18n-placeholder");
    elem.setAttribute("placeholder", i18next.t(key));
  });

  // Translate titles
  document.querySelectorAll("[data-i18n-title]").forEach((elem) => {
    const key = elem.getAttribute("data-i18n-title");
    elem.setAttribute("title", i18next.t(key));
  });

  // Dynamic Elements
  const noResults = document.querySelector(".no-results");
  if (noResults) {
    noResults.textContent = i18next.t('menu.no_results');
  }

  const dietNoResults = document.querySelectorAll(".diet-no-results");
  dietNoResults.forEach((el) => {
    el.textContent = i18next.t('menu.diet_no_results');
  });

  // Update reviews
  renderReviews();
}

// ── Initialise ───
document.addEventListener('DOMContentLoaded', function () {
  handleScroll();
  setupIntersectionObserver();
  updateAvailableTimes();
  handleCardFlip();

  // Initialize i18next
  if (typeof i18next !== 'undefined') {
    i18next
      .use(i18nextHttpBackend)
      .use(i18nextBrowserLanguageDetector)
      .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'hi', 'gu'],
        load: 'languageOnly',
        backend: {
          loadPath: '/locales/{{lng}}/translation.json'
        },
        detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage']
        }
      }, function (err, t) {
        if (err) return console.error(err);

        const activeLang = i18next.resolvedLanguage || 'en';
        const langSelectors = document.querySelectorAll('.language-select');
        langSelectors.forEach((langSelector) => {
          langSelector.value = activeLang;
          langSelector.addEventListener('change', (e) => {
            const selectedVal = e.target.value;
            // Update all language dropdowns on the page to match
            document.querySelectorAll('.language-select').forEach((sel) => {
              sel.value = selectedVal;
            });
            i18next.changeLanguage(selectedVal, (err, t) => {
              if (err) return console.error(err);
              updateContent();
            });
          });
        });

        updateContent();
      });
  } else {
    renderReviews();
  }
});

// Mobile flip style
const styleForMobile = `
  @media (max-width: 768px) {
    .food-card-3d.flipped .food-card-inner {
      transform: rotateY(180deg) scale(1.01);
    }
  }
`;

const mobileStyle = document.createElement('style');
mobileStyle.textContent = styleForMobile;
document.head.appendChild(mobileStyle);

// Automatically update copyright year
const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
>>>>>>> 46abbe531568d6a4944880e4df703b40c06b71c6
