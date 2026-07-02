// =============================================
// DOM ELEMENTS & GLOBAL VARIABLES
// =============================================
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const heroBg = document.getElementById("heroBg");
const reservationBg = document.getElementById("reservationBg");
const reservationForm = document.getElementById("reservationForm");
const dateInput = document.getElementById("reservation-date");
const timeSelect = document.getElementById("time");
const guestsSelect = document.getElementById("guests");
const themeToggle = document.getElementById("themeToggle");
const menuSearch = document.getElementById("menu-search");
const filterBtns = document.querySelectorAll(".filter-btn");
const menuTabs = document.querySelectorAll(".menu-tab");
const menuPanels = document.querySelectorAll(".menu-panel");
const dietBtns = document.querySelectorAll(".diet-btn");
const cuisineDropdown = document.getElementById("cuisine-filter");
const backToTopBtn = document.getElementById("backToTop");
const heroScroll = document.querySelector(".hero-scroll");
const currentYear = document.getElementById("current-year");

// Order feature globals
const orderDock = document.querySelector(".order-dock");
const orderToggle = document.querySelector(".order-toggle");
const orderTabs = document.querySelectorAll(".order-tab");
const orderViews = document.querySelectorAll(".order-view");
const cartCountEl = document.querySelector(".cart-count");
const cartTotalEl = document.querySelector(".cart-total");
const checkoutBtn = document.querySelector(".order-checkout");
let cart = [];
let favorites = [];
let autoScrollInterval = null;

// Device detection
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

// =============================================
// EMAILJS CONFIGURATION
// =============================================
const EMAILJS_CONFIG = {
  publicKey: 'abc123XYZ',
  serviceId: 'service_abc1234',
  guestTemplateId: 'template_guest01',
  adminTemplateId: 'template_admin02',
};

if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}

// =============================================
// UTILITIES
// =============================================
function saveStoredList(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("localStorage not available");
  }
}

function getStoredList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
}

function updateDeviceHints() {
  const scrollHintMouse = document.querySelector('.scroll-hint-mouse');
  const scrollHintTouch = document.querySelector('.scroll-hint-touch');
  if (scrollHintMouse && scrollHintTouch) {
    scrollHintMouse.style.display = isTouchDevice ? 'none' : '';
    scrollHintTouch.style.display = isTouchDevice ? '' : 'none';
  }
}

// =============================================
// NAVIGATION & SCROLLING
// =============================================
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 150;

  document.querySelectorAll("section[id]").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.id;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      const hasLink = Array.from(navLinks).some((link) => link.dataset.section === sectionId);
      if (!hasLink) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.section === sectionId);
      });
    }
  });
}

function handleScroll() {
  const currentScroll = window.scrollY;

  if (nav) {
    nav.classList.toggle("scrolled", currentScroll > 50);
  }

  if (!isTouchDevice) {
    if (heroBg) {
      heroBg.style.transform = `translateY(${currentScroll * 0.5}px)`;
    }

    const reservationSection = document.getElementById("reservation");
    if (reservationBg && reservationSection && currentScroll > window.innerHeight) {
      const offset = (currentScroll - reservationSection.offsetTop) * 0.3;
      reservationBg.style.transform = `translateY(${offset}px)`;
    }
  }

  if (backToTopBtn) {
    backToTopBtn.classList.toggle("visible", currentScroll > 300);
  }

  updateActiveNavLink();
}

function smoothScroll(e) {
  const targetId = this.getAttribute('href');
  if (!targetId || targetId.startsWith('http') || targetId === '#') return;
  const target = document.querySelector(targetId);
  if (!target) return;

  e.preventDefault();
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: target.offsetTop,
    behavior: prefersReduced ? "auto" : "smooth"
  });
  closeMobileMenu();
}

function toggleMobileMenu() {
  if (!navToggle || !navMenu) return;
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
}

function closeMobileMenu() {
  if (!navToggle || !navMenu) return;
  navToggle.classList.remove("active");
  navMenu.classList.remove("active");
  document.body.style.overflow = "";
}

