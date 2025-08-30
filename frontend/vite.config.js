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
        dashboard: resolve(__dirname, "pages/dashboard.html"),
        category: resolve(__dirname, "pages/category.html"),
        checkoutAddr: resolve(__dirname, "pages/checkout-addr.html"),
        checkoutCart: resolve(__dirname, "pages/checkout-cart.html"),
        checkoutEmpty: resolve(__dirname, "pages/checkout-empty.html"),
        checkoutPay: resolve(__dirname, "pages/checkout-pay.html"),
        checkoutDone: resolve(__dirname, "pages/checkout-done.html"),
        checkoutError: resolve(__dirname, "pages/checkout-error.html"),
        product: resolve(__dirname, "pages/product.html"),
        // Additional pages can be added here
      },
    },
  },
});
