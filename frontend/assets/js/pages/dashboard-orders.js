const tabs = document.querySelectorAll(".tab-control");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // حذف استایل فعال از همه تب‌ها
    tabs.forEach((item) => {
      item.classList.remove("border-yellow-500");
      item.classList.add("border-transparent");
    });

    // افزودن استایل فعال به تب کلیک‌شده
    tab.classList.add("border-yellow-500");
    tab.classList.remove("border-transparent");

    // مخفی کردن تمام محتواها
    contents.forEach((content) => {
      content.classList.add("hidden");
    });

    // نمایش محتوای مرتبط با تب
    const targetId = tab.getAttribute("data-tab-target");
    const targetContent = document.querySelector(targetId);
    if (targetContent) {
      targetContent.classList.remove("hidden");
    }
  });
});
