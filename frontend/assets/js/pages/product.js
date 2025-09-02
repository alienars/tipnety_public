import Swiper from "swiper";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


var swiper = new Swiper(".swiper-container", {
  modules: [EffectCoverflow, Pagination],
  loop: true,
  // Base settings (for mobile)
  slidesPerView: 1.7,
  centeredSlides: true,
  spaceBetween: 16,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  effect: "coverflow", // حالا این افکت شناخته می‌شود
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 0,
    modifier: 0,
    slideShadows: false,
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 2.5,
      spaceBetween: 20,
      centeredSlides: false,
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3.5,
      spaceBetween: 24,
      centeredSlides: false,
    },
  },
  // on: {
  //   init: function () {
  //     updateOpacity(this);
  //   },
  //   slideChangeTransitionEnd: function () {
  //     updateOpacity(this);
  //   }
  // }
});

// function updateOpacity(swiper) {
//   swiper.slides.forEach((slide) => {
//     slide.classList.add("opacity-50", "transition-opacity", "duration-300");
//     slide.classList.remove("opacity-100");
//   });
//   swiper.slides[swiper.activeIndex].classList.remove("opacity-50");
//   swiper.slides[swiper.activeIndex].classList.add("opacity-100");
// }

// Desktop gallery logic
document.addEventListener('DOMContentLoaded', function() {
  const mainImage = document.getElementById('main-image');
  if (mainImage) { // Run only if desktop gallery exists
      const thumbnails = document.querySelectorAll('.thumbnail-img');
      const nextBtn = document.getElementById('desktop-next-btn');
      const prevBtn = document.getElementById('desktop-prev-btn');
      let currentIndex = 0;

      function updateGallery(newIndex) {
          // Update main image src
          mainImage.src = thumbnails[newIndex].src.replace('120x150', '600x800');
          
          // Update active thumbnail styles
          thumbnails.forEach((t, index) => {
              t.classList.toggle('border-black-200', index === newIndex);
              t.classList.toggle('opacity-100', index === newIndex);
              t.classList.toggle('border-transparent', index !== newIndex);
              t.classList.toggle('opacity-60', index !== newIndex);
          });
          currentIndex = newIndex;
      }

      thumbnails.forEach((thumb, index) => {
          thumb.addEventListener('click', function() {
              updateGallery(index);
          });
      });
      
      if (nextBtn && prevBtn) {
          nextBtn.addEventListener('click', function() {
              let nextIndex = (currentIndex + 1) % thumbnails.length;
              updateGallery(nextIndex);
          });

          prevBtn.addEventListener('click', function() {
              let prevIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
              updateGallery(prevIndex);
          });
      }
  }
});









