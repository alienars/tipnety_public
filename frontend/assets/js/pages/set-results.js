import Swiper from "swiper";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


var swiper = new Swiper(".product-page-slider", {
  // 1. انتخابگر به کلاس خاص تغییر کرد
  // 2. ماژول Navigation اضافه شد
  modules: [EffectCoverflow, Pagination, Navigation],
  loop: true,
  slidesPerView: 1.7,
  centeredSlides: true,
  spaceBetween: 16,

  // Pagination (بدون تغییر)
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // 3. تنظیمات دکمه‌های سفارشی اضافه شد
  navigation: {
    nextEl: ".product-slider-next",
    prevEl: ".product-slider-prev",
  },

  effect: "coverflow",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 0,
    modifier: 0,
    slideShadows: false,
  },

  breakpoints: {
    768: {
      slidesPerView: 2.5,
      spaceBetween: 20,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 3.5,
      spaceBetween: 24,
      centeredSlides: false,
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  // --- راه‌اندازی اسلایدر اصلی (بزرگ) ---
  const mainSlider = new Swiper(".main-slider", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
  });

  // =========================================================
  // راه‌اندازی اسلایدرهای محصول به صورت جداگانه
  // =========================================================

  // --- اسلایدر محصول ۱ ---
  //   const productSlider1 = new Swiper(".product-slider-1", {
  //     loop: true,
  //     slidesPerView: 1,
  //     navigation: {
  //       nextEl: ".product-next-1",
  //       prevEl: ".product-prev-1",
  //     },
  //     // این دو خط برای حل مشکل عرض هنوز هم حیاتی هستند
  //     observer: true,
  //     observeParents: true,
  //   });

  //   // --- اسلایدر محصول ۲ ---
  //   const productSlider2 = new Swiper(".product-slider-2", {
  //     loop: true,
  //     slidesPerView: 1,
  //     navigation: {
  //       nextEl: ".product-next-2",
  //       prevEl: ".product-prev-2",
  //     },
  //     observer: true,
  //     observeParents: true,
  //   });

  //   // --- اسلایدر محصول ۳ ---
  //   const productSlider3 = new Swiper(".product-slider-3", {
  //     loop: true,
  //     slidesPerView: 1,
  //     navigation: {
  //       nextEl: ".product-next-3",
  //       prevEl: ".product-prev-3",
  //     },
  //     observer: true,
  //     observeParents: true,
  //   });

  //   // --- اسلایدر محصول ۴ ---
  //   const productSlider4 = new Swiper(".product-slider-4", {
  //     loop: true,
  //     slidesPerView: 1,
  //     navigation: {
  //       nextEl: ".product-next-4",
  //       prevEl: ".product-prev-4",
  //     },
  //     observer: true,
  //     observeParents: true,
  //   });
});

