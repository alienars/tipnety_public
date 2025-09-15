// Function to open the modal
function openModal() {
    const modal = document.getElementById('new-address-modal');
    modal.classList.remove('hidden');
  }
  
  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('new-address-modal');
    modal.classList.add('hidden');
  }
  
  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements
    const openButton = document.querySelector('.add-new-address-btn');
    const modalBackdrop = document.getElementById('new-address-modal');
    const closeButton = document.getElementById('close-modal-btn');
    const cancelButton = document.getElementById('cancel-btn');
    const modalContent = document.querySelector('#new-address-modal > div');
  
    // Province Select
    const provinceSelectBox = document.getElementById('province-select-box');
    const provinceOptionsList = document.getElementById('province-options-list');
    const selectedProvince = document.getElementById('selected-province');
    const provinceDropdownIcon = document.getElementById('province-dropdown-icon');
  
    // City Select
    const citySelectBox = document.getElementById('city-select-box');
    const cityOptionsList = document.getElementById('city-options-list');
    const selectedCity = document.getElementById('selected-city');
    const cityDropdownIcon = document.getElementById('city-dropdown-icon');
  
    // Event listeners for modal
    if (openButton) {
      openButton.addEventListener('click', openModal);
    }
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }
    if (cancelButton) {
      cancelButton.addEventListener('click', closeModal);
    }
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) {
          closeModal();
        }
      });
    }
    if (modalContent) {
      modalContent.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }
  
    // Event listeners for province select
    if (provinceSelectBox) {
      provinceSelectBox.addEventListener('click', () => {
        provinceOptionsList.classList.toggle('hidden');
        if (provinceDropdownIcon) {
          provinceDropdownIcon.classList.toggle('rotate-180');
        }
      });
    }
    
    if (provinceOptionsList) {
      provinceOptionsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
          const selectedValue = event.target.getAttribute('data-value');
          const selectedText = event.target.textContent;
          selectedProvince.textContent = selectedText;
          selectedProvince.dataset.value = selectedValue;
          provinceOptionsList.classList.add('hidden');
          if (provinceDropdownIcon) {
              provinceDropdownIcon.classList.remove('rotate-180');
          }
        }
      });
    }
  
    // Event listeners for city select
    if (citySelectBox) {
      citySelectBox.addEventListener('click', () => {
        cityOptionsList.classList.toggle('hidden');
        if (cityDropdownIcon) {
          cityDropdownIcon.classList.toggle('rotate-180');
        }
      });
    }
    
    if (cityOptionsList) {
      cityOptionsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
          const selectedValue = event.target.getAttribute('data-value');
          const selectedText = event.target.textContent;
          selectedCity.textContent = selectedText;
          selectedCity.dataset.value = selectedValue;
          cityOptionsList.classList.add('hidden');
          if (cityDropdownIcon) {
              cityDropdownIcon.classList.remove('rotate-180');
          }
        }
      });
    }
  
    // Close all dropdowns if user clicks outside
    document.addEventListener('click', (event) => {
      if (provinceSelectBox && !provinceSelectBox.contains(event.target) && !provinceOptionsList.contains(event.target)) {
        provinceOptionsList.classList.add('hidden');
        if (provinceDropdownIcon) {
          provinceDropdownIcon.classList.remove('rotate-180');
        }
      }
      if (citySelectBox && !citySelectBox.contains(event.target) && !cityOptionsList.contains(event.target)) {
        cityOptionsList.classList.add('hidden');
        if (cityDropdownIcon) {
          cityDropdownIcon.classList.remove('rotate-180');
        }
      }
    });
  
  });



  

  document.addEventListener("DOMContentLoaded", function () {
    // --- 1. انتخاب عناصر مورد نیاز از DOM ---
    const container = document.getElementById("custom-select-container");
    const selectBox = document.getElementById("bank-select-box");
    const selectedBankText = document.getElementById("selected-bank");
    const optionsList = document.getElementById("options-list");
    const dropdownIcon = document.getElementById("dropdown-icon");
    const searchInput = document.getElementById("search-input");
    const optionItems = document.querySelectorAll(".option-item");

    // --- 2. منطق باز و بسته کردن لیست ---
    selectBox.addEventListener("click", function () {
      optionsList.classList.toggle("hidden");
      dropdownIcon.classList.toggle("rotate-180"); // چرخاندن آیکون فلش
    });

    // --- 3. بستن لیست با کلیک در بیرون از آن ---
    document.addEventListener("click", function (e) {
      // اگر کلیک بیرون از کانتینر اصلی بود
      if (!container.contains(e.target)) {
        optionsList.classList.add("hidden"); // لیست را ببند
        dropdownIcon.classList.remove("rotate-180");
      }
    });

    // --- 4. منطق انتخاب یک آیتم ---
    optionItems.forEach(function (item) {
      item.addEventListener("click", function () {
        // الف) حذف حالت انتخاب از همه آیتم‌ها
        optionItems.forEach(function (otherItem) {
          otherItem.classList.remove("selected", "bg-gray-100", "font-semibold");
          // رادیو باتن را به حالت پیش‌فرض برگردان
          otherItem.querySelector(".custom-radio").innerHTML = "";
          otherItem.querySelector(".custom-radio").className = "custom-radio w-5 h-5 block rounded-full border-2 border-gray-300";
        });

        // ب) افزودن حالت انتخاب به آیتم کلیک شده
        this.classList.add("selected", "bg-gray-100", "font-semibold");
        // رادیو باتن را به حالت تیک‌خورده تغییر بده
        const radio = this.querySelector(".custom-radio");
        radio.className = "custom-radio w-5 h-5 flex items-center justify-center rounded-full bg-black border-2 border-black";
        radio.innerHTML = `
                    <svg class="w-3 h-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>`;

        // ج) به‌روزرسانی متن نمایشگر اصلی
        const selectedText = this.querySelector("span:first-child").textContent;
        selectedBankText.textContent = selectedText;

        // د) بستن لیست پس از انتخاب
        optionsList.classList.add("hidden");
        dropdownIcon.classList.remove("rotate-180");
      });
    });

    // --- 5. منطق جستجو ---
    searchInput.addEventListener("input", function () {
      const filter = searchInput.value.toLowerCase();

      optionItems.forEach(function (item) {
        const text = item.querySelector("span:first-child").textContent.toLowerCase();
        // اگر متن آیتم شامل عبارت جستجو شده بود، آن را نمایش بده وگرنه پنهان کن
        if (text.includes(filter)) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  });