// @@full screen slider
document.addEventListener('DOMContentLoaded', function() {
  const galleryModal = document.getElementById('gallery-modal');
  const openModalButtons = document.querySelectorAll('.open-gallery-modal');
  const closeModalButtons = [
      document.getElementById('modal-close-btn-mobile'),
      document.getElementById('modal-close-btn-desktop')
  ];
  const mainModalImage = document.getElementById('modal-main-image');
  const mobileThumbnailContainer = document.getElementById('modal-thumbnail-container-mobile');
  const desktopThumbnailContainer = document.getElementById('modal-thumbnail-container-desktop');
  const nextBtn = document.getElementById('modal-next-btn');
  const prevBtn = document.getElementById('modal-prev-btn');

  let imageSources = [];
  let currentIndex = 0;

  function gatherImageSources() {
      const sources = new Set();
      document.querySelectorAll('.thumbnail-img').forEach(img => {
          let src = img.src;
          if (src.includes('120x150')) {
              src = src.replace('120x150', '600x800');
          }
          sources.add(src);
      });
      imageSources = Array.from(sources);
  }
  
  function buildModalThumbnails() {
      mobileThumbnailContainer.innerHTML = '';
      desktopThumbnailContainer.innerHTML = '';
      imageSources.forEach((src, index) => {
          // --- Create Mobile Thumbnail ---
          const mobileThumbWrapper = document.createElement('div');
          mobileThumbWrapper.className = 'p-1 border-2 border-transparent rounded-2xl cursor-pointer transition-all';
          const mobileThumbImg = document.createElement('img');
          mobileThumbImg.src = src.replace('600x800', '120x150');
          mobileThumbImg.className = 'w-full h-auto aspect-square object-cover rounded-xl';
          mobileThumbWrapper.appendChild(mobileThumbImg);
          mobileThumbWrapper.addEventListener('click', () => showImage(index));
          mobileThumbnailContainer.appendChild(mobileThumbWrapper);

          // --- Create Desktop Thumbnail ---
          const desktopThumbWrapper = document.createElement('div');
          desktopThumbWrapper.className = 'p-1 border-2 border-transparent rounded-3xl cursor-pointer transition-all bg-white';
          const desktopThumbImg = document.createElement('img');
          desktopThumbImg.src = src.replace('600x800', '120x150');
          desktopThumbImg.className = "w-32 h-24 object-cover rounded-2xl";
          desktopThumbWrapper.appendChild(desktopThumbImg);
          desktopThumbWrapper.addEventListener('click', () => showImage(index));
          desktopThumbnailContainer.appendChild(desktopThumbWrapper);
      });
  }

  function showImage(index) {
      if (index < 0 || index >= imageSources.length) return;
      
      currentIndex = index;
      mainModalImage.src = imageSources[currentIndex];

      // Update Mobile Thumbnails
      mobileThumbnailContainer.querySelectorAll('div').forEach((wrapper, i) => {
          wrapper.classList.toggle('border-black-200', i === currentIndex);
          wrapper.classList.toggle('opacity-50', i !== currentIndex);
      });

      // Update Desktop Thumbnails
      desktopThumbnailContainer.querySelectorAll('div').forEach((wrapper, i) => {
          wrapper.classList.toggle('border-black-200', i === currentIndex);
          wrapper.classList.toggle('opacity-40', i !== currentIndex);
      });
  }

  openModalButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          e.preventDefault();
          const parentElement = button.closest('.swiper-slide, .relative');
          const clickedImgSrc = parentElement ? parentElement.querySelector('img').src : imageSources[0];
          const startIndex = imageSources.findIndex(src => src === clickedImgSrc);
          
          showImage(startIndex >= 0 ? startIndex : 0);
          galleryModal.classList.remove('hidden');
          galleryModal.classList.add('flex');
      });
  });

  closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
          galleryModal.classList.add('hidden');
          galleryModal.classList.remove('flex');
      });
  });

  nextBtn.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % imageSources.length;
      showImage(nextIndex);
  });

  prevBtn.addEventListener('click', () => {
      const prevIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
      showImage(prevIndex);
  });
  
  gatherImageSources();
  buildModalThumbnails();
});


// Sticky Nav
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('sticky-nav');
    const navLinks = nav.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of the viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// @@toggle content
