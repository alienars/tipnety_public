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
    const searchModal = document.getElementById('search-modal');
    if (searchModal) {
        const searchTriggers = document.querySelectorAll('.open-search-trigger');
        const closeSearchModalButton = document.getElementById('close-search-modal');
        let popularCategoriesSlider;

        // Initialize search modal and category slider
        const openSearchModal = () => {
            searchModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Lazy initialize categories slider
            if (!popularCategoriesSlider) {
                setTimeout(() => {
                    popularCategoriesSlider = new Swiper('.popular-categories-slider', {
                        modules: [Navigation, Pagination],
                        loop: true,
                        spaceBetween: 16,
                        slidesPerView: 2.5,
                        navigation: {
                            nextEl: '.popular-categories-next',
                            prevEl: '.popular-categories-prev'
                        },
                        observer: true,
                        observeParents: true,
                        breakpoints: {
                            640: { slidesPerView: 4 },
                            768: { slidesPerView: 5 },
                            1024: { slidesPerView: 6 }
                        }
                    });
                }, 100);
            }
        };

        const closeSearchModal = () => {
            searchModal.classList.add('hidden');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('translate-x-full')) {
                document.body.style.overflow = '';
            }
        };

        // Event listeners for search modal
        searchTriggers.forEach(trigger => {
            trigger.addEventListener('click', openSearchModal);
        });
        closeSearchModalButton?.addEventListener('click', closeSearchModal);
    }

    // Mobile Menu (Off-canvas) Logic
    const hamburgerButton = document.getElementById('hamburger-button');
    if (hamburgerButton) {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const closeMobileMenuButton = document.getElementById('close-mobile-menu');
        
        // Mobile menu toggle functions
        const openMobileMenu = () => {
            mobileMenu?.classList.remove('translate-x-full');
            mobileMenuOverlay?.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };

        const closeMobileMenu = () => {
            mobileMenu?.classList.add('translate-x-full');
            mobileMenuOverlay?.classList.add('hidden');
            if (searchModal && searchModal.classList.contains('hidden')) {
                document.body.style.overflow = '';
            }
        };

        // Mobile menu event listeners
        hamburgerButton.addEventListener('click', openMobileMenu);
        closeMobileMenuButton?.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay?.addEventListener('click', closeMobileMenu);

        // Category tabs and accordion in mobile menu
        document.querySelectorAll('.mobile-category-item').forEach(item => {
            item.addEventListener('click', () => {
                const targetCategory = item.getAttribute('data-category');
                
                // Update active category
                document.querySelectorAll('.mobile-category-item')
                    .forEach(i => i.classList.remove('mobile-category-active'));
                item.classList.add('mobile-category-active');
                
                // Toggle category content visibility
                document.querySelectorAll('.mobile-category-content')
                    .forEach(content => {
                        content.classList.toggle('hidden', 
                            content.id !== `${targetCategory}-content`);
                    });
            });
        });

        // Accordion toggles
        document.querySelectorAll('.accordion-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.nextElementSibling?.classList.toggle('hidden');
                toggle.querySelector('svg')?.classList.toggle('rotate-180');
            });
        });
    }
}
















console.log("User dropdown initialized");

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