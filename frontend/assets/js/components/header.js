import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Header Component Initialization
 * Handles search modal, mobile menu, and category navigation
 */
export function initHeader() {
  // Search Modal Logic
  const searchModal = document.getElementById("search-modal");
  if (searchModal) {
    const searchTriggers = document.querySelectorAll(".open-search-trigger");
    const closeSearchModalButton = document.getElementById("close-search-modal");
    let popularCategoriesSlider;
    let searchResultsSlider; // ✅ متغیر برای اسلایدر جدید
    let searchResultsSliderInitialized = false; // ✅ فلگ برای جلوگیری از ساخت مجدد اسلایدر

    // ✅ انتخاب المنت‌های جدید
    const searchInput = searchModal.querySelector('input[type="text"]');
    const initialContent = document.getElementById("initial-search-content");
    const resultsContent = document.getElementById("search-results-content");

    // Initialize search modal and category slider
    const openSearchModal = () => {
      searchModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";

      // Lazy initialize categories slider
      if (!popularCategoriesSlider) {
        setTimeout(() => {
          popularCategoriesSlider = new Swiper(".popular-categories-slider", {
            modules: [Navigation, Pagination],
            loop: true,
            spaceBetween: 16,
            slidesPerView: 2.5,
            navigation: {
              nextEl: ".popular-categories-next",
              prevEl: ".popular-categories-prev",
            },
            observer: true,
            observeParents: true,
            breakpoints: {
              320: { slidesPerView: 3 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 6 },
            },
          });
        }, 100);
      }
    };

    const closeSearchModal = () => {
      searchModal.classList.add("hidden");
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu && mobileMenu.classList.contains("translate-x-full")) {
        document.body.style.overflow = "";
      }

      // ✅ ریست کردن حالت مودال هنگام بسته شدن
      searchInput.value = ""; // خالی کردن اینپوت
      initialContent.classList.remove("hidden"); // نمایش محتوای اولیه
      resultsContent.classList.add("hidden"); // مخفی کردن نتایج
    };

    // Event listeners for search modal
    searchTriggers.forEach((trigger) => {
      trigger.addEventListener("click", openSearchModal);
    });
    closeSearchModalButton?.addEventListener("click", closeSearchModal);

    // ✅ اضافه کردن event listener به اینپوت جستجو
    searchInput?.addEventListener("input", () => {
      if (searchInput.value.trim() !== "") {
        initialContent.classList.add("hidden");
        resultsContent.classList.remove("hidden");

        // ✅ اسلایدر نتایج جستجو را فقط یک بار مقداردهی اولیه کن
        if (!searchResultsSliderInitialized) {
          setTimeout(() => {
            // یک تاخیر کوچک برای اطمینان از نمایش کامل المان
            searchResultsSlider = new Swiper(".search-results-slider", {
              loop: true,
              modules: [Navigation],
              spaceBetween: 24,
              navigation: {
                nextEl: ".search-results-next",
                prevEl: ".search-results-prev",
              },
              observer: true,
              observeParents: true,
              breakpoints: {
                // نمایش 2 کارت در موبایل
                320: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                // نمایش 3 کارت در تبلت
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                // نمایش 4 کارت در دسکتاپ
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              },
            });
            searchResultsSliderInitialized = true;
          }, 100);
        }
      } else {
        initialContent.classList.remove("hidden");
        resultsContent.classList.add("hidden");
      }
    });
  }

  // Mobile Menu (Off-canvas) Logic
//  const hamburgerButton = document.getElementById("hamburger-button");
//  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
//  const mobileMenu = document.getElementById("mobile-menu");
//  const closeMobileMenuButton = document.getElementById("close-mobile-menu");

//  if (hamburgerButton && mobileMenuOverlay && mobileMenu) {
//    // باز کردن منوی موبایل
//    const openMobileMenu = () => {
//      mobileMenuOverlay.classList.remove("hidden");
//      mobileMenu.classList.remove("translate-x-full");
//      document.body.style.overflow = "hidden";
//    };

//    // بستن منوی موبایل
//    const closeMobileMenu = () => {
//      mobileMenuOverlay.classList.add("hidden");
//      mobileMenu.classList.add("translate-x-full");
//      // فقط اگر مودال جستجو باز نباشد، اسکرول را آزاد کن
//      const searchModal = document.getElementById("search-modal");
//      if (!searchModal || searchModal.classList.contains("hidden")) {
//        document.body.style.overflow = "";
//      }
//    };

//    // Event listeners برای منوی موبایل
//    hamburgerButton.addEventListener("click", (e) => {
//      e.preventDefault();
//      openMobileMenu();
//    });

//    // بستن با کلیک روی overlay
//    mobileMenuOverlay.addEventListener("click", (e) => {
//      if (e.target === mobileMenuOverlay) {
//        closeMobileMenu();
//      }
//    });

//    // بستن با دکمه close
//    closeMobileMenuButton?.addEventListener("click", closeMobileMenu);

//    // بستن با کلید ESC
//    document.addEventListener("keydown", (e) => {
//      if (e.key === "Escape" && !mobileMenuOverlay.classList.contains("hidden")) {
//        closeMobileMenu();
//      }
//    });

//    // کنترل accordion در منوی موبایل
//    const accordionToggles = mobileMenu.querySelectorAll(".accordion-toggle");
//    accordionToggles.forEach((toggle) => {
//      toggle.addEventListener("click", () => {
//        const content = toggle.nextElementSibling;
//        const arrow = toggle.querySelector("svg");

