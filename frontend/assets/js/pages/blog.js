
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";




// @@desktop mini pro slider
var homeMiniSliderD = new Swiper(".home-mini-slider-desktop", {
  loop: false,
  // slidesPerView: 6,
  slidesPerView: "auto",
  spaceBetween: 16,
  freeMode: false,
});



document.addEventListener("DOMContentLoaded", function () {
  // --- شناسایی همه‌ی المان‌ها ---

  // مودال‌ها
  const sortModal = document.getElementById("sortModal");
  const categoryModal = document.getElementById("categoryModal");

  // دکمه‌های باز کننده
  const openSortBtn = document.getElementById("openSortModalBtn");
  const openCategoryBtn = document.getElementById("openCategoryModalBtn");

  // دکمه‌های بسته شونده (داخل مودال‌ها)
  const closeSortBtn = document.getElementById("closeSortModalBtn");
  const closeCategoryBtn = document.getElementById("closeCategoryModalBtn");

  // المان span داخل دکمه مرتب‌سازی
  const sortButtonText = document.getElementById("sortButtonText");

  // گزینه‌های رادیویی داخل مودال مرتب‌سازی
  const sortRadioButtons = document.querySelectorAll('#sortModal input[name="sort"]');

  // --- توابع باز و بسته کردن ---

  function openModal(modal) {
    if (modal) {
      modal.style.display = "block"; // یا 'flex' یا 'grid' بسته به CSS کلاس .sheet
      modal.setAttribute("aria-hidden", "false");
      // می‌توانید انیمیشن ورود را هم اینجا اضافه کنید
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      // می‌توانید انیمیشن خروج را هم اینجا اضافه کنید
    }
  }

  // --- اتصال رویدادها (Event Listeners) ---

  // باز کردن مودال مرتب‌سازی
  if (openSortBtn) {
    openSortBtn.addEventListener("click", () => {
      openModal(sortModal);
    });
  }

  // باز کردن مودال دسته‌بندی
  if (openCategoryBtn) {
    openCategoryBtn.addEventListener("click", () => {
      openModal(categoryModal);
    });
  }

  // بستن مودال مرتب‌سازی
  if (closeSortBtn) {
    closeSortBtn.addEventListener("click", () => {
      closeModal(sortModal);
    });
  }

  // بستن مودال دسته‌بندی
  if (closeCategoryBtn) {
    closeCategoryBtn.addEventListener("click", () => {
      closeModal(categoryModal);
    });
  }

  // --- [نکته جدید] آپدیت کردن متن دکمه مرتب‌سازی ---

  if (sortRadioButtons.length > 0 && sortButtonText) {
    sortRadioButtons.forEach((radio) => {
      radio.addEventListener("change", function () {
        if (this.checked) {
          // ۱. متن لیبل گزینه انتخاب شده را پیدا کن
          const label = this.closest("label");
          const labelText = label.querySelector(".category-text").textContent;

          // ۲. متن داخل span دکمه را آپدیت کن
          sortButtonText.textContent = labelText.trim();

          // ۳. (اختیاری) مودال را ببند
          closeModal(sortModal);
        }
      });
    });
  }

  // (اختیاری) بستن مودال با کلیک روی پس‌زمینه (اگر کلاس .sheet چنین کاری می‌کند)
  // می‌توانید یک event listener به خود .sheet اضافه کنید که اگر روی .panel کلیک نشد، بسته شود
});