document.addEventListener('DOMContentLoaded', function () {
    // Toggle Introduction Text
    const introWrapper = document.getElementById('intro-text-wrapper');
    const toggleIntroBtn = document.getElementById('toggle-intro-btn');
    if (toggleIntroBtn && introWrapper) {
        toggleIntroBtn.addEventListener('click', function () {
            const isExpanded = introWrapper.classList.toggle('expanded');
            introWrapper.classList.toggle('truncated-text', !isExpanded);
            
            const buttonText = this.querySelector('p');
            const buttonSvg = this.querySelector('svg');

            if (isExpanded) {
                buttonText.textContent = 'بستن';
                buttonSvg.style.transform = 'rotate(180deg)';
            } else {
                buttonText.textContent = 'مشاهده بیشتر';
                buttonSvg.style.transform = 'rotate(0deg)';
            }
        });
    }

    // Toggle Features List
    const toggleFeaturesBtn = document.getElementById('toggle-features-btn');
    const featuresList = document.getElementById('features-list');
    if (toggleFeaturesBtn && featuresList) {
        toggleFeaturesBtn.addEventListener('click', function () {
            const hiddenItems = featuresList.querySelectorAll('.feature-item.hidden');
            const isExpanding = hiddenItems.length > 0;
            
            const buttonText = this.querySelector('p');
            const buttonSvg = this.querySelector('svg');

            if (isExpanding) {
                featuresList.querySelectorAll('.feature-item').forEach(item => {
                    item.classList.remove('hidden');
                });
                buttonText.textContent = 'بستن';
                buttonSvg.style.transform = 'rotate(180deg)';
            } else {
                featuresList.querySelectorAll('.feature-item:not(:nth-child(-n+3))').forEach(item => {
                     // Hide all but the first 3. Adjust if you have more/less default visible items.
                     // This is a bit naive. A better way would be to add a 'default-visible' class.
                     // For now, we'll just re-add 'hidden' to items that were initially hidden.
                     // Let's find a better way. We'll add a class to the initially hidden items.
                });
                 featuresList.querySelectorAll('.feature-item').forEach((item, index) => {
                    if (index >= 3) { // Assuming first 3 are visible initially
                        item.classList.add('hidden');
                    }
                });
                buttonText.textContent = 'مشاهده همه ویژگی ها';
                buttonSvg.style.transform = 'rotate(0deg)';
            }
        });
    }

    // Toggle Reviews List
    const toggleReviewsBtn = document.getElementById('toggle-reviews-btn');
    const reviewsList = document.getElementById('reviews-list');
    if (toggleReviewsBtn && reviewsList) {
        toggleReviewsBtn.addEventListener('click', function () {
            const hiddenItems = reviewsList.querySelectorAll('.review-item.hidden');
            const isExpanding = hiddenItems.length > 0;

            const buttonText = this.querySelector('p');
            const buttonSvg = this.querySelector('svg');

            if (isExpanding) {
                reviewsList.querySelectorAll('.review-item.hidden').forEach(item => {
                    item.classList.remove('hidden');
                });
                buttonText.textContent = 'بستن';
                buttonSvg.style.transform = 'rotate(180deg)';
                // Optionally hide the button after all are shown
                // this.style.display = 'none'; 
            } else {
                // This part is to re-hide. It assumes you want to hide all but the first one.
                reviewsList.querySelectorAll('.review-item').forEach((item, index) => {
                    if (index > 0) { // Keep the first one visible
                        item.classList.add('hidden');
                    }
                });
                buttonText.textContent = 'مشاهده نظرات بیشتر';
                buttonSvg.style.transform = 'rotate(0deg)';
            }
        });
    }
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







const submitButton = document.querySelector('button[type="submit"]');
const anonymousCheckbox = document.getElementById("anonymous");
const form = document.querySelector("form");

// افزودن یک event listener به فرم برای زمانی که ارسال می‌شود
form.addEventListener("submit", (event) => {
  // جلوگیری از ارسال پیش‌فرض فرم (برای اینکه صفحه رفرش نشود)
  event.preventDefault();

  // بررسی اینکه آیا چک‌باکس فعال است یا خیر
  const isAnonymous = anonymousCheckbox.checked;

  if (isAnonymous) {
    console.log("کاربر می‌خواهد دیدگاه را به صورت ناشناس ارسال کند.");
    // در اینجا می‌توانید منطق مربوط به ارسال ناشناس را پیاده‌سازی کنید
  } else {
    console.log("کاربر با نام خود دیدگاه را ارسال می‌کند.");
    // در اینجا منطق ارسال عادی پیاده‌سازی می‌شود
  }

  // بعد از انجام کارها، می‌توانید فرم را به سرور ارسال کنید
  // یا هر کار دیگری که لازم است انجام دهید.
  alert(`ارسال به صورت ناشناس: ${isAnonymous}`);
});








// @@share modal

document.addEventListener("DOMContentLoaded", () => {
  // --- منطق پاپ‌آپ اشتراک گذاری ---
  const shareButton = document.getElementById("share-button");
  const shareModal = document.getElementById("share-modal");
  const shareModalContent = document.getElementById("share-modal-content");
  const closeShareModalBtn = document.getElementById("close-share-modal");
  const copyLinkBtn = document.getElementById("copy-link-button");
  const copyLinkText = document.getElementById("copy-link-text");

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

  // افزودن رویدادها
  shareButton.addEventListener("click", showShareModal);
  closeShareModalBtn.addEventListener("click", hideShareModal);

  // بستن پاپ‌آپ با کلیک روی پس‌زمینه تیره
  shareModal.addEventListener("click", (event) => {
    if (event.target === shareModal) {
      hideShareModal();
    }
  });

  // بستن پاپ‌آپ با فشردن کلید Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideShareModal();
    }
  });

  // --- منطق دکمه کپی کردن لینک ---
  copyLinkBtn.addEventListener("click", () => {
    const linkToCopy = window.location.href; // لینک صفحه فعلی را کپی می‌کند

    // ایجاد یک عنصر موقت برای کپی کردن
    const tempInput = document.createElement("textarea");
    tempInput.value = linkToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // اطلاع‌رسانی به کاربر که لینک کپی شده
    copyLinkText.textContent = "کپی شد!";
    copyLinkBtn.classList.add("bg-green-500"); // تغییر رنگ برای بازخورد بهتر

    // بازگرداندن متن و رنگ دکمه به حالت اولیه بعد از ۲ ثانیه
    setTimeout(() => {
      copyLinkText.textContent = "لینک محصول را کپی کنید";
      copyLinkBtn.classList.remove("bg-green-500");
    }, 2000);
  });
});







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
      slidesPerView: 6, // اینجا در کد قبلی اشتباهی ۶ بود که اصلاح شد
      spaceBetween: 24,
    },
    // برای دسکتاپ بزرگ
    1920: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },

  // دکمه‌های پیمایش (Navigation)
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  
});









