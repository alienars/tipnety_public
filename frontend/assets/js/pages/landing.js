
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const heroSliderEl = document.querySelector(".hero-slider");
if (heroSliderEl) {
  new Swiper(heroSliderEl, {
    modules: [Navigation, Pagination],
    loop: true,
    loopedSlides: 3,
    autoplay: {
      delay: 50000,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".hero-slider-next",
      prevEl: ".hero-slider-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        centeredSlides: true,
        spaceBetween: 6,
      },
      1024: {
        slidesPerView: 1.2,
        
        centeredSlides: true,
        spaceBetween: 26,
        slidesOffsetBefore: 0,
      },
    },
  });
}



document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTabId = button.dataset.tab;
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      tabPanels.forEach((panel) => panel.classList.add("hidden"));
      const targetPanel = document.getElementById(targetTabId);
      if (targetPanel) {
        targetPanel.classList.remove("hidden");
      }
    });
  });
});