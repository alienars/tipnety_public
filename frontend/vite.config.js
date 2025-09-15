/**
 * Vite Configuration File
 * Configures build settings, plugins and dependencies for the project
 */
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import ViteRestart from 'vite-plugin-restart';

// Define __dirname for ES Modules compatibility
const __dirname = resolve();

export default defineConfig({
  base: "./",
  root: ".",
  plugins: [
    // Initialize Tailwind CSS
    tailwindcss(),
    // Configure live reload for project directories
    ViteRestart({
      restart: ["assets/**/**/*", "pages/**/**/*", "partials/**/**/*"],
    }),
  ],

  // Exclude specific dependencies from optimization
  optimizeDeps: {
    exclude: ["alpinejs", "swiper"],
  },

  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contact: resolve(__dirname, "pages/contact.html"),
        login: resolve(__dirname, "pages/login.html"),
        notfound: resolve(__dirname, "pages/404.html"),
        faq: resolve(__dirname, "pages/faq.html"),
        about: resolve(__dirname, "pages/about.html"),
        category: resolve(__dirname, "pages/category.html"),
        checkoutAddr: resolve(__dirname, "pages/checkout-addr.html"),
        checkoutCart: resolve(__dirname, "pages/checkout-cart.html"),
        checkoutEmpty: resolve(__dirname, "pages/checkout-empty.html"),
        checkoutPay: resolve(__dirname, "pages/checkout-pay.html"),
        checkoutDone: resolve(__dirname, "pages/checkout-done.html"),
        checkoutError: resolve(__dirname, "pages/checkout-error.html"),
        product: resolve(__dirname, "pages/product.html"),
        home: resolve(__dirname, "pages/home.html"),
        dashboardHome: resolve(__dirname, "pages/dashboard-home.html"),
        dashboardInfo: resolve(__dirname, "pages/dashboard-info.html"),
        dashboardMyaddress: resolve(__dirname, "pages/dashboard-myaddress.html"),
        dashboardMycomments: resolve(__dirname, "pages/dashboard-mycomments.html"),
        dashboardMycreditcard: resolve(__dirname, "pages/dashboard-mycreditcard.html"),
        dashboardMyfavouritesEmpty: resolve(__dirname, "pages/dashboard-myfavourites-empty.html"),
        dashboardMyfavourites: resolve(__dirname, "pages/dashboard-myfavourites.html"),
        dashboardMyorder: resolve(__dirname, "pages/dashboard-myorder.html"),
        dashboardNotice: resolve(__dirname, "pages/dashboard-notice.html"),
        dashboardOrderDetails: resolve(__dirname, "pages/dashboard-order-details.html"),
        dashboardSidebar: resolve(__dirname, "pages/dashboard-sidebar.html"),
        dashboardTransactions: resolve(__dirname, "pages/dashboard-transactions.html"),
        dashboardWallet: resolve(__dirname, "pages/dashboard-wallet.html"),
        landingBrand: resolve(__dirname, "pages/landing-brand.html"),
        landingHome: resolve(__dirname, "pages/landing-home.html"),
        landingProduct: resolve(__dirname, "pages/landing-product.html"),
        setResults: resolve(__dirname, "pages/set-results.html"),
        set: resolve(__dirname, "pages/set.html"),
        blog: resolve(__dirname, "pages/blog.html"),
        blogCat: resolve(__dirname, "pages/blog-cat.html"),
        blogSinglepost: resolve(__dirname, "pages/blog-singlepost.html"),
        // Additional pages can be added here
      },
    },
  },
});