document.addEventListener("DOMContentLoaded", function () {
  // تنظیمات ساده و مطمئن
  function createSlider(sliderClass, nextClass, prevClass) {
    const slider = new Swiper(sliderClass, {
      // تنظیمات اصلی
      slidesPerView: 1,
      spaceBetween: 0,

      // غیرفعال کردن ویژگی‌های مشکل‌ساز
      loop: false,
      centeredSlides: false,
      autoHeight: false,

      // ناوبری
      navigation: {
        nextEl: nextClass,
        prevEl: prevClass,
      },

      // رویدادها برای کنترل عرض
      on: {
        init: function () {
          // تنظیم مستقیم عرض wrapper
          const wrapper = this.wrapperEl;
          const slides = wrapper.querySelectorAll(".swiper-slide");
          const slideCount = slides.length;

          // عرض wrapper دقیقاً برابر تعداد اسلایدها ضربدر 100%
          wrapper.style.width = slideCount * 100 + "%";

          // عرض هر اسلاید
          slides.forEach((slide) => {
            slide.style.width = 100 / slideCount + "%";
          });
        },

        resize: function () {
          // در صورت تغییر اندازه صفحه، عرض را مجدداً تنظیم کن
          const wrapper = this.wrapperEl;
          const slides = wrapper.querySelectorAll(".swiper-slide");
          const slideCount = slides.length;

          wrapper.style.width = slideCount * 100 + "%";
          slides.forEach((slide) => {
            slide.style.width = 100 / slideCount + "%";
          });
        },
      },
    });

    return slider;
  }

  // ایجاد اسلایدرها
  const productSlider1 = createSlider(".product-slider-1", ".product-next-1", ".product-prev-1");
  const productSlider2 = createSlider(".product-slider-2", ".product-next-2", ".product-prev-2");
  const productSlider3 = createSlider(".product-slider-3", ".product-next-3", ".product-prev-3");
  const productSlider4 = createSlider(".product-slider-4", ".product-next-4", ".product-prev-4");

  // بروزرسانی نهایی پس از لود کامل
  window.addEventListener("load", function () {
    setTimeout(() => {
      [productSlider1, productSlider2, productSlider3, productSlider4].forEach((slider) => {
        if (slider && slider.update) {
          slider.update();
        }
      });
    }, 50);
  });
});

// تابع جدید برای فعال‌سازی سلکتورهای سفارشی
// function initializeCustomSelectors(container) {
//   const customSelects = container.querySelectorAll(".custom-select-wrapper");

//   customSelects.forEach((wrapper) => {
//     const trigger = wrapper.querySelector(".custom-select-trigger");
//     const options = wrapper.querySelector(".custom-options");
//     const optionItems = wrapper.querySelectorAll(".custom-option");
//     const selectedValue = wrapper.querySelector(".selected-value");
//     const hiddenInput = wrapper.querySelector("input[type='hidden']");

//     // اگر این سلکتور قبلاً فعال شده، از آن بگذر
//     if (wrapper.classList.contains('initialized')) return;

//     trigger.addEventListener("click", function () {
//       options.classList.toggle("hidden");
//       trigger.querySelector('.arrow-icon').classList.toggle('rotate-180');
//     });

//     optionItems.forEach((option) => {
//       option.addEventListener("click", function () {
//         const value = this.getAttribute("data-value");
//         selectedValue.textContent = value;
//         hiddenInput.value = value;
//         options.classList.add("hidden");
//         trigger.querySelector('.arrow-icon').classList.remove('rotate-180');
//       });
//     });

//     // علامت‌گذاری به عنوان فعال‌شده
//     wrapper.classList.add('initialized');
//   });

//   // بستن سلکتور با کلیک بیرون از آن
//   document.addEventListener("click", function (e) {
//     customSelects.forEach(wrapper => {
//       if (!wrapper.contains(e.target)) {
//         wrapper.querySelector(".custom-options").classList.add("hidden");
//         wrapper.querySelector('.arrow-icon')?.classList.remove('rotate-180');
//       }
//     });
//   });
// }

// @product-page-slider

