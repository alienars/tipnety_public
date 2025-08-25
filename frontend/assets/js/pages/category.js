import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const sortWrapper = document.getElementById('sort-dropdown-wrapper');
const sortButton = document.getElementById('sort-dropdown-button');
const sortMenu = document.getElementById('sort-dropdown-menu');
const sortLabel = document.getElementById('sort-dropdown-label');


if (sortButton && sortMenu && sortWrapper && sortLabel) {


  sortButton.addEventListener('click', (event) => {
    event.stopPropagation();
    sortMenu.classList.toggle('hidden');
  });


  window.addEventListener('click', (event) => {
    if (!sortWrapper.contains(event.target)) {
      sortMenu.classList.add('hidden');
    }
  });


  sortMenu.addEventListener('click', (event) => {
    const targetLink = event.target.closest('a');
    if (targetLink && targetLink.dataset.sort) {
      event.preventDefault();


      sortLabel.textContent = targetLink.dataset.sort;


      sortMenu.classList.add('hidden');


    }
  });
}

// @@ filters

document.querySelectorAll('.filter-section').forEach(sec => {
  const header = sec.querySelector('.filter-header');
  const body = sec.querySelector('.filter-body');
  header?.addEventListener('click', () => {
    const willOpen = !sec.classList.contains('open');
    sec.classList.toggle('open', willOpen);
    body.classList.toggle('hidden', !willOpen);
  });
});

// همه‌ی سکشن‌ها پیش‌فرض باز هستند (در HTML کلاس open و body بدون hidden گذاشته‌ایم)

// سرچ هر سکشن
function filterList(inputEl, listEl) {
  const q = (inputEl.value || '').trim().toLocaleLowerCase('fa');
  listEl.querySelectorAll('li').forEach(li => {
    const text = (li.textContent || '').toLocaleLowerCase('fa');
    li.style.display = text.includes(q) ? '' : 'none';
  });
}
document.querySelectorAll('input[data-search]').forEach(inp => {
  const key = inp.getAttribute('data-search');
  const list = inp.closest('.filter-body,.panel')?.querySelector(`[data-list="${key}"]`);
  if (!list) return;
  inp.addEventListener('input', () => filterList(inp, list));
});