// @@change gallery img

(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // عناصر موجود فعلی
  const mainImg = $("#main-image"); // تصویر بزرگ دسکتاپ
  const swiperImgs = $$(".swiper-main-img"); // اسلایدهای موبایل
  const thumbs = $$("#thumbnail-container .thumbnail-img"); // بندانگشتی‌ها
  const colorNameEl = $("#selected-color-name"); // نمایش نام رنگ
  const swatches = $$(".color-swatch"); // دکمه‌های رنگ

  // رینگ (دایره طوسی تیره) روی رنگ فعال
  function setActiveSwatch(btn) {
    swatches.forEach((b) => {
      b.classList.remove("ring-1", "ring-offset-2", "ring-gray-600", "ring-black");
    });
    btn.classList.add("ring-1", "ring-offset-2", "ring-gray-600");
  }

  // تعویض کامل گالری بر اساس آرایه تصاویر
  function updateGallery(images) {
    if (!images || !images.length) return;

    // تصویر اصلی
    if (mainImg) mainImg.src = images[0];

    // اسلایدهای موبایل (swiper)
    swiperImgs.forEach((imgEl, i) => {
      const slide = imgEl.closest(".swiper-slide") || imgEl.parentElement;
      if (images[i]) {
        imgEl.src = images[i];
        slide && slide.classList.remove("hidden");
      } else {
        // اگر کمتر از تعداد اسلاید موجود بود، اسلاید اضافی را پنهان کن
        slide && slide.classList.add("hidden");
      }
    });

    // بندانگشتی‌ها
    thumbs.forEach((thumbEl, i) => {
      if (images[i]) {
        thumbEl.src = images[i];
        thumbEl.classList.remove("hidden");
      } else {
        thumbEl.classList.add("hidden");
      }
      // ریست حالت انتخاب
      thumbEl.classList.remove("border-black-200", "opacity-100");
      thumbEl.classList.add("border-transparent", "opacity-60");
    });
    // بندانگشتی اول را فعال کن
    if (thumbs[0]) {
      thumbs[0].classList.add("border-black-200", "opacity-100");
      thumbs[0].classList.remove("border-transparent", "opacity-60");
    }
  }

  // کلیک روی دکمه‌های رنگ
  swatches.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;

      // 1) رینگ رنگ فعال
      setActiveSwatch(btn);

      // 2) خواندن لیست عکس‌ها (JSON یا لیست کاما)
      const raw = btn.getAttribute("data-images") || "[]";
      let images = [];
      try {
        images = JSON.parse(raw);
      } catch {
        images = raw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }

      // 3) تعویض گالری
      updateGallery(images);

      // 4) تغییر نام رنگ
      if (colorNameEl && btn.dataset.color) {
        colorNameEl.textContent = btn.dataset.color;
      }
    });
  });
})();









