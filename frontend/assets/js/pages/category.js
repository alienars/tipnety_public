import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ===== SORT DROPDOWN FUNCTIONALITY =====
const sortWrapper = document.getElementById('sort-dropdown-wrapper');
const sortButton = document.getElementById('sort-dropdown-button');
const sortMenu = document.getElementById('sort-dropdown-menu');
const sortLabel = document.getElementById('sort-dropdown-label');

if (sortButton && sortMenu && sortWrapper && sortLabel) {
  // Toggle sort menu on button click
  sortButton.addEventListener('click', (event) => {
    event.stopPropagation();
    sortMenu.classList.toggle('hidden');
  });

  // Close menu when clicking outside
  window.addEventListener('click', (event) => {
    if (!sortWrapper.contains(event.target)) {
      sortMenu.classList.add('hidden');
    }
  });

  // Handle sort option selection
  sortMenu.addEventListener('click', (event) => {
    const targetLink = event.target.closest('a');
    if (targetLink && targetLink.dataset.sort) {
      event.preventDefault();
      sortLabel.textContent = targetLink.dataset.sort;
      sortMenu.classList.add('hidden');
    }
  });
}

// ===== FILTER SECTIONS ACCORDION =====
document.querySelectorAll('.filter-section').forEach(sec => {
  const header = sec.querySelector('.filter-header');
  const body = sec.querySelector('.filter-body');
  header?.addEventListener('click', () => {
    const willOpen = !sec.classList.contains('open');
    sec.classList.toggle('open', willOpen);
    body.classList.toggle('hidden', !willOpen);
  });
});

// ===== FILTER SEARCH FUNCTIONALITY =====
function filterList(inputEl, listEl) {
  const q = (inputEl.value || '').trim().toLocaleLowerCase('fa');
  listEl.querySelectorAll('li').forEach(li => {
    const text = (li.textContent || '').toLocaleLowerCase('fa');
    li.style.display = text.includes(q) ? '' : 'none';
  });
}

// Initialize search for all filter inputs
document.querySelectorAll('input[data-search]').forEach(inp => {
  const key = inp.getAttribute('data-search');
  const list = inp.closest('.filter-body,.panel')?.querySelector(`[data-list="${key}"]`);
  if (!list) return;
  inp.addEventListener('input', () => filterList(inp, list));
});

// ===== PRICE RANGE SLIDER FUNCTIONALITY =====
function initializePriceSlider(container) {
  if (!container) return;

  const wrap = container.querySelector('.range-wrap');
  const track = container.querySelector('.range-track');
  const ranges = container.querySelectorAll('.rng');
  const numInputs = container.querySelectorAll('input[type="number"], input[type="text"][inputmode="numeric"]');

  if (!wrap || !track || ranges.length < 2 || numInputs.length < 2) {
    return;
  }

  const [rmin, rmax] = ranges;
  const [nmin, nmax] = numInputs;

  // Convert inputs to text type for comma formatting
  [nmin, nmax].forEach(n => {
    try { if (n.type !== 'text') n.type = 'text'; } catch (_) { }
    n.setAttribute('inputmode', 'numeric');
  });

  // Range constants
  const MIN = 0, MAX = 5000000, STEP = 50000;

  // Helper functions for number conversion and formatting
  const toEn = s => String(s).replace(/[\u06F0-\u06F9]/g, ch => String(ch.charCodeAt(0) - 0x06F0)).replace(/,/g, '');
  const toFa = s => String(s).replace(/\d/g, d => String.fromCharCode(0x06F0 + Number(d)));
  const fmtFaComma = v => toFa(Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  const clampStep = v => Math.round(Math.max(MIN, Math.min(MAX, v)) / STEP) * STEP;

  // Set range input attributes
  wrap.setAttribute('dir', 'ltr');
  [rmin, rmax].forEach(r => {
    r.min = MIN; r.max = MAX; r.step = STEP;
    r.setAttribute('dir', 'ltr');
  });

  // Update visual track based on slider values
  function setTrack(a, b) {
    const left = (a - MIN) / (MAX - MIN);
    const right = 1 - ((b - MIN) / (MAX - MIN));
    track.style.setProperty('--min', left);
    track.style.setProperty('--max', right);
  }

  // Sync number inputs and track when range sliders move
  function syncFromRanges() {
    let a = Number(rmin.value);
    let b = Number(rmax.value);
    if (a > b) { [a, b] = [b, a]; rmin.value = a; rmax.value = b; }
    nmin.value = fmtFaComma(a);
    nmax.value = fmtFaComma(b);
    setTrack(a, b);
  }

  // Sync range sliders and track when number inputs change
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

  // Initial synchronization
  syncFromInputs();
}

// Initialize price sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#sec-price, [data-popover="price"], #filterDetail-price').forEach(initializePriceSlider);
});

// ===== PRODUCTS SLIDER FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
  // Update slide overlays for visual effects
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

  // Initialize Swiper slider
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

