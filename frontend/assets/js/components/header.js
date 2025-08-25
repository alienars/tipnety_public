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
