# پروژه فروشگاه اینترنتی تیپ نتی

این مخزن شامل نسخه‌ی ساده و ماژولار فروشگاه اینترنتی تیپ نتی است. ساختار پروژه با [Vite](https://vitejs.dev/) و آخرین نسخه‌ی **Tailwind CSS 4.1** پیاده‌سازی شده و برای استفاده از آن نیازی به PostCSS یا فایل پیکربندی `tailwind.config.js` نیست. استایل‌های Tailwind در فایل `assets/css/main.css` با دستور `@import "tailwindcss";` فراخوانی می‌شوند و پلاگین `@tailwindcss/vite` در زمان build آن‌ها را کامپایل می‌کند.

---

## ساختار پوشه‌ها

```
/frontend
  ├─ index.html
  ├─ vite.config.js
  ├─ package.json
  ├─ assets/
  │   ├─ css/
  │   ├─ js/
  │   └─ fonts/
  ├─ pages/
  └─ partials/ (فقط header و footer)
```

- **index.html** و سایر فایل‌های موجود در `pages/` صفحات اصلی پروژه هستند.
- پوشه `partials/` تنها شامل فایل‌های `header.html` و `footer.html` است.
- همه‌ی استایل‌ها از طریق `assets/css/main.css` بارگذاری می‌شوند.

---

## راه‌اندازی پروژه

1. نصب وابستگی‌ها:
   ```bash
   cd frontend
   npm install
   ```
2. اجرای محیط توسعه:
   ```bash
   npm run dev
   ```
   سپس آدرس محلی اعلام‌شده توسط Vite را در مرورگر باز کنید.
3. برای ساخت نسخه‌ی production می‌توانید دستور زیر را اجرا کنید:
   ```bash
   npm run build
   ```

---

## تکنولوژی‌های استفاده شده

- **Tailwind CSS 4.1** به‌صورت مستقل (بدون PostCSS)
- **Alpine.js** برای تعاملات سبک در صفحات
- **Vite** به عنوان باندلر و سرور توسعه

---

در صورت بروز هرگونه سؤال یا مشکل می‌توانید با تیم توسعه در میان بگذارید.