const productSwiper = new Swiper(".product-swiper-container", {
  // معرفی ماژول‌ها به Swiper
  modules: [Navigation],

  // پارامترهای اصلی
  loop: true,

  // تنظیمات ریسپانسیو (Breakpoints)
  breakpoints: {
    // برای موبایل
    0: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    // برای تبلت
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // برای دسکتاپ کوچک
    1024: {
      slidesPerView: 4, // اینجا در کد قبلی اشتباهی ۶ بود که اصلاح شد
      spaceBetween: 24,
    },
    // برای دسکتاپ بزرگ
    1920: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },

  // دکمه‌های پیمایش (Navigation)
  navigation: {
    nextEl: ".set-swiper-button-next",
    prevEl: ".set-swiper-button-prev",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("sticky-nav");
  const navLinks = nav.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section");

  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the middle of the viewport
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Toggle Introduction Text
  const introWrapper = document.getElementById("intro-text-wrapper");
  const toggleIntroBtn = document.getElementById("toggle-intro-btn");
  if (toggleIntroBtn && introWrapper) {
    toggleIntroBtn.addEventListener("click", function () {
      const isExpanded = introWrapper.classList.toggle("expanded");
      introWrapper.classList.toggle("truncated-text", !isExpanded);

      const buttonText = this.querySelector("p");
      const buttonSvg = this.querySelector("svg");

      if (isExpanded) {
        buttonText.textContent = "بستن";
        buttonSvg.style.transform = "rotate(180deg)";
      } else {
        buttonText.textContent = "مشاهده بیشتر";
        buttonSvg.style.transform = "rotate(0deg)";
      }
    });
  }

  // Toggle Features List
  // const toggleFeaturesBtn = document.getElementById("toggle-features-btn");
  // const featuresList = document.getElementById("features-list");
  // if (toggleFeaturesBtn && featuresList) {
  //   toggleFeaturesBtn.addEventListener("click", function () {
  //     const hiddenItems = featuresList.querySelectorAll(".feature-item.hidden");
  //     const isExpanding = hiddenItems.length > 0;

  //     const buttonText = this.querySelector("p");
  //     const buttonSvg = this.querySelector("svg");

  //     if (isExpanding) {
  //       featuresList.querySelectorAll(".feature-item").forEach((item) => {
  //         item.classList.remove("hidden");
  //       });
  //       buttonText.textContent = "بستن";
  //       buttonSvg.style.transform = "rotate(180deg)";
  //     } else {
  //       featuresList.querySelectorAll(".feature-item:not(:nth-child(-n+3))").forEach((item) => {
  //       });
  //       featuresList.querySelectorAll(".feature-item").forEach((item, index) => {
  //         if (index >= 3) {
  //           item.classList.add("hidden");
  //         }
  //       });
  //       buttonText.textContent = "مشاهده همه ویژگی ها";
  //       buttonSvg.style.transform = "rotate(0deg)";
  //     }
  //   });
  // }

  // Toggle Reviews List
  const toggleReviewsBtn = document.getElementById("toggle-reviews-btn");
  const reviewsList = document.getElementById("reviews-list");
  if (toggleReviewsBtn && reviewsList) {
    toggleReviewsBtn.addEventListener("click", function () {
      const hiddenItems = reviewsList.querySelectorAll(".review-item.hidden");
      const isExpanding = hiddenItems.length > 0;

      const buttonText = this.querySelector("p");
      const buttonSvg = this.querySelector("svg");

      if (isExpanding) {
        reviewsList.querySelectorAll(".review-item.hidden").forEach((item) => {
          item.classList.remove("hidden");
        });
        buttonText.textContent = "بستن";
        buttonSvg.style.transform = "rotate(180deg)";
      } else {
        reviewsList.querySelectorAll(".review-item").forEach((item, index) => {
          if (index > 0) {
            item.classList.add("hidden");
          }
        });
        buttonText.textContent = "مشاهده نظرات بیشتر";
        buttonSvg.style.transform = "rotate(0deg)";
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  // همه دکمه‌های "مشاهده ویژگی‌ها" را پیدا کن
  const toggleButtons = document.querySelectorAll(".toggle-features-btn");

  // برای هر دکمه، یک event listener اضافه کن
  toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // پیدا کردن نزدیک‌ترین والد مشترک (features-section)
      const featuresSection = this.closest(".features-section");

      // حالا متن، آیکون و لیست ویژگی‌ها را فقط در همان والد پیدا کن
      const toggleText = featuresSection.querySelector(".toggle-features-text");
      const toggleIcon = featuresSection.querySelector(".toggle-features-icon");
      const featureItems = featuresSection.querySelectorAll(".feature-item");

      // بررسی وضعیت فعلی دکمه (باز یا بسته)
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      // آیتم‌های مخفی را نمایش بده یا پنهان کن
      featureItems.forEach((item) => {
        item.classList.toggle("hidden");
      });

      // متن و آیکون دکمه را بر اساس وضعیت جدید تغییر بده
      if (isExpanded) {
        toggleText.textContent = "مشاهده همه ویژگی ها";
        toggleIcon.classList.remove("rotate-180");
        this.setAttribute("aria-expanded", "false");
      } else {
        toggleText.textContent = "بستن";
        toggleIcon.classList.add("rotate-180");
        this.setAttribute("aria-expanded", "true");
      }
    });
  });
});






document.addEventListener("DOMContentLoaded", function () {
  // Modal Elements
  const modal = document.getElementById("productModal");
  const modalPanel = document.getElementById("modal-panel");
  const modalContent = document.getElementById("modal-content");
  const closeBtn = document.getElementById("modal-close-btn");
  const openModalButtons = document.querySelectorAll(".open-modal-btn");
  let modalSwiperInstance = null;

  // ------------------ START: CUSTOM SELECTOR LOGIC ------------------

  function initializeCustomSelectors(container) {
    const customSelects = container.querySelectorAll(".custom-select-wrapper:not(.initialized)");

    customSelects.forEach((wrapper) => {
      const trigger = wrapper.querySelector(".custom-select-trigger");
      const options = wrapper.querySelector(".custom-options");
      const optionItems = wrapper.querySelectorAll(".custom-option");
      const selectedValue = wrapper.querySelector(".selected-value");
      const hiddenInput = wrapper.querySelector("input[type='hidden']");

      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAllSelectors(wrapper);
        const isOpen = options.classList.toggle("hidden");

        // FIX 1: Add/Remove border-radius classes
        if (!isOpen) {
          // If options are now visible
          trigger.classList.add("rounded-b-none");
          trigger.querySelector(".arrow-icon")?.classList.add("rotate-180");
        } else {
          // If options are now hidden
          trigger.classList.remove("rounded-b-none");
          trigger.querySelector(".arrow-icon")?.classList.remove("rotate-180");
        }
      });

      optionItems.forEach((option) => {
        option.addEventListener("click", function () {
          const value = this.getAttribute("data-value");
          selectedValue.textContent = value;
          hiddenInput.value = value;
          options.classList.add("hidden");
          // FIX 1: Reset border-radius on selection
          trigger.classList.remove("rounded-b-none");
          trigger.querySelector(".arrow-icon")?.classList.remove("rotate-180");
        });
      });

      wrapper.classList.add("initialized");
    });
  }

  function closeAllSelectors(exceptThisOne = null) {
    document.querySelectorAll(".custom-select-wrapper.initialized").forEach((wrapper) => {
      if (wrapper !== exceptThisOne) {
        wrapper.querySelector(".custom-options").classList.add("hidden");
        // FIX 1: Reset border-radius when closing
        const trigger = wrapper.querySelector(".custom-select-trigger");
        trigger.classList.remove("rounded-b-none");
        trigger.querySelector(".arrow-icon")?.classList.remove("rotate-180");
      }
    });
  }

  document.addEventListener("click", () => closeAllSelectors());
  initializeCustomSelectors(document.body);

  // ------------------ END: CUSTOM SELECTOR LOGIC ------------------

  function createModalSlider(sliderElement) {
    const nextEl = sliderElement.querySelector(".swiper-button-next");
    const prevEl = sliderElement.querySelector(".swiper-button-prev");
    return new Swiper(sliderElement, { slidesPerView: 1, spaceBetween: 0, loop: false, navigation: { nextEl, prevEl } });
  }

  const openModal = (cardElement) => {
    const cardClone = cardElement.cloneNode(true);

    // FIX 2: Remove 'initialized' class from cloned selectors
    // This makes them "fresh" for re-initialization inside the modal.
    cardClone.querySelectorAll(".custom-select-wrapper.initialized").forEach((selector) => {
      selector.classList.remove("initialized");
    });

    // ... بقیه کدهای تابع openModal بدون تغییر
    const priceContainer = cardClone.querySelector(".price-button-container");
    const plusButton = cardClone.querySelector(".desktop-plus-btn");
    if (priceContainer) {
      priceContainer.classList.remove("flex-col");
      priceContainer.classList.add("flex-row", "justify-between");
    }
    if (plusButton) {
      plusButton.classList.remove("hidden");
      plusButton.classList.add("flex");
    }
    const buttonToRemove = cardClone.querySelector(".open-modal-btn");
    if (buttonToRemove) buttonToRemove.remove();

    const selectors = cardClone.querySelector(".product-selectors");
    if (selectors) {
      selectors.classList.remove("hidden");
      selectors.classList.add("flex");
    }

    cardClone.classList.add("w-full");
    modalContent.innerHTML = "";
    modalContent.appendChild(cardClone);

    // حالا سلکتورهای داخل مودال به درستی فعال می‌شوند
    initializeCustomSelectors(modalContent);

    modal.classList.remove("opacity-0", "pointer-events-none");
    setTimeout(() => modalPanel.classList.remove("scale-95"), 10);

    if (modalSwiperInstance) modalSwiperInstance.destroy(true, true);
    const swiperInModal = modalContent.querySelector(".swiper");
    if (swiperInModal) {
      setTimeout(() => {
        modalSwiperInstance = createModalSlider(swiperInModal);
      }, 150);
    }
  };

  const closeModal = () => {
    if (modalSwiperInstance) {
      modalSwiperInstance.destroy(true, true);
      modalSwiperInstance = null;
    }
    modalPanel.classList.add("scale-95");
    modal.classList.add("opacity-0");
    setTimeout(() => {
      modal.classList.add("pointer-events-none");
      modalContent.innerHTML = "";
    }, 300);
  };

  openModalButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const parentCard = this.closest(".product-card");
      if (parentCard) openModal(parentCard);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("pointer-events-none")) {
      closeModal();
    }
  });
});