// رنج قیمت: محاسبه‌ی بازه برای رنگ میانی
function initializePriceSlider(container) {
  // Exit if the container element doesn't exist
  if (!container) return;

  // Find all necessary child elements within the container
  const wrap = container.querySelector('.range-wrap');
  const track = container.querySelector('.range-track');
  const ranges = container.querySelectorAll('.rng');
  const numInputs = container.querySelectorAll('input[type="number"], input[type="text"][inputmode="numeric"]');

  // Exit if any of the required elements are missing
  if (!wrap || !track || ranges.length < 2 || numInputs.length < 2) {
    return;
  }

  const [rmin, rmax] = ranges;
  const [nmin, nmax] = numInputs;

  // Change input type to 'text' to allow for comma formatting
  [nmin, nmax].forEach(n => {
    try { if (n.type !== 'text') n.type = 'text'; } catch (_) { }
    n.setAttribute('inputmode', 'numeric'); // Show numeric keyboard on mobile
  });

  // Define constants for the range
  const MIN = 0, MAX = 5000000, STEP = 50000;

  // Helper functions for number conversion and formatting
  const toEn = s => String(s).replace(/[\u06F0-\u06F9]/g, ch => String(ch.charCodeAt(0) - 0x06F0)).replace(/,/g, '');
  const toFa = s => String(s).replace(/\d/g, d => String.fromCharCode(0x06F0 + Number(d)));
  const fmtFaComma = v => toFa(Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  const clampStep = v => Math.round(Math.max(MIN, Math.min(MAX, v)) / STEP) * STEP;

  // Set attributes for range inputs
  wrap.setAttribute('dir', 'ltr');
  [rmin, rmax].forEach(r => {
    r.min = MIN; r.max = MAX; r.step = STEP;
    r.setAttribute('dir', 'ltr');
  });

  // Function to update the visual track based on slider values
  function setTrack(a, b) {
    const left = (a - MIN) / (MAX - MIN);
    const right = 1 - ((b - MIN) / (MAX - MIN));
    track.style.setProperty('--min', left);
    track.style.setProperty('--max', right);
  }

  // Syncs the number inputs and track when the range sliders are moved
  function syncFromRanges() {
    let a = Number(rmin.value);
    let b = Number(rmax.value);
    if (a > b) { [a, b] = [b, a]; rmin.value = a; rmax.value = b; } // Swap if needed
    nmin.value = fmtFaComma(a);
    nmax.value = fmtFaComma(b);
    setTrack(a, b);
  }

  // Syncs the range sliders and track when the number inputs are changed
  function syncFromInputs() {
    let a = clampStep(parseInt(toEn(nmin.value || MIN), 10) || MIN);
    let b = clampStep(parseInt(toEn(nmax.value || MAX), 10) || MAX);
    if (a > b) [a, b] = [b, a];
    rmin.value = a;
    rmax.value = b;
    nmin.value = fmtFaComma(a);
    nmax.value = fmtFaComma(b);
    setTrack(a, b);
  }

  // Attach event listeners
  rmin.addEventListener('input', syncFromRanges);
  rmax.addEventListener('input', syncFromRanges);
  nmin.addEventListener('input', syncFromInputs);
  nmax.addEventListener('input', syncFromInputs);
  nmin.addEventListener('blur', syncFromInputs);
  nmax.addEventListener('blur', syncFromInputs);

  // Initial synchronization when the script loads
  syncFromInputs();
}

// After the page content is fully loaded...
document.addEventListener('DOMContentLoaded', () => {
  // Find ALL price filter components on the page and initialize each one.
  document.querySelectorAll('#sec-price, [data-popover="price"], #filterDetail-price').forEach(initializePriceSlider);
});

document.addEventListener("DOMContentLoaded", () => {
  function updateSlideOverlays(swiper) {
    if (window.innerWidth < 768) {
      swiper.slides.forEach(slide => {
        slide.classList.remove('slide-overlay-first', 'slide-overlay-last');
      });
      return;
    }
    swiper.slides.forEach(slide => {
      slide.classList.remove('slide-overlay-first', 'slide-overlay-last');
    });
    const activeIndex = swiper.activeIndex;
    const slidesPerView = swiper.params.slidesPerView;
    const slides = swiper.slides;
    if (slides.length > 0) {
      const firstVisibleSlide = slides[activeIndex];
      if (firstVisibleSlide) {
        firstVisibleSlide.classList.add('slide-overlay-first');
      }
      const lastVisibleSlide = slides[activeIndex + slidesPerView - 1];
      if (lastVisibleSlide) {
        lastVisibleSlide.classList.add('slide-overlay-last');
      }
    }
  }

  const productsSlider = new Swiper(".products-slider", {
    loop: true,
    watchSlidesProgress: true,
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: ".category-button-next",
      prevEl: ".category-button-prev",
    },
    breakpoints: {
      768: { slidesPerView: 5, spaceBetween: 20 },
      900: { slidesPerView: 6, spaceBetween: 20 },
      1024: { slidesPerView: 7, spaceBetween: 24 },
      1280: { slidesPerView: 8, spaceBetween: 24 },
      1540: { slidesPerView: 9, spaceBetween: 24 },
    },
    on: {
      init: updateSlideOverlays,
      resize: updateSlideOverlays,
      beforeTransitionStart: updateSlideOverlays,
    }
  });
});

