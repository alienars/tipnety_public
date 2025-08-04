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
import { initSliders } from "./components/sliders.js";
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

/**
 * Initialize all application components after partials are loaded
 */
function initializeApp() {
    const page = document.body.dataset.page || "";
    
    // Initialize core components
    loadIcons();
    initHeader();
    initFooter();
    initSliders();
    initPageHeaders();

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
