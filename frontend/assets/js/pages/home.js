
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
        slidesPerView: 1,
        slidesPerGroup: 1,
        centeredSlides: false,
        spaceBetween: 0,
        slidesOffsetBefore: 0,
      },
    },
  });
}


// @@mobile mini pro slider
var homeMiniSliderM = new Swiper(".home-mini-slider-mobile", {
  loop: false,
  // slidesPerView: 3.8,
  // slidesPerView: "auto",
  spaceBetween: 8,
  freeMode: false,
  slidesOffsetBefore: 16,
  slidesOffsetAfter: 16,
});

// @@desktop mini pro slider
var homeMiniSliderD = new Swiper(".home-mini-slider-desktop", {
  loop: false,
  // slidesPerView: 6,
  slidesPerView: "auto",
  spaceBetween: 16,
  freeMode: false,
});

// @@slider-daily-deal
document.addEventListener("DOMContentLoaded", function () {

  const swiper = new Swiper(".offer-slider", {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 24,
    centeredSlides: false,
    initialSlide: 3,

    navigation: {
      nextEl: "#offer-slider-next-slide",
      prevEl: "#offer-slider-prev-slide",
    },
  });

  function startCountdown() {
    const daysEl = document.querySelector('[data-time="days"]');
    const hoursEl = document.querySelector('[data-time="hours"]');
    const minutesEl = document.querySelector('[data-time="minutes"]');
    const secondsEl = document.querySelector('[data-time="seconds"]');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
      console.error("المنت‌های تایمر در صفحه پیدا نشد.");
      return;
    }

    let totalSeconds = 24 * 3600 + 48 * 60 + 36;

    const interval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(interval);
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
      }

      totalSeconds--;

      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const format = (num) => num.toString().padStart(2, "0");

      daysEl.textContent = format(days);
      hoursEl.textContent = format(hours);
      minutesEl.textContent = format(minutes);
      secondsEl.textContent = format(seconds);
    }, 1000);
  }

  // اجرای تابع وقتی که صفحه بارگذاری شد
  startCountdown();
});


// @@newest-product-slider 

document.querySelectorAll(".product-slider-component").forEach((component) => {
  const sliderElement = component.querySelector(".swiper.product-slider");
  if (!sliderElement) return;

  let swiperInstance = null;
  const wrapperElement = sliderElement.querySelector(".swiper-wrapper");
  const nextButton = component.querySelector(".swiper-button-next");
  const prevButton = component.querySelector(".swiper-button-prev");

  // Handle slide opacity updates for visual feedback
  const updateSlideOpacity = (swiper) => {
    if (!swiper || !swiper.slides) return;
    swiper.slides.forEach((slide) => (slide.style.opacity = "0.5"));
    let currentSlide = swiper.slides[swiper.activeIndex];
    for (let i = 0; i < swiper.params.slidesPerView && currentSlide; i++) {
      currentSlide.style.opacity = "1";
      currentSlide = currentSlide.nextElementSibling;
    }
  };

  // Toggle between slider and grid based on screen size
  const updateSwiper = () => {
    if (window.innerWidth >= 1024) {
      if (!swiperInstance) {
        wrapperElement.classList.remove("mobile-grid");
        swiperInstance = new Swiper(sliderElement, {
          modules: [Navigation],
          direction: "horizontal",
          loop: true,
          slidesPerView: 4,
          spaceBetween: 24,
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
          },
          on: {
            init: updateSlideOpacity,
            slideChange: updateSlideOpacity,
            resize: updateSlideOpacity,
          },
        });
      }
    } else {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
      wrapperElement.classList.add("mobile-grid");
      wrapperElement.querySelectorAll(".product-card").forEach((card) => (card.style.opacity = "1"));
    }
  };

  // Initialize with appropriate layout
  if (window.innerWidth < 1024) {
    wrapperElement.classList.add("mobile-grid");
  }
  updateSwiper();
  window.addEventListener("resize", updateSwiper);
});

// Initialize newest products slider
const newestEl = document.querySelector("#newest-products-slider");
if (newestEl) {
  const swiperOptions = {
    direction: "horizontal",
    loop: true,
    slidesPerView: 4,
    spaceBetween: 24,
    navigation: {
      nextEl: "#newest-slider-next-slide",
      prevEl: "#newest-slider-prev-slide",
    },
    on: {
      init: updateNewestSlideOpacity,
      slideChange: updateNewestSlideOpacity,
      resize: updateNewestSlideOpacity,
    },
  };

  // Handle opacity updates for newest products slider
  function updateNewestSlideOpacity(swiper) {
    swiper.slides.forEach((slide) => (slide.style.opacity = "0.5"));
    let currentSlide = swiper.slides[swiper.activeIndex];
    for (let i = 0; i < swiper.params.slidesPerView && currentSlide; i++) {
      currentSlide.style.opacity = "1";
      currentSlide = currentSlide.nextElementSibling;
    }
  }

  const wrapper = newestEl.querySelector(".swiper-wrapper");
  const originalSlides = Array.from(wrapper.children).map((slide) => slide.cloneNode(true));
  let newestSwiper = new Swiper(newestEl.querySelector(".swiper"), swiperOptions);

  document.querySelectorAll("#newest-filters .filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {


      document.querySelectorAll("#newest-filters .filter-btn").forEach((button) => {
        button.classList.remove("text-gray-900", "font-bold");
        button.classList.add("text-gray-500");
      });

      btn.classList.remove("text-gray-500");
      btn.classList.add("text-gray-900", "font-bold");


      const filter = btn.dataset.filter;
      newestSwiper.destroy(true, true);
      wrapper.innerHTML = "";
      originalSlides.filter((sl) => filter === "all" || sl.dataset.category === filter).forEach((sl) => wrapper.appendChild(sl));
      newestSwiper = new Swiper(newestEl.querySelector(".swiper"), swiperOptions);
    });
  });
}

// @@sets 
const newSetSwiper = new Swiper(".newSetSwiper", {
  slidesPerView: 1,
  spaceBetween: 8,

  navigation: {
    nextEl: ".new-set-swiper-next",
    prevEl: ".new-set-swiper-prev",
    disabledClass: "swiper-button-disabled",
  },


  breakpoints: {
    350: {
      slidesPerView: 2.2,
      spaceBetween: 8,
    },
    768: {
      slidesPerView: 3.5,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// @@brand-slider

const popularBrandsSwiper = new Swiper(".popularBrandsSwiper", {
  loop: true,

  slidesPerView: 1.3,
  spaceBetween: 16,

  navigation: {
    nextEl: ".brands-swiper-next",
    prevEl: ".brands-swiper-prev",
    disabledClass: "swiper-button-disabled",
  },

  breakpoints: {
    350: {
      slidesPerView: 2,
      spaceBetween: 8,
      slidesOffsetBefore: 16,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});