function setupAutoScroll() {
  if (!heroScroll) return;

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      window.scrollBy({ top: 2, behavior: "auto" });
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        stopAutoScroll();
      }
    }, 15);
  }

  heroScroll.addEventListener("click", () => {
    autoScrollInterval ? stopAutoScroll() : startAutoScroll();
  });

  ["mousemove", "touchstart", "keydown", "wheel", "pointerdown"].forEach((eventName) => {
    window.addEventListener(eventName, stopAutoScroll, { passive: true });
  });
}

// =============================================
// THEME TOGGLE
// =============================================
function updateThemeImages(isLight) {
  const heroImg = document.querySelector("#heroBg img");
  const resImg = document.querySelector("#reservationBg img");
  const lightImg = "./images/hero-restaurant-daytime.png";
  const darkImg = "./images/hero-restaurant.jpg";
  
  if (heroImg) heroImg.src = isLight ? lightImg : darkImg;
  if (resImg) resImg.src = isLight ? lightImg : darkImg;
}

function setupThemeToggle() {
  if (!themeToggle) return;

  let savedTheme = null;
  try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
  const isLightOnLoad = savedTheme === "light";
  
  document.body.classList.toggle("light-theme", isLightOnLoad);
  themeToggle.textContent = isLightOnLoad ? "\u2600" : "\u263E";
  updateThemeImages(isLightOnLoad);

  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    try { localStorage.setItem("theme", isLight ? "light" : "dark"); } catch (e) {}
    themeToggle.textContent = isLight ? "\u2600" : "\u263E";
    updateThemeImages(isLight);
  });
}

// =============================================
// MENU FILTERING & TABS
// =============================================
function switchMenuTab(e) {
  const targetTab = e.target.dataset.tab;
  if (!targetTab) return;

  menuTabs.forEach((tab) => tab.classList.remove('active'));
  e.target.classList.add('active');

  menuPanels.forEach((panel) => {
    panel.classList.remove('active');
    if (panel.id === targetTab) {
      panel.classList.add('active');
    }
  });
}

function getActiveFilter() {
  const activeBtn = document.querySelector('.filter-btn.active');
  return activeBtn ? activeBtn.dataset.filter : 'all';
}

function getActiveDiet() {
  const activeBtn = document.querySelector('.diet-btn.active');
  return activeBtn ? (activeBtn.dataset.type || activeBtn.dataset.diet) : 'all';
}

function filterMenuItems(filter = 'all', searchText = '', diet = 'all') {
  const menuItems = document.querySelectorAll('.menu-content .menu-item');
  let visibleCount = 0;

  menuItems.forEach((item) => {
    const itemName = (item.querySelector('h3')?.textContent || "").toLowerCase();
    const category = item.dataset.category || 'all';
    const itemDiet = item.dataset.diet || item.dataset.type || 'all';

    const matchesSearch = itemName.includes(searchText.toLowerCase());
    const matchesFilter = filter === 'all' || category === filter;
    const matchesDiet = diet === 'all' || itemDiet === diet;

    if (matchesSearch && matchesFilter && matchesDiet) {
      item.classList.remove('hidden-item', 'diet-hidden');
      visibleCount++;
    } else {
      item.classList.add('hidden-item');
    }
  });

  const noResultsMsg = document.querySelector('.diet-no-results') || document.querySelector('.no-results');
  if (noResultsMsg) {
    if (visibleCount === 0) {
      noResultsMsg.classList.add('visible');
      noResultsMsg.style.display = 'block';
    } else {
      noResultsMsg.classList.remove('visible');
      noResultsMsg.style.display = 'none';
    }
  }
}

// =============================================
// RESERVATION SYSTEM
// =============================================
function setReservationDateRange() {
  if (!dateInput) return;
  const tomorrow = new Date(Date.now() + 86400000);
  const maxDate = new Date(Date.now() + 90 * 86400000);
  dateInput.min = tomorrow.toISOString().split('T')[0];
  dateInput.max = maxDate.toISOString().split('T')[0];
}

const TOTAL_TABLES = 12;
const mockBookings = {};