// @@comment modal

document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.getElementById("open-comment-modal");
  const closeModalDesktopBtn = document.getElementById("close-comment-modal-desktop");
  const closeModalMobileBtn = document.getElementById("close-comment-modal-mobile");
  const modal = document.getElementById("comment-modal");
  const modalContent = document.getElementById("modal-content");

  const showModal = () => {
    modal.classList.remove("opacity-0", "pointer-events-none");
    modalContent.classList.remove("scale-95");
  };

  const hideModal = () => {
    modal.classList.add("opacity-0");
    modalContent.classList.add("scale-95");
    setTimeout(() => modal.classList.add("pointer-events-none"), 300);
  };

  openModalBtn.addEventListener("click", showModal);
  closeModalDesktopBtn.addEventListener("click", hideModal);
  closeModalMobileBtn.addEventListener("click", hideModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) hideModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideModal();
  });

  // --- منطق اسلایدرها (اصلاح نهایی) ---
  const sliders = document.querySelectorAll(".custom-range-slider");

  sliders.forEach((slider) => {
    const initialValue = parseInt(slider.getAttribute("data-value"), 10);
    const sliderName = slider.getAttribute("data-name");
    const ratingValueSpan = slider.parentElement.querySelector(".rating-value");

    // نکته: برای هماهنگی منطق و ظاهر در حالت RTL،
    // ۱. نوار متحرک از چپ شروع می‌شود (left-0).
    // ۲. ترتیب بصری نقاط با flex-row-reverse برعکس شده تا از ۱ (چپ) به ۵ (راست) نمایش داده شوند.
    slider.innerHTML = `
                    <div class="relative h-2 flex items-center">
                        <div class="track-bg absolute w-full h-[3px] bg-[#ebebeb] rounded-full"></div>
                        <div class="track-filled absolute w-full h-[3px] bg-[#fcb108] rounded-full left-0" style="width: 0%;"></div>
                        <div class="points-container absolute w-full flex flex-row-reverse justify-between items-center">
                            ${[1, 2, 3, 4, 5]
                              .map(
                                (i) => `
                                <div class="point w-3 h-3 md:w-2 md:h-2 rounded-full cursor-pointer" data-point-value="${i}"></div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                    <input type="hidden" name="${sliderName}" value="${initialValue}">
                `;

    const points = slider.querySelectorAll(".point");
    const trackFilled = slider.querySelector(".track-filled");
    const hiddenInput = slider.querySelector('input[type="hidden"]');

    // این تابع اکنون با چیدمان بصری جدید (۱ در چپ، ۵ در راست) به درستی کار می‌کند.
    const updateSliderVisuals = (value) => {
      const percentage = ((value - 1) / 4) * 100;
      trackFilled.style.width = `${percentage}%`;

      points.forEach((point) => {
        const pointVal = parseInt(point.getAttribute("data-point-value"), 10);
        if (pointVal <= value) {
          point.style.backgroundColor = "#fcb108";
        } else {
          point.style.backgroundColor = "#ebebeb";
        }
      });

      slider.setAttribute("data-value", value);
      hiddenInput.value = value;
      if (ratingValueSpan) {
        ratingValueSpan.textContent = value.toLocaleString("fa-IR");
      }
    };

    points.forEach((point) => {
      point.addEventListener("click", () => {
        const newValue = parseInt(point.getAttribute("data-point-value"), 10);
        updateSliderVisuals(newValue);
      });
    });

    updateSliderVisuals(initialValue);
  });
});


// @@login modal
document.addEventListener("DOMContentLoaded", () => {
  // --- کنترلر عمومی مودال ---

  // پیدا کردن تمام دکمه‌هایی که یک مودال را باز می‌کنند
  const modalTriggers = document.querySelectorAll("[data-modal-target]");

  modalTriggers.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.dataset.modalTarget; // #share-modal یا #login-modal
      const modal = document.querySelector(modalId);
      if (modal) {
        openModal(modal);
      }
    });
  });

  // تابع برای باز کردن هر مودالی
  const openModal = (modal) => {
    const modalContent = modal.querySelector(".modal-content");
    modal.classList.remove("opacity-0", "pointer-events-none");
    if (modalContent) {
      modalContent.classList.remove("scale-95");
    }
  };

  // تابع برای بستن هر مودالی
  const closeModal = (modal) => {
    const modalContent = modal.querySelector(".modal-content");
    modal.classList.add("opacity-0");
    if (modalContent) {
      modalContent.classList.add("scale-95");
    }
    setTimeout(() => {
      modal.classList.add("pointer-events-none");
    }, 300);
  };

  // پیدا کردن تمام دکمه‌های بستن مودال
  const closeButtons = document.querySelectorAll(".modal-close-btn");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal-container"); // نزدیک‌ترین والد مودال را پیدا می‌کند
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // بستن مودال با کلیک روی پس‌زمینه یا فشردن Escape
  document.querySelectorAll(".modal-container").forEach((modal) => {
    // بستن با کلیک روی پس زمینه
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".modal-container:not(.pointer-events-none)").forEach(closeModal);
    }
  });

  // --- منطق دکمه کپی کردن لینک (مخصوص مودال اشتراک گذاری) ---
  const copyLinkBtn = document.getElementById("copy-link-button");
  if (copyLinkBtn) {
    const copyLinkText = document.getElementById("copy-link-text");
    copyLinkBtn.addEventListener("click", () => {
      const linkToCopy = window.location.href;
      navigator.clipboard.writeText(linkToCopy).then(() => {
        copyLinkText.textContent = "کپی شد!";
        copyLinkBtn.classList.add("bg-green-500");
        setTimeout(() => {
          copyLinkText.textContent = "لینک محصول را کپی کنید";
          copyLinkBtn.classList.remove("bg-green-500");
        }, 2000);
      });
    });
  }
});

// @@share modal

document.addEventListener("DOMContentLoaded", () => {
  // --- منطق پاپ‌آپ اشتراک گذاری ---
  
  // توجه: فقط المنت‌های داخل مودال که یکتا هستند، با ID باقی می‌مانند
  const shareButtons = document.querySelectorAll(".share-button"); // تغییر از ID به class
  const shareModal = document.getElementById("share-modal");
  const shareModalContent = document.getElementById("share-modal-content");
  const closeShareModalBtn = document.getElementById("close-share-modal");
  const copyLinkBtn = document.getElementById("copy-link-button");
  const copyLinkText = document.getElementById("copy-link-text");
  
  // اگر هیچ دکمه یا مودالی وجود نداشت، ادامه نده
  if (!shareButtons.length || !shareModal) return;

  // تابع برای نمایش پاپ‌آپ
  const showShareModal = () => {
    shareModal.classList.remove("opacity-0", "pointer-events-none");
    shareModalContent.classList.remove("scale-95");
  };

  // تابع برای مخفی کردن پاپ‌آپ
  const hideShareModal = () => {
    shareModal.classList.add("opacity-0");
    shareModalContent.classList.add("scale-95");
    setTimeout(() => shareModal.classList.add("pointer-events-none"), 300);
  };

  // افزودن رویداد کلیک به تک‌تک دکمه‌ها
  shareButtons.forEach(button => {
    button.addEventListener("click", showShareModal);
  });
  
  closeShareModalBtn.addEventListener("click", hideShareModal);

  // بستن پاپ‌آپ با کلیک روی پس‌زمینه تیره
  shareModal.addEventListener("click", (event) => {
    if (event.target === shareModal) {
      hideShareModal();
    }
  });

  // بستن پاپ‌آپ با فشردن کلید Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !shareModal.classList.contains('pointer-events-none')) {
      hideShareModal();
    }
  });

  // --- منطق دکمه کپی کردن لینک ---
  copyLinkBtn.addEventListener("click", () => {
    const linkToCopy = window.location.href; 
    navigator.clipboard.writeText(linkToCopy).then(() => {
        // اطلاع‌رسانی به کاربر که لینک کپی شده
        copyLinkText.textContent = "کپی شد!";
        copyLinkBtn.classList.add("bg-green-500");

        // بازگرداندن متن و رنگ دکمه به حالت اولیه بعد از ۲ ثانیه
        setTimeout(() => {
          copyLinkText.textContent = "لینک محصول را کپی کنید";
          copyLinkBtn.classList.remove("bg-green-500");
        }, 2000);
    });
  });
});




// @@size-modal
document.addEventListener("DOMContentLoaded", () => {
  // Select elements
  const openModalBtns = document.querySelectorAll(".open-size-guide-btn"); // تغییر از ID به class
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modal = document.getElementById("size-guide-modal");
  const modalPanel = document.getElementById("modal-panel");
  const tabs = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");
  
  // اگر هیچ دکمه یا مودالی وجود نداشت، ادامه نده
  if (!openModalBtns.length || !modal) return;

  // --- Modal Animation Logic ---
  const openModal = () => {
    modal.classList.remove("pointer-events-none", "opacity-0");
    requestAnimationFrame(() => {
      modalPanel.classList.remove("scale-95");
    });
  };

  const closeModal = () => {
    modal.classList.add("opacity-0");
    modalPanel.classList.add("scale-95");
    setTimeout(() => {
      modal.classList.add("pointer-events-none");
    }, 300);
  };

  // --- Event Listeners ---
  // افزودن رویداد کلیک به تک‌تک دکمه‌های باز کردن مودال
  openModalBtns.forEach(button => {
    button.addEventListener("click", openModal);
  });
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // بستن مودال با کلیک روی پس‌زمینه
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // بستن مودال با دکمه Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("opacity-0")) {
      closeModal();
    }
  });

  // --- Tabs Logic (بدون تغییر) ---
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.tabTarget);
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.add("hidden"));
      tab.classList.add("active");
      if (target) {
        target.classList.remove("hidden");
      }
    });
  });
});




// add to cart btn effect
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".desktop-plus-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // آیکون مثبت و نگه‌دارنده آیکون تیک را پیدا کن
      const plusIcon = button.querySelector('i-con[name="plus"]');
      const tickIconContainer = button.querySelector(".tick-icon-container"); // <<-- تغییر اصلی اینجاست

      // بررسی وضعیت فعلی دکمه
      const isAdded = button.classList.contains("bg-green-600");

      if (isAdded) {
        // اگر دکمه سبز است، به حالت اولیه برگردان
        button.classList.remove("bg-green-600");
        button.classList.add("bg-gray-800");
        plusIcon.classList.remove("hidden");
        tickIconContainer.classList.add("hidden"); // <<-- تغییر اصلی اینجاست
      } else {
        // اگر دکمه در حالت اولیه است، به حالت "اضافه شده" تغییر بده
        button.classList.remove("bg-gray-800");
        button.classList.add("bg-green-600");
        plusIcon.classList.add("hidden");
        tickIconContainer.classList.remove("hidden"); // <<-- تغییر اصلی اینجاست
      }
    });
  });
});




// like btn
document.addEventListener("DOMContentLoaded", function () {
  // تمام دکمه‌های علاقه‌مندی را پیدا کن
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // عناصر داخل دکمه کلیک‌شده را پیدا کن
      const addIcon = button.querySelector('i-con[name="heart-add"]');
      const checkIconContainer = button.querySelector(".heart-check-container");
      const textElement = button.querySelector(".favorite-btn-text");

      // وضعیت فعلی دکمه را بررسی کن (آیا "اضافه شده" است؟)
      const isAdded = button.classList.contains("border-red-600");

      if (isAdded) {
        // اگر "اضافه شده" است، به حالت اولیه برگردان
        // 1. تغییرات ظاهری دکمه
        button.classList.remove("border-red-600");
        button.classList.add("border-black-100");

        // 2. تغییرات متن
        textElement.classList.remove("text-red-600");
        textElement.classList.add("text-black-600");
        textElement.innerHTML = "افـــزودن بـــه<br>علاقـه مندی";

        // 3. تغییرات آیکون
        addIcon.classList.remove("hidden");
        checkIconContainer.classList.add("hidden");
      } else {
        // اگر در حالت اولیه است، به حالت "اضافه شده" تغییر بده
        // 1. تغییرات ظاهری دکمه
        button.classList.remove("border-black-100");
        button.classList.add("border-red-600");

        // 2. تغییرات متن
        textElement.classList.remove("text-black-600");
        textElement.classList.add("text-red-600");
        textElement.innerHTML = "به علاقه ها<br>اضافه شــد";

        // 3. تغییرات آیکون
        addIcon.classList.add("hidden");
        checkIconContainer.classList.remove("hidden");
      }
    });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  // تمام دکمه‌های علاقه‌مندی (فقط آیکون) را پیدا کن
  const favoriteIconButtons = document.querySelectorAll(".favorite-icon-btn");

  favoriteIconButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // عناصر داخل دکمه کلیک‌شده را پیدا کن
      const addIcon = button.querySelector('i-con[name="heart-add"]');
      const checkIconContainer = button.querySelector(".heart-check-container");

      // وضعیت فعلی دکمه را بررسی کن
      const isAdded = button.classList.contains("border-red-600");

      if (isAdded) {
        // اگر "اضافه شده" است، به حالت اولیه برگردان
        button.classList.remove("border-red-600");
        button.classList.add("border-black-100");

        addIcon.classList.remove("hidden");
        checkIconContainer.classList.add("hidden");
      } else {
        // اگر در حالت اولیه است، به حالت "اضافه شده" تغییر بده
        button.classList.remove("border-black-100");
        button.classList.add("border-red-600");

        addIcon.classList.add("hidden");
        checkIconContainer.classList.remove("hidden");
      }
    });
  });
});