/* ====== MODIFIED: Category Filters Logic ======
   - Manages static HTML sheets for mobile filters.
   - Handles desktop sidebar and popover functionality.
====================================================== */
(function () {
  const mqDesktop = window.matchMedia('(min-width:1024px)');
  const catalog = document.getElementById('catalog');
  const miniWrap = document.getElementById('miniFiltersWrap');
  const miniWrapSelected = document.getElementById('miniFiltersWrapSelected');
  const toggleFiltersBtns = document.querySelectorAll('[data-js="toggle-filters"]');

  // Mobile Sheets
  const sortSheet = document.getElementById('sortSheet');
  const filterHub = document.getElementById('filterHub');
  const hubButtons = document.querySelectorAll('#hubList [data-target-sheet]');
  const detailSheets = document.querySelectorAll('.filter-detail-sheet');
  const backToHubButtons = document.querySelectorAll('[data-action="back-to-hub"]');

  // ---------- Helpers ----------
  function openSheet(el) { if (el) { el.classList.add('show'); el.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; } }
  function closeSheet(el) { if (el) { el.classList.remove('show'); el.setAttribute('aria-hidden', 'true'); if (!document.querySelector('.sheet.show')) document.body.style.overflow = ''; } }
  function isDesktop() { return mqDesktop.matches; }
  function setSidebar(state) { // open | closed (desktop only)
    if (!catalog) return;
    catalog.dataset.sidebar = state;
    if (miniWrap) { miniWrap.style.display = state === 'open' ? 'none' : ''; }
    if (miniWrapSelected) { miniWrapSelected.style.display = state === 'open' ? 'none' : ''; }
  }

  // ---------- Desktop: sidebar toggle or open mobile sheet ----------
  toggleFiltersBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isDesktop()) {
        setSidebar(catalog.dataset.sidebar === 'open' ? 'closed' : 'open');
      } else {
        openSheet(filterHub);
      }
    });
  });
  mqDesktop.addEventListener('change', () => {
    if (isDesktop()) setSidebar(catalog.dataset.sidebar || 'closed');
    else if (miniWrap) miniWrap.style.display = '';
  });

  // ---------- Desktop & Mobile: Mini filter popovers (dropdowns) ----------
  // This logic now works for all popovers, including the copied ones in mobile detail sheets.
  let openPop = null;
  function closePopover() { if (openPop) { openPop.classList.remove('show'); openPop = null; } }

  function initializePopovers() {
    document.querySelectorAll('[data-pop]').forEach(btn => {
      const wrap = btn.closest('.popwrap');
      const pop = wrap?.querySelector(`[data-popover="${btn.dataset.pop}"]`);
      if (!pop) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (pop === openPop) { closePopover(); }
        else { closePopover(); pop.classList.add('show'); openPop = pop; }
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (!openPop) return;
    if (!e.target.closest('.popover') && !e.target.closest('[data-pop]')) closePopover();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopover(); });

  // ---------- Mobile: Sort sheet ----------
  document.getElementById('mSortBtn')?.addEventListener('click', () => openSheet(sortSheet));
  sortSheet?.querySelectorAll('[data-close]')?.forEach(b => b.addEventListener('click', () => closeSheet(sortSheet)));

  // ---------- Mobile: Static Filter Navigation ----------
  // From Hub to Detail
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

  // From Detail back to Hub
  backToHubButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentSheet = button.closest('.sheet');
      closeSheet(currentSheet);
      openSheet(filterHub);
    });
  });

  // Close any open sheet
  document.querySelectorAll('.sheet [data-close]').forEach(button => {
    button.addEventListener('click', () => {
      closeSheet(button.closest('.sheet'));
    });
  });

  // --- Logic to copy mini-filters into mobile detail sheets ---
  function cloneMiniFilters() {
    const source = document.querySelector('#miniFiltersWrap .mini-filters');
    const destinations = document.querySelectorAll('.mini-filters-mobile-copy');
    if (source && destinations.length > 0) {
      // destinations.forEach(dest => {
      //     dest.innerHTML = source.innerHTML;
      // });
      // After cloning, re-initialize popovers to attach event listeners to new elements
      initializePopovers();
    }
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    cloneMiniFilters();
    setSidebar('closed');
  });

})();


const toggleButton = document.getElementById('toggle-button');
const textContainer = document.getElementById('expandable-text-container');
const toggleText = document.getElementById('toggle-text');
const toggleIcon = document.getElementById('toggle-icon');
const fadeOverlay = document.getElementById('fade-overlay');

// Get the initial collapsed height from the Tailwind classes
const collapsedHeight = textContainer.style.maxHeight || window.getComputedStyle(textContainer).maxHeight;

