const tabs = document.querySelectorAll(".tab-control");

// انتخاب تمام پنل‌های محتوا
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();

    // حذف کلاس فعال از تمام تب‌ها
    tabs.forEach((item) => {
      item.classList.remove("active-tab", "font-bold", "border-[#FCB108]");
      item.classList.add("border-transparent");
    });

    // افزودن کلاس فعال به تب کلیک‌شده
    tab.classList.add("active-tab", "font-bold", "border-[#FCB108]");
    tab.classList.remove("border-transparent");

    // مخفی کردن تمام محتواها
    contents.forEach((content) => {
      content.classList.add("hidden");
    });

    // نمایش محتوای مرتبط با تب کلیک‌شده
    const targetId = tab.getAttribute("data-tab-target");
    const targetContent = document.querySelector(targetId);
    if (targetContent) {
      targetContent.classList.remove("hidden");
    }
  });
});