function getAvailableTables(dateStr, timeStr, guestsCount) {
  if (mockBookings[dateStr] && mockBookings[dateStr][timeStr] !== undefined) {
    return mockBookings[dateStr][timeStr];
  }
  const hash = dateStr.split('-').join('') + timeStr.replace(':', '') + (guestsCount || '2');
  let num = parseInt(hash, 10);
  
  const hour = parseInt(timeStr.split(':')[0], 10);
  if (hour >= 18 && hour <= 20) num += 7;
  
  const booked = (num % (TOTAL_TABLES + 3)) - 1; 
  return Math.max(0, TOTAL_TABLES - Math.max(0, booked));
}

function formatBookingDate(dateStr) {
  if (!dateStr) return dateStr;
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatBookingTime(timeStr) {
  if (!timeStr || !timeStr.includes(':')) return timeStr;
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

function updateAvailableTimes() {
  if (!dateInput || !timeSelect) return;

  const selectedDate = dateInput.value;
  const guests = guestsSelect ? guestsSelect.value : "2";
  
  if(!selectedDate) return;

  const todayStr = new Date().toISOString().split('T')[0];
  const now = new Date();
  const currentHours = now.getHours();
  const currentMins = now.getMinutes();

  Array.from(timeSelect.options).forEach(opt => {
    if(!opt.value) return;
    
    const [optHours, optMins] = opt.value.split(':').map(Number);
    let isPast = false;

    if (selectedDate === todayStr) {
      if (optHours < currentHours || (optHours === currentHours && optMins <= currentMins)) {
        isPast = true;
      }
    }
    
    const tables = getAvailableTables(selectedDate, opt.value, guests);
    if (isPast || tables === 0) {
      opt.disabled = true;
      opt.textContent = formatBookingTime(opt.value) + " (Unavailable)";
    } else {
      opt.disabled = false;
      opt.textContent = formatBookingTime(opt.value);
    }
  });
}

function addError(input, message) {
  const error = document.createElement("small");
  error.className = "error-message";
  error.style.color = "#c94a4a";
  error.textContent = message;
  input.parentElement.appendChild(error);
}

function showReservationToast(type, message) {
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
  requestAnimationFrame(() => toast.classList.add('reservation-toast--visible'));

  toast.querySelector('.reservation-toast__close').addEventListener('click', () => {
    toast.classList.remove('reservation-toast--visible');
    setTimeout(() => toast.remove(), 400);
  });

  setTimeout(() => {
    toast.classList.remove('reservation-toast--visible');
    setTimeout(() => toast.remove(), 400);
  }, 6000);
}

async function handleFormSubmit(e) {
  e.preventDefault();

  let isValid = true;
  const emailInput = document.getElementById("email");
  const submitBtn = reservationForm.querySelector('button[type="submit"]');

  reservationForm.querySelectorAll(".error-message").forEach((error) => error.remove());

  reservationForm.querySelectorAll("input, select, textarea").forEach((input) => {
    const invalid = input.required && !input.value.trim();
    input.style.borderColor = invalid ? "#c94a4a" : "";
    if (invalid) isValid = false;
  });

  if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailInput.value.trim())) {
    addError(emailInput, "Please enter a valid email address.");
    isValid = false;
  }

  if (!isValid) return;

  const originalText = submitBtn.textContent;
  const formData = {
    guest_name: document.getElementById('name').value.trim(),
    guest_email: emailInput.value.trim(),
    guest_phone: document.getElementById('phone').value.trim(),
    guest_count: guestsSelect ? guestsSelect.value : '2',
    booking_date: formatBookingDate(dateInput.value),
    booking_time: formatBookingTime(timeSelect.value),
    special_requests: document.getElementById('requests')?.value.trim() || 'None',
    restaurant_name: 'The Lighthouse',
    restaurant_phone: '(555) 123-4567',
    restaurant_email: 'reservations@thelighthouse.com',
  };

  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  if (typeof emailjs === 'undefined' || EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY' || EMAILJS_CONFIG.publicKey === 'abc123XYZ') {
    console.warn('[EmailJS] Not configured — running in demo mode.');
    await new Promise(r => setTimeout(r, 1200));
    showReservationToast('success', `Thank you, ${formData.guest_name}! We'll confirm your table for ${formData.guest_count} guest(s) on ${formData.booking_date} at ${formData.booking_time} within 24 hours.`);
    reservationForm.reset();
    updateAvailableTimes();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    return;
  }

  try {
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.guestTemplateId, formData);
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.adminTemplateId, formData);

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