// ===== CATEGORY FILTERS LOGIC =====
(function () {
  const mqDesktop = window.matchMedia('(min-width:1024px)');
  const catalog = document.getElementById('catalog');
  const miniWrap = document.getElementById('miniFiltersWrap');
  const miniWrapSelected = document.getElementById('miniFiltersWrapSelected');
  const toggleFiltersBtns = document.querySelectorAll('[data-js="toggle-filters"]');

  // Mobile sheet elements
  const sortSheet = document.getElementById('sortSheet');
  const filterHub = document.getElementById('filterHub');
  const hubButtons = document.querySelectorAll('#hubList [data-target-sheet]');
  const detailSheets = document.querySelectorAll('.filter-detail-sheet');
  const backToHubButtons = document.querySelectorAll('[data-action="back-to-hub"]');

  // ===== HELPER FUNCTIONS =====
  function openSheet(el) { 
    if (el) { 
      el.classList.add('show'); 
      el.setAttribute('aria-hidden', 'false'); 
      document.body.style.overflow = 'hidden'; 
    } 
  }
  
  function closeSheet(el) { 
    if (el) { 
      el.classList.remove('show'); 
      el.setAttribute('aria-hidden', 'true'); 
      if (!document.querySelector('.sheet.show')) document.body.style.overflow = ''; 
    } 
  }
  
  function isDesktop() { return mqDesktop.matches; }
  
  function setSidebar(state) {
    if (!catalog) return;
    catalog.dataset.sidebar = state;
    if (miniWrap) { miniWrap.style.display = state === 'open' ? 'none' : ''; }
    if (miniWrapSelected) { miniWrapSelected.style.display = state === 'open' ? 'none' : ''; }
  }

  // ===== DESKTOP SIDEBAR TOGGLE / MOBILE SHEET OPEN =====
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

  // ===== MINI FILTER POPOVERS (DESKTOP & MOBILE) =====
  let openPop = null;
  function closePopover() { 
    if (openPop) { 
      openPop.classList.remove('show'); 
      openPop = null; 
    } 
  }

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

  // Close popovers when clicking outside or pressing Escape
  document.addEventListener('click', (e) => {
    if (!openPop) return;
    if (!e.target.closest('.popover') && !e.target.closest('[data-pop]')) closePopover();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopover(); });

  // ===== MOBILE SORT SHEET =====
  document.getElementById('mSortBtn')?.addEventListener('click', () => openSheet(sortSheet));
  sortSheet?.querySelectorAll('[data-close]')?.forEach(b => b.addEventListener('click', () => closeSheet(sortSheet)));

  // ===== MOBILE FILTER NAVIGATION =====
  // Navigate from Hub to Detail sheets
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

  // Navigate from Detail back to Hub
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

  // ===== CLONE MINI FILTERS FOR MOBILE =====
  function cloneMiniFilters() {
    const source = document.querySelector('#miniFiltersWrap .mini-filters');
    const destinations = document.querySelectorAll('.mini-filters-mobile-copy');
    if (source && destinations.length > 0) {
      initializePopovers();
    }
  }

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    cloneMiniFilters();
    setSidebar('closed');
  });

})();

// ===== EXPANDABLE TEXT FUNCTIONALITY =====
const toggleButton = document.getElementById('toggle-button');
const textContainer = document.getElementById('expandable-text-container');
const toggleText = document.getElementById('toggle-text');
const toggleIcon = document.getElementById('toggle-icon');
const fadeOverlay = document.getElementById('fade-overlay');

const collapsedHeight = textContainer.style.maxHeight || window.getComputedStyle(textContainer).maxHeight;

toggleButton.addEventListener('click', () => {
  const isExpanded = textContainer.classList.contains('expanded');

  if (isExpanded) {
    // Collapse text
    textContainer.style.maxHeight = collapsedHeight;
    toggleText.textContent = 'مشاهده بیشتر';
    toggleIcon.classList.remove('rotate-180');
    fadeOverlay.style.opacity = '1';
    textContainer.classList.remove('expanded');
  } else {
    // Expand text
    const buffer = 30;
    textContainer.style.maxHeight = (textContainer.scrollHeight + buffer) + 'px';
    toggleText.textContent = 'مشاهده کمتر';
    toggleIcon.classList.add('rotate-180');
    fadeOverlay.style.opacity = '0';
    textContainer.classList.add('expanded');
  }
});

// ===== PRODUCT CARD SIZE SELECTOR FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
  const transformWrappers = document.querySelectorAll('.transform-wrapper');

  transformWrappers.forEach(wrapper => {
    const container = wrapper.querySelector('.transform-container');
    const plusIcon = wrapper.querySelector('.plus-icon');
    const sizeOptions = wrapper.querySelector('.size-options');

    // Enable horizontal scrolling with mouse wheel
    if (sizeOptions) {
      sizeOptions.addEventListener('wheel', (event) => {
        if (sizeOptions.scrollWidth > sizeOptions.clientWidth) {
          event.preventDefault();
          sizeOptions.scrollLeft += event.deltaY;
        }
      }, { passive: false });
    }

    // Expand size selector on hover
    wrapper.addEventListener('mouseenter', () => {
      const requiredWidth = sizeOptions.scrollWidth + (2 * 12);
      const maxWidth = 220;
      const finalWidth = Math.min(requiredWidth, maxWidth);

      container.style.width = `${finalWidth}px`;
      container.classList.remove('w-12', 'rounded-full');
      container.classList.add('rounded-lg');

      plusIcon.classList.add('opacity-0', 'invisible');
      sizeOptions.classList.remove('opacity-0', 'invisible');
      sizeOptions.classList.add('opacity-100', 'visible');
    });

    // Collapse size selector on mouse leave
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

// ===== PRODUCT COLOR SWATCH FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const mainImage = card.querySelector('.product-main-image');
    const hoverImage = card.querySelector('.product-hover-image');
    const colorSwatches = card.querySelectorAll('.color-swatch');

    if (!mainImage || !hoverImage || colorSwatches.length === 0) {
      return;
    }

    // Change product images when clicking color swatches (desktop only)
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', (event) => {
        if (window.innerWidth < 768) {
          return;
        }

        const newMainSrc = swatch.dataset.mainImage;
        const newHoverSrc = swatch.dataset.hoverImage;

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