// Add a click event listener to the button
toggleButton.addEventListener('click', () => {
  // Check if the text is currently expanded or collapsed
  const isExpanded = textContainer.classList.contains('expanded');

  if (isExpanded) {
    // If it's expanded, collapse it
    textContainer.style.maxHeight = collapsedHeight;
    toggleText.textContent = 'مشاهده بیشتر';
    toggleIcon.classList.remove('rotate-180');
    fadeOverlay.style.opacity = '1'; // Make fade visible again
    textContainer.classList.remove('expanded');
  } else {
    // If it's collapsed, expand it to its full scroll height plus a buffer
    // The buffer ensures the last line is fully visible above the button
    const buffer = 30; // 30px buffer
    textContainer.style.maxHeight = (textContainer.scrollHeight + buffer) + 'px';
    toggleText.textContent = 'مشاهده کمتر';
    toggleIcon.classList.add('rotate-180');
    fadeOverlay.style.opacity = '0'; // Hide the fade effect
    textContainer.classList.add('expanded');
  }
});




document.addEventListener('DOMContentLoaded', () => {
  const transformWrappers = document.querySelectorAll('.transform-wrapper');

  transformWrappers.forEach(wrapper => {
    const container = wrapper.querySelector('.transform-container');
    const plusIcon = wrapper.querySelector('.plus-icon');
    const sizeOptions = wrapper.querySelector('.size-options');

    // *** UPDATED: Add wheel event listener for horizontal scrolling ***
    if (sizeOptions) {
      sizeOptions.addEventListener('wheel', (event) => {
        // Only prevent default and scroll horizontally if there is overflow
        if (sizeOptions.scrollWidth > sizeOptions.clientWidth) {
          event.preventDefault();
          sizeOptions.scrollLeft += event.deltaY;
        }
      }, { passive: false }); // Set passive: false to ensure preventDefault() works
    }

    wrapper.addEventListener('mouseenter', () => {
      const requiredWidth = sizeOptions.scrollWidth + (2 * 12); // scrollWidth + px-3 padding
      const maxWidth = 220;
      const finalWidth = Math.min(requiredWidth, maxWidth);

      container.style.width = `${finalWidth}px`;
      container.classList.remove('w-12', 'rounded-full');
      container.classList.add('rounded-lg');

      plusIcon.classList.add('opacity-0', 'invisible');
      sizeOptions.classList.remove('opacity-0', 'invisible');
      sizeOptions.classList.add('opacity-100', 'visible');
    });

    wrapper.addEventListener('mouseleave', () => {
      container.style.width = '';
      container.classList.remove('rounded-lg');
      container.classList.add('w-12', 'rounded-full');

      plusIcon.classList.remove('opacity-0', 'invisible');
      sizeOptions.classList.remove('opacity-100', 'visible');
      sizeOptions.classList.add('opacity-0', 'invisible');
    });
  });
});









document.addEventListener('DOMContentLoaded', () => {
  // همه کارت‌های محصول را پیدا می‌کند
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const mainImage = card.querySelector('.product-main-image');
    const hoverImage = card.querySelector('.product-hover-image');
    const colorSwatches = card.querySelectorAll('.color-swatch');

    // اگر کارت، عکس‌ها یا دایره‌های رنگی را نداشت، کاری انجام نده
    if (!mainImage || !hoverImage || colorSwatches.length === 0) {
      return;
    }

    // منطق تغییر عکس با کلیک روی رنگ (فقط دسکتاپ)
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', (event) => {
        // این قابلیت فقط روی دسکتاپ (عرض بیشتر از 768px) کار می‌کند
        if (window.innerWidth < 768) {
          return;
        }

        // آدرس‌های جدید را از data attribute می‌خواند
        const newMainSrc = swatch.dataset.mainImage;
        const newHoverSrc = swatch.dataset.hoverImage;

        // آدرس عکس‌های کارت را به‌روزرسانی می‌کند
        if (newMainSrc) {
          mainImage.src = newMainSrc;
        }
        if (newHoverSrc) {
          hoverImage.src = newHoverSrc;
        }
      });
    });
  });
});