// =============================================
// INTERSECTION OBSERVER
// =============================================
function setupIntersectionObserver() {
  const animatedElements = document.querySelectorAll(
    ".about-content, .menu-panel, .reservation-form, .location-info"
  );
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    animatedElements.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -50px 0px" }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

// =============================================
// REVIEWS
// =============================================
function setupReviews() {
  const storageKey = "lighthouse_reviews";
  const reviewForm = document.getElementById("review-form");
  const reviewMsg = document.getElementById("review-msg");
  const starBtns = document.querySelectorAll("#star-input .star-btn");
  const ratingInput = document.getElementById("review-rating");
  let selectedRating = 0;

  const pinnedReview = {
    name: "Rasshi Srivastav",
    rating: 5,
    text: "Absolutely loved the food and ambience! Every dish was crafted with such care and the atmosphere was warm and elegant. A truly memorable dining experience - will definitely be coming back!",
    date: "14 May 2026",
  };

  function getReviews() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  }

  function renderReviews() {
    const grid = document.getElementById("reviews-grid");
    if (!grid) return;

    grid.innerHTML = "";
    [pinnedReview, ...getReviews()].forEach((review) => {
      const card = document.createElement("div");
      card.className = "review-card";
      const rating = Math.max(0, Math.min(5, Math.round(Number(review.rating) || 0)));
      const stars = "\u2605".repeat(rating) + "\u2606".repeat(5 - rating);

      card.innerHTML = `
        <div class="review-stars">${stars}</div>
        <p class="review-text"></p>
        <div class="review-author">
          <div class="review-avatar"></div>
          <div>
            <span class="review-name"></span>
            <span class="review-date"></span>
          </div>
        </div>
      `;

      card.querySelector(".review-text").textContent = review.text;
      card.querySelector(".review-avatar").textContent = review.name.slice(0, 2).toUpperCase();
      card.querySelector(".review-name").textContent = review.name;
      card.querySelector(".review-date").textContent = review.date;
      grid.appendChild(card);
    });
  }

  function isMeaningfulReview(text) {
    const value = text.trim();
    const words = value.split(/\s+/);
    return words.length >= 3 && !/^(.)\1+$|^[a-zA-Z]{1,6}$/.test(value);
  }

  if (starBtns.length) {
    starBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        selectedRating = parseInt(e.target.dataset.value, 10);
        if (ratingInput) ratingInput.value = selectedRating;
        starBtns.forEach((s, idx) => {
          s.classList.toggle('active', idx < selectedRating);
        });
      });
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("review-name");
      const textInput = document.getElementById("review-text");
      const name = nameInput ? nameInput.value.trim() : "";
      const text = textInput ? textInput.value.trim() : "";

      if (!reviewMsg) return;
      reviewMsg.style.display = "block";

      if (selectedRating === 0) {
        reviewMsg.textContent = "Please select a rating.";
        reviewMsg.style.color = "#c94a4a";
        return;
      }

      if (!name) {
        reviewMsg.textContent = "Please enter your name.";
        reviewMsg.style.color = "#c94a4a";
        return;
      }

      if (text.length < 20 || !isMeaningfulReview(text)) {
        reviewMsg.textContent = "Please enter a meaningful review of at least 20 characters.";
        reviewMsg.style.color = "#c94a4a";
        return;
      }

      const reviews = getReviews();
      reviews.unshift({
        id: Date.now(),
        name,
        rating: selectedRating,
        text,
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      });

      localStorage.setItem(storageKey, JSON.stringify(reviews));
      renderReviews();
      reviewForm.reset();
      selectedRating = 0;
      if (ratingInput) ratingInput.value = 0;
      starBtns.forEach((star) => star.classList.remove("active"));

      reviewMsg.textContent = "Review submitted successfully!";
      reviewMsg.style.color = "#4a9c6a";
      setTimeout(() => {
        reviewMsg.style.display = "none";
      }, 3000);
    });
  }

  renderReviews();
}

