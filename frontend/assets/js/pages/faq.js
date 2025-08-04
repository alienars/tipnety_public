document.addEventListener("DOMContentLoaded", function () {
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
