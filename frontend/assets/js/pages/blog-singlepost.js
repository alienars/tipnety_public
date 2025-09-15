document.addEventListener("DOMContentLoaded", function () {

  const mqDesktop = window.matchMedia('(min-width:1024px)');
  const filterHub = document.getElementById('filterHub');
  const toggleFiltersBtns = document.querySelectorAll('[data-js="toggle-filters"]');
  const hubButtons = document.querySelectorAll('#hubList [data-target-sheet]');
  const backToHubButtons = document.querySelectorAll('[data-action="back-to-hub"]');

  function isDesktop() { return mqDesktop.matches; }

  function setSidebar(state) {
    if (!catalog) return;
    catalog.dataset.sidebar = state;
    if (miniWrap) { miniWrap.style.display = state === 'open' ? 'none' : ''; }
    if (miniWrapSelected) { miniWrapSelected.style.display = state === 'open' ? 'none' : ''; }
  }

  function openSheet(el) { 
    if (el) { 
      el.classList.add('show'); 
      el.setAttribute('aria-hidden', 'false'); 
      document.body.style.overflow = 'hidden'; 
    } 
  }

  toggleFiltersBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isDesktop()) {
        setSidebar(catalog.dataset.sidebar === 'open' ? 'closed' : 'open');
      } else {
        openSheet(filterHub);
      }
    });
  });

  hubButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.targetSheet;
      const targetSheet = document.getElementById(targetId);
      if (targetSheet) {
        closeSheet(filterHub);
        openSheet(targetSheet);
      }
    });
  });

  sortSheet?.querySelectorAll('[data-close]')?.forEach(b => b.addEventListener('click', () => closeSheet(sortSheet)));

  document.querySelectorAll('.sheet [data-close]').forEach(button => {
    button.addEventListener('click', () => {
      closeSheet(button.closest('.sheet'));
    });
  });

  function closeSheet(el) { 
    if (el) { 
      el.classList.remove('show'); 
      el.setAttribute('aria-hidden', 'true'); 
      if (!document.querySelector('.sheet.show')) document.body.style.overflow = ''; 
    } 
  }

  backToHubButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentSheet = button.closest('.sheet');
      closeSheet(currentSheet);
      openSheet(filterHub);
    });
  });

  mqDesktop.addEventListener('change', () => {
    if (isDesktop()) setSidebar(catalog.dataset.sidebar || 'closed');
    else if (miniWrap) miniWrap.style.display = '';
  });

  document.addEventListener('DOMContentLoaded', () => {
    cloneMiniFilters();
    setSidebar('closed');
  });

  document.getElementById('mSortBtn')?.addEventListener('click', () => openSheet(sortSheet));

  // --- FAQ Accordion Logic ---
  const faqContainer = document.getElementById("faq-list");
  if (faqContainer) {
    faqContainer.addEventListener("click", function (event) {
      const toggleButton = event.target.closest(".accordion-toggle");
      if (!toggleButton) return;

      const faqItem = toggleButton.closest(".faq-item");
      const content = toggleButton.nextElementSibling;
      const isOpen = faqItem.classList.contains("open");

      faqContainer.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== faqItem) {
          openItem.classList.remove("open");
          openItem.querySelector(".accordion-content").style.maxHeight = "0px";
        }
      });

      if (isOpen) {
        faqItem.classList.remove("open");
        content.style.maxHeight = "0px";
      } else {
        faqItem.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }

  // --- Mobile Category Accordion Logic ---
  const mobileCategoryToggle = document.getElementById("mobile-category-toggle");
  if (mobileCategoryToggle) {
    const mobileCategoryContent = document.getElementById("mobile-category-content");
    mobileCategoryToggle.addEventListener("click", function () {
      this.classList.toggle("open");
      if (mobileCategoryContent.style.maxHeight) {
        mobileCategoryContent.style.maxHeight = null;
      } else {
        mobileCategoryContent.style.maxHeight = mobileCategoryContent.scrollHeight + "px";
      }
    });
  }

  // --- "Load More" Button Logic (Simulation) ---
  const loadMoreButton = document.getElementById("load-more");
  if (loadMoreButton && faqContainer) {
    let itemsLoaded = 0;
    loadMoreButton.addEventListener("click", function () {
      this.textContent = "در حال بارگذاری...";
      this.disabled = true;

      setTimeout(() => {
        const newFaqItemHTML = `
                            <div class="faq-item bg-white border border-gray-200 rounded-xl overflow-hidden">
                                <button class="accordion-toggle w-full flex items-center p-5 text-right cursor-pointer min-h-[100px]">
                                    <div class="accordion-icon-wrapper w-6 h-6 flex-shrink-0 relative text-yellow-600">
                                        <i-con name="plus" class="icon-plus absolute inset-0 transition-opacity duration-300"></i-con>
                                        <i-con name="minus" class="icon-minus absolute inset-0 transition-opacity duration-300 opacity-0"></i-con>
                                    </div>
                                    <div class="w-px h-4 bg-gray-200 mx-4"></div>
                                    <h3 class="font-bold text-base text-dark">این یک سوال جدید است (${itemsLoaded + 1})</h3>
                                </button>
                                <div class="accordion-content">
                                    <div class="px-5 pb-5 text-xs text-gray-600 leading-relaxed">
                                        <p>این پاسخ برای سوال جدید است.</p>
                                    </div>
                                </div>
                            </div>
                        `;
        faqContainer.insertAdjacentHTML("beforeend", newFaqItemHTML);
        itemsLoaded++;
        this.textContent = "مشاهده بیشتر";
        this.disabled = false;
      }, 500);
    });
  }

  // --- Category Checkbox Logic ---
  const categoryLists = document.querySelectorAll(".category-list");
  function updateTextStyle(checkbox) {
    const label = checkbox.closest("label");
    if (!label) return;
    const text = label.querySelector(".category-text");
    if (!text) return;

    if (checkbox.checked) {
      text.classList.add("font-bold", "text-dark");
      text.classList.remove("font-medium", "text-dark-light");
    } else {
      text.classList.remove("font-bold", "text-dark");
      text.classList.add("font-medium", "text-dark-light");
    }
  }
  categoryLists.forEach((list) => {
    list.querySelectorAll(".custom-checkbox").forEach((checkbox) => {
      updateTextStyle(checkbox);
    });
    list.addEventListener("change", function (event) {
      if (event.target.classList.contains("custom-checkbox")) {
        updateTextStyle(event.target);
      }
    });
  });
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