/**
 * Main application entry point
 */

// External Libraries
import Alpine from "alpinejs";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, EffectFade, Grid } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/grid";
import "swiper/css/autoplay";

// Internal Imports
import { authForm, initAuthPage } from "./pages/auth.js";
import { initHeader } from "./components/header.js";
import { initFooter } from "./components/footer.js";
// import { initSliders } from "./components/sliders.js";
import { notificationStore } from "./components/notifications.js";
import { loadIcons } from './components/icon-loader.js';
import { loadPartials } from './utils/partial-loader.js';

// Global Library Setup
window.Alpine = Alpine;
window.Swiper = Swiper;
window.SwiperModules = { Navigation, Pagination, Autoplay, EffectFade, Grid };
Swiper.use([Navigation, Pagination, Autoplay, EffectFade, Grid]);

// Alpine Component Registration
Alpine.data("authForm", authForm);
Alpine.store("notifications", notificationStore());

// Dynamic Page Headers Management
function initPageHeaders() {
    const wrapper = document.querySelector('[data-active-page]');
    if (!wrapper) return;

    const { title, description, activePage } = wrapper.dataset;
    if (!title) return;

    // Update page title and description
    const titleEls = wrapper.querySelectorAll('.page-header-title');
    const descriptionEl = wrapper.querySelector('.page-header-description');
    const navContainer = wrapper.querySelector('.page-header-nav');

    titleEls.forEach(el => el.innerText = title);
    if (descriptionEl) descriptionEl.innerText = description;

    // Handle active page navigation
    if (activePage && navContainer) {
        const activeLink = navContainer.querySelector(`a[data-page="${activePage}"]`);
        if (activeLink) {
            activeLink.classList.remove('border-white/50', 'text-white', 'hover:bg-white/10', 'hover:border-white');
            activeLink.classList.add('bg-white', 'text-gray-900', 'border-white');
        }
    }
}

function persianizeInitialNumbers() {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  function toPersian(text) {
    return text.toString().replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit, 10)]);
  }

  function traverse(node) {
    if (node.nodeType === 3) {
      // گره متنی یا Text Node
      const parentTag = node.parentNode.tagName;
      if (parentTag !== "SCRIPT" && parentTag !== "STYLE" && parentTag !== "TEXTAREA") {
        node.nodeValue = toPersian(node.nodeValue);
      }
    } else if (node.nodeType === 1 && node.childNodes) {
      // گره عنصری یا Element Node
      node.childNodes.forEach(traverse);
    }
  }

  traverse(document.body);
}

/**
 * Initialize all application components after partials are loaded
 */
function initializeApp() {
    const page = document.body.dataset.page || "";
    
    // Initialize core components
    loadIcons();
    initHeader();
    initFooter();
    // initSliders();
    initPageHeaders();
    persianizeInitialNumbers();

    // Initialize page-specific components
    if (page === "auth") {
        initAuthPage();
    }
}

/**
 * Application Entry Point
 */
document.addEventListener("DOMContentLoaded", async () => {
    await loadPartials();
    initializeApp();
    Alpine.start();
});


// header functionality
document.addEventListener("DOMContentLoaded", function () {
  const basketButton = document.getElementById("menu-user-basket");
  const basketPopup = document.getElementById("basket-popup");

  // ========== بخش کنترل باز و بسته شدن پاپ آپ ==========
  if (basketButton && basketPopup) {
    basketButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      basketPopup.classList.toggle("hidden");
    });

    document.addEventListener("click", function (event) {
      if (!basketPopup.classList.contains("hidden") && !basketPopup.contains(event.target) && !basketButton.contains(event.target)) {
        basketPopup.classList.add("hidden");
      }
    });
  }

  // ========== بخش کنترل دکمه های تعداد محصول (مثبت و منفی) ==========
  const productItems = document.querySelectorAll(".product-item");

  productItems.forEach((item) => {
    const plusButton = item.querySelector(".quantity-plus");
    const minusButton = item.querySelector(".quantity-minus");
    const quantityValue = item.querySelector(".quantity-value");

    plusButton.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityValue.textContent);
      quantityValue.textContent = currentQuantity + 1;
    });

    minusButton.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityValue.textContent);
      // جلوگیری از کم شدن تعداد به زیر ۱
      if (currentQuantity > 1) {
        quantityValue.textContent = currentQuantity - 1;
      }
    });
  });
});