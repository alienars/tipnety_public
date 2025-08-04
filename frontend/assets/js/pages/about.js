import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Initialize About Page Sliders
document.addEventListener("DOMContentLoaded", () => {
  // About Page Main Slider
  const aboutSlider = new Swiper(".about-page-slider", {
    modules: [Navigation],
    loop: true,
    navigation: {
      nextEl: ".about-slider-next",
      prevEl: ".about-slider-prev",
    },
  });

  // Products Slider
  const productsSlider = new Swiper(".products-slider", {
    modules: [Navigation, Pagination],
    slidesPerView: 2, // 2 items on mobile
    spaceBetween: 12,
    loop: true,
    // Navigation arrows for desktop
    navigation: {
      nextEl: ".products-slider-next",
      prevEl: ".products-slider-prev",
    },
    // Pagination dots for mobile
    pagination: {
      el: ".products-slider-pagination",
      clickable: true,
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 768px
      768: {
        slidesPerView: 4,
        spaceBetween: 12,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 6, // 6 items on desktop
        spaceBetween: 12,
      },
    },
  });
});