// =============================================
// ORDER & CART SYSTEM
// =============================================
function getMenuItemData(item) {
  const title = item.querySelector("h3")?.textContent.trim() || "Menu item";
  const priceText = item.querySelector(".menu-price")?.textContent || "0";
  const price = Number(priceText.replace(/[^\d.]/g, "")) || 0;
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const image = item.querySelector("img")?.getAttribute("src") || "";
  return { id, title, price, image };
}

function toggleFavorite(item) {
  const exists = favorites.some((favorite) => favorite.id === item.id);
  favorites = exists
    ? favorites.filter((favorite) => favorite.id !== item.id)
    : [...favorites, item];

  saveStoredList("lighthouse_favorites", favorites);
  renderOrderState();
}

function addToCart(item) {
  const existing = cart.find((cartItem) => cartItem.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveStoredList("lighthouse_cart", cart);
  renderOrderState();
  if (orderDock) {
    orderDock.classList.add("open");
    if (orderToggle) orderToggle.setAttribute("aria-expanded", "true");
  }
}

function updateCartQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.qty += delta;
    cart = cart.filter(c => c.qty > 0);
    saveStoredList("lighthouse_cart", cart);
    renderOrderState();
  }
}
// Expose for inline onclick handlers in renderOrderState
window.updateCartQty = updateCartQty;

function renderOrderState() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cartCountEl) cartCountEl.textContent = totalCount;
  if (cartTotalEl) cartTotalEl.textContent = `\u20B9${totalPrice}`;
  if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;

  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    const isFavorite = favorites.some((item) => item.id === btn.dataset.id);
    btn.classList.toggle("active", isFavorite);
    btn.textContent = isFavorite ? "\u2665" : "\u2661";
  });

  const cartList = document.querySelector("#cartView .order-list");
  if (cartList) {
    if (cart.length === 0) {
      cartList.innerHTML = `<div class="order-empty">Your cart is empty.</div>`;
    } else {
      cartList.innerHTML = cart.map(item => `
        <div class="order-item">
          <div>
            <strong>${item.title}</strong>
            <span>\u20B9${item.price} x ${item.qty} = \u20B9${item.price * item.qty}</span>
          </div>
          <div class="qty-control">
            <button type="button" onclick="window.updateCartQty('${item.id}', -1)">-</button>
            <span>${item.qty}</span>
            <button type="button" onclick="window.updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
      `).join('');
    }
  }
}

function setupOrderFeatures() {
  cart = getStoredList("lighthouse_cart");
  favorites = getStoredList("lighthouse_favorites");

  const menuItems = document.querySelectorAll(".menu-content .menu-item");
  if (!menuItems.length) return;

  menuItems.forEach((item) => {
    const data = getMenuItemData(item);
    item.dataset.itemId = data.id;

    const actions = document.createElement("div");
    actions.className = "menu-actions";
    actions.innerHTML = `
      <button class="menu-action-btn add-cart-btn" type="button" data-id="${data.id}">Add</button>
      <button class="menu-action-btn favorite-btn" type="button" data-id="${data.id}" aria-label="Add ${data.title} to favourites">\u2661</button>
    `;

    const foodContent = item.querySelector(".food-content") || item.querySelector(".back-content");
    if (foodContent) foodContent.appendChild(actions);

    actions.querySelector(".add-cart-btn")?.addEventListener("click", () => addToCart(data));
    actions.querySelector(".favorite-btn")?.addEventListener("click", () => toggleFavorite(data));
  });

  if (orderToggle && orderDock) {
    orderToggle.addEventListener("click", () => {
      const isOpen = orderDock.classList.toggle("open");
      orderToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (orderTabs.length) {
    orderTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetView = tab.dataset.orderView;
        orderTabs.forEach((item) => item.classList.toggle("active", item === tab));
        orderViews.forEach((view) => view.classList.toggle("active", view.id === `${targetView}View`));
      });
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!cart.length) return;
      const summary = cart.map((item) => `${item.qty} x ${item.title}`).join(", ");
      checkoutBtn.textContent = "Order Ready!";
      checkoutBtn.title = summary;
      setTimeout(() => {
        checkoutBtn.textContent = "Review Order";
        checkoutBtn.title = "";
      }, 2200);
    });
  }

  renderOrderState();
}