document.addEventListener("DOMContentLoaded", function () {
  // Size scroller
  const sizeContainer = document.getElementById("size-container");
  const sizePrevBtn = document.getElementById("size-prev-btn");
  const sizeNextBtn = document.getElementById("size-next-btn");

  const checkSizeScroll = () => {
    if (sizeContainer.scrollWidth > sizeContainer.clientWidth) {
      sizePrevBtn.classList.remove("hidden");
      sizeNextBtn.classList.remove("hidden");
      sizeContainer.classList.add("px-12");
    } else {
      sizePrevBtn.classList.add("hidden");
      sizeNextBtn.classList.add("hidden");
      sizeContainer.classList.remove("px-12");
    }

    if (sizeContainer.scrollLeft === 0) {
      sizePrevBtn.classList.add("opacity-50");
    } else {
      sizePrevBtn.classList.remove("opacity-50");
    }

    if (sizeContainer.scrollLeft + sizeContainer.clientWidth >= sizeContainer.scrollWidth - 1) {
      // -1 for precision issues
      sizeNextBtn.classList.add("opacity-50");
    } else {
      sizeNextBtn.classList.remove("opacity-50");
    }
  };

  sizePrevBtn.addEventListener("click", () => {
    sizeContainer.scrollBy({
      left: 150,
      behavior: "smooth",
    });
  });

  sizeNextBtn.addEventListener("click", () => {
    sizeContainer.scrollBy({
      left: -150,
      behavior: "smooth",
    });
  });

  sizeContainer.addEventListener("scroll", checkSizeScroll);
  window.addEventListener("resize", checkSizeScroll);
  checkSizeScroll();

  // Thumbnail scroller
  const thumbContainer = document.getElementById("thumbnail-container");
  const thumbPrevBtn = document.getElementById("thumb-prev-btn");
  const thumbNextBtn = document.getElementById("thumb-next-btn");

  const checkThumbScroll = () => {
    if (thumbContainer.scrollHeight > thumbContainer.clientHeight) {
      thumbPrevBtn.classList.remove("hidden");
      thumbNextBtn.classList.remove("hidden");
    } else {
      thumbPrevBtn.classList.add("hidden");
      thumbNextBtn.classList.add("hidden");
    }

    if (thumbContainer.scrollTop === 0) {
      thumbPrevBtn.classList.add("opacity-50");
    } else {
      thumbPrevBtn.classList.remove("opacity-50");
    }

    if (thumbContainer.scrollTop + thumbContainer.clientHeight >= thumbContainer.scrollHeight - 1) {
      thumbNextBtn.classList.add("opacity-50");
    } else {
      thumbNextBtn.classList.remove("opacity-50");
    }
  };

  thumbPrevBtn.addEventListener("click", () => {
    thumbContainer.scrollBy({
      top: -100,
      behavior: "smooth",
    });
  });

  thumbNextBtn.addEventListener("click", () => {
    thumbContainer.scrollBy({
      top: 100,
      behavior: "smooth",
    });
  });

  thumbContainer.addEventListener("scroll", checkThumbScroll);
  window.addEventListener("resize", checkThumbScroll);
  checkThumbScroll();
});







// @size options
document.addEventListener("DOMContentLoaded", function () {
  // 1. انتخاب تمام المان‌های مورد نیاز
  const sizeContainer = document.getElementById("size-container");
  const sizeButtons = sizeContainer.querySelectorAll(".size-btn");
  const selectedSizeText = document.getElementById("selected-size-text");

  // تابع برای مدیریت کلیک روی دکمه سایز
  function handleSizeClick(event) {
    // ابتدا کلاس active را از همه دکمه‌ها حذف می‌کنیم
    sizeButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // سپس کلاس active را فقط به دکمه کلیک شده اضافه می‌کنیم
    const clickedButton = event.currentTarget;
    clickedButton.classList.add("active");

    // در نهایت، متن سایز انتخاب شده را به‌روزرسانی می‌کنیم
    selectedSizeText.textContent = clickedButton.textContent;
  }

  // به هر دکمه سایز یک Event Listener اضافه می‌کنیم
  sizeButtons.forEach((button) => {
    button.addEventListener("click", handleSizeClick);
  });

  // مقداردهی اولیه متن سایز بر اساس دکمه‌ای که از ابتدا کلاس active دارد
  const initialActiveButton = sizeContainer.querySelector(".size-btn.active");
  if (initialActiveButton) {
    selectedSizeText.textContent = initialActiveButton.textContent;
  }
});







// @@size-modal
document.addEventListener("DOMContentLoaded", () => {
  // Select elements
  const openModalBtn = document.getElementById("open-size-guide-btn"); // دکمه‌ای که مودال را باز می‌کند
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modal = document.getElementById("size-guide-modal");
  const modalPanel = document.getElementById("modal-panel"); // پنل داخلی را انتخاب می‌کنیم
  const tabs = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");

  // --- Modal Animation Logic ---
  const openModal = () => {
    if (!modal || !modalPanel) return;

    modal.classList.remove("pointer-events-none");
    modal.classList.remove("opacity-0");

    // با یک تأخیر بسیار کوتاه، کلاس اسکیل را تغییر می‌دهیم تا انیمیشن اجرا شود
    requestAnimationFrame(() => {
      modalPanel.classList.remove("scale-95");
      modalPanel.classList.add("scale-100");
    });
  };

  const closeModal = () => {
    if (!modal || !modalPanel) return;

    modal.classList.add("opacity-0");
    modalPanel.classList.remove("scale-100");
    modalPanel.classList.add("scale-95");

    // بعد از پایان انیمیشن (300 میلی‌ثانیه)، مودال را غیرقابل کلیک می‌کنیم
    setTimeout(() => {
      modal.classList.add("pointer-events-none");
    }, 300);
  };

  // --- Event Listeners ---
  if (openModalBtn) {
    openModalBtn.addEventListener("click", openModal);
  }
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