//        // بررسی کنید که content وجود دارد
//        if (content && content.classList.contains("accordion-content")) {
//          if (content.classList.contains("hidden")) {
//            // باز کردن accordion
//            content.classList.remove("hidden");
//            if (arrow) {
//              arrow.classList.add("rotate-180");
//            }
//          } else {
//            // بستن accordion
//            content.classList.add("hidden");
//            if (arrow) {
//              arrow.classList.remove("rotate-180");
//            }
//          }
//        }
//      });
//    });

//    // تغییر دسته‌بندی در منوی موبایل
//    const categoryItems = mobileMenu.querySelectorAll(".mobile-category-item");
//    const categoryContents = mobileMenu.querySelectorAll(".mobile-category-content");

//    categoryItems.forEach((item) => {
//      item.addEventListener("click", () => {
//        const categoryId = item.dataset.category;

//        // حذف کلاس active از همه آیتم‌ها
//        categoryItems.forEach((cat) => cat.classList.remove("mobile-category-active"));
//        // اضافه کردن کلاس active به آیتم کلیک شده
//        item.classList.add("mobile-category-active");

//        // مخفی کردن همه محتواها
//        categoryContents.forEach((content) => content.classList.add("hidden"));
//        // نمایش محتوای مربوط به دسته‌بندی انتخاب شده
//        const targetContent = document.getElementById(`${categoryId}-content`);
//        if (targetContent) {
//          targetContent.classList.remove("hidden");
//        }
//      });
//    });
//  }

const hamburgerButton = document.getElementById("hamburger-button");
const closeMenuButton = document.getElementById("close-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mainCategoryLinks = document.querySelectorAll(".main-category-link");
const categoryContents = document.querySelectorAll(".category-content");
const accordionToggles = document.querySelectorAll(".accordion-toggle");

hamburgerButton.addEventListener("click", () => mobileMenu.classList.remove("translate-x-full"));
closeMenuButton.addEventListener("click", () => mobileMenu.classList.add("translate-x-full"));

mainCategoryLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    mainCategoryLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    const targetId = link.dataset.target;
    categoryContents.forEach((content) => {
      content.classList.add("hidden");
    });
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.remove("hidden");
    }
  });
});

accordionToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const content = toggle.nextElementSibling;
    const arrow = toggle.querySelector(".arrow-icon");
    const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";
    if (isOpen) {
      content.style.maxHeight = "0px";
      arrow.style.transform = "rotate(0deg)";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      arrow.style.transform = "rotate(180deg)";
    }
  });
});

}
















// console.log("User dropdown initialized");

(() => {
  if (window.__userDropdownInited) return;
  window.__userDropdownInited = true;

  const PANEL_ID = "user-dropdown-panel";
  const BTN_SELECTOR = "#menu-user-dropdown";
  let open = false;
  let panel = null;

  function ensurePanel() {
    if (!panel) panel = document.getElementById(PANEL_ID);
    return panel;
  }

  function placePanel(btn, p) {
    const rect = btn.getBoundingClientRect();
    // اگر هنوز اندازه‌گیری نشد، از 384px (w-96) استفاده کن
    const panelWidth = p.offsetWidth || 384;
    const panelHeight = p.offsetHeight || 0;
    const gap = 8;

    let top = rect.bottom + gap;
    let left = rect.right - panelWidth; // راست‌چین

    left = Math.max(8, Math.min(left, window.innerWidth - panelWidth - 8));
    if (top + panelHeight > window.innerHeight - 8) {
      top = rect.top - panelHeight - gap;
      p.style.transformOrigin = "bottom right";
    } else {
      p.style.transformOrigin = "top right";
    }
    p.style.top = `${Math.max(8, top)}px`;
    p.style.left = `${left}px`;
  }

  function show(btn) {
    const p = ensurePanel();
    if (!p || open) return;
    placePanel(btn, p);
    p.setAttribute("aria-hidden", "false");
    p.classList.remove("pointer-events-none", "invisible", "opacity-0", "scale-95");
    p.classList.add("opacity-100", "scale-100");
    open = true;
    window.addEventListener("resize", _placeOnRAF, { passive: true });
    window.addEventListener("scroll", _placeOnRAF, true);
  }

  function hide() {
    const p = ensurePanel();
    if (!p || !open) return;
    p.setAttribute("aria-hidden", "true");
    p.classList.add("opacity-0", "scale-95");
    p.classList.remove("opacity-100", "scale-100");
    // بعد از ترنزیشن، کلیک‌ناپذیر شود
    setTimeout(() => {
      if (!open) p.classList.add("pointer-events-none", "invisible");
    }, 160);
    open = false;
    window.removeEventListener("resize", _placeOnRAF);
    window.removeEventListener("scroll", _placeOnRAF, true);
  }

  let _raf = null;
  function _placeOnRAF() {
    if (_raf) cancelAnimationFrame(_raf);
    _raf = requestAnimationFrame(() => {
      const btn = document.querySelector(BTN_SELECTOR);
      const p = ensurePanel();
      if (btn && p) placePanel(btn, p);
    });
  }

  // کلیک‌های صفحه: باز/بسته و خارج‌کلیک
  document.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest(BTN_SELECTOR);
      const p = ensurePanel();
      if (btn) {
        e.preventDefault();
        open ? hide() : show(btn);
        return;
      }
      if (open && p && !p.contains(e.target)) hide();
    },
    true
  );

  // ESC برای بستن
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hide();
  });

  // اطمینان از وجود کلاس‌های اولیه (اگر در HTML نگذاشتی)
  document.addEventListener("DOMContentLoaded", () => {
    const p = ensurePanel();
    if (p) {
      p.classList.add("pointer-events-none", "invisible", "opacity-0", "scale-95");
    }
  });
})();