// =============================================
// PDF MENU DOWNLOAD
// =============================================
function loadHtml2Pdf() {
  return new Promise((resolve, reject) => {
    if (typeof html2pdf !== 'undefined') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function showLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'pdf-loading';
  overlay.id = 'pdfLoading';
  overlay.innerHTML = `
    <div class="spinner" style="border:4px solid #fff;border-top:4px solid var(--color-primary);border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 15px;"></div>
    <p>Generating your menu PDF...</p>
    <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin-top: 10px;">Please wait</p>
  `;
  overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;";
  document.body.appendChild(overlay);
  
  if (!document.getElementById('spinner-style')) {
    const style = document.createElement('style');
    style.id = 'spinner-style';
    style.textContent = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }
}

function hideLoadingOverlay() {
  const overlay = document.getElementById('pdfLoading');
  if (overlay) overlay.remove();
}

// =============================================
// I18N UPDATE
// =============================================
function updateContent() {
  if (typeof i18next === 'undefined' || !i18next.t) return;
  document.querySelectorAll("[data-i18n]").forEach((elem) => {
    const key = elem.getAttribute("data-i18n");
    if(elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
        if(elem.hasAttribute('placeholder')) {
            elem.placeholder = i18next.t(key);
        }
    } else {
        elem.textContent = i18next.t(key);
    }
  });
}

// =============================================
// INITIALIZATION
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  updateDeviceHints();
  setReservationDateRange();
  updateAvailableTimes();
  setupThemeToggle();
  setupIntersectionObserver();
  setupAutoScroll();
  setupReviews();
  setupOrderFeatures();
  filterMenuItems();
  handleScroll();

  if (dateInput) {
    dateInput.addEventListener("change", updateAvailableTimes);
  }

  if (guestsSelect) {
    guestsSelect.addEventListener("change", updateAvailableTimes);
  }

  if (navToggle) {
    navToggle.addEventListener("click", toggleMobileMenu);
  }

  if (reservationForm) {
    reservationForm.addEventListener("submit", handleFormSubmit);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMobileMenu();
  });

  navLinks.forEach((link) => link.addEventListener("click", smoothScroll));
  document.querySelectorAll(".nav-cta, .nav-cta-mobile, .hero-buttons a").forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
      filterMenuItems(btn.dataset.filter, menuSearch ? menuSearch.value : '', getActiveDiet());
    });
  });

  dietBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      dietBtns.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
      filterMenuItems(getActiveFilter(), menuSearch ? menuSearch.value : '', btn.dataset.diet || btn.dataset.type);
    });
  });

  menuTabs.forEach(tab => {
    tab.addEventListener('click', switchMenuTab);
  });

  if (cuisineDropdown) {
    cuisineDropdown.addEventListener("change", () => {
      filterMenuItems(getActiveFilter(), menuSearch ? menuSearch.value : '', getActiveDiet());
    });
  }

  if (menuSearch) {
    menuSearch.addEventListener("input", () => {
      filterMenuItems(getActiveFilter(), menuSearch.value, getActiveDiet());
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  const downloadMenuPDFBtn = document.getElementById("downloadMenuPDF");
  if (downloadMenuPDFBtn) {
    downloadMenuPDFBtn.addEventListener('click', async () => {
      try {
        showLoadingOverlay();
        await loadHtml2Pdf();
        const element = document.getElementById('menu');
        const opt = {
          margin: 10,
          filename: 'TheLighthouse-Menu.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        await html2pdf().set(opt).from(element).save();
      } catch (e) {
        console.error("PDF generation failed", e);
        alert("Could not generate PDF menu at this time.");
      } finally {
        hideLoadingOverlay();
      }
    });
  }

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Safe invocation of skeleton loaders if they are loaded externally
  if (typeof attachSkeletonToSimpleImage === 'function') {
    const largeContainers = [
      document.querySelector('.hero-bg'),
      document.querySelector('.about-image'),
      document.querySelector('.reservation-bg'),
    ];
    largeContainers.forEach((c) => {
      if (c) attachSkeletonToSimpleImage(c, 360);
    });
  }
  
  if (typeof initSkeletonLoaders === 'function') {
    initSkeletonLoaders();
  }
});