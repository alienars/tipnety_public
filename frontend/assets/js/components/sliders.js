/**
 * Slider Components Initialization
 * Handles all Swiper slider instances across the site
 */
export function initSliders() {
    const { Navigation, Pagination, Autoplay, EffectFade } = window.SwiperModules;

    // Initialize main hero section slider
    const heroSliderEl = document.querySelector('.hero-slider');
    if (heroSliderEl) {
        new Swiper(heroSliderEl, {
            modules: [Navigation, Pagination, Autoplay, EffectFade],
            loop: true,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            autoplay: { 
                delay: 5000, 
                disableOnInteraction: false 
            },
            pagination: { 
                el: '.swiper-pagination', 
                clickable: true 
            },
            navigation: { 
                nextEl: '.hero-slider-next', 
                prevEl: '.hero-slider-prev' 
            }
        });
    }

    // Initialize product offers slider with responsive behavior
    document.querySelectorAll('.product-slider-component').forEach(component => {
        const sliderElement = component.querySelector('.swiper.product-slider');
        if (!sliderElement) return;

        let swiperInstance = null;
        const wrapperElement = sliderElement.querySelector('.swiper-wrapper');
        const nextButton = component.querySelector('.swiper-button-next');
        const prevButton = component.querySelector('.swiper-button-prev');

        // Handle slide opacity updates for visual feedback
        const updateSlideOpacity = (swiper) => {
            if (!swiper || !swiper.slides) return;
            swiper.slides.forEach(slide => slide.style.opacity = '0.5');
            let currentSlide = swiper.slides[swiper.activeIndex];
            for (let i = 0; i < swiper.params.slidesPerView && currentSlide; i++) {
                currentSlide.style.opacity = '1';
                currentSlide = currentSlide.nextElementSibling;
            }
        };

        // Toggle between slider and grid based on screen size
        const updateSwiper = () => {
            if (window.innerWidth >= 1024) {
                if (!swiperInstance) {
                    wrapperElement.classList.remove('mobile-grid');
                    swiperInstance = new Swiper(sliderElement, {
                        modules: [Navigation],
                        direction: 'horizontal',
                        loop: true,
                        slidesPerView: 4,
                        spaceBetween: 24,
                        navigation: { 
                            nextEl: nextButton, 
                            prevEl: prevButton 
                        },
                        on: { 
                            init: updateSlideOpacity,
                            slideChange: updateSlideOpacity,
                            resize: updateSlideOpacity
                        }
                    });
                }
            } else {
                if (swiperInstance) {
                    swiperInstance.destroy(true, true);
                    swiperInstance = null;
                }
                wrapperElement.classList.add('mobile-grid');
                wrapperElement.querySelectorAll('.product-card')
                    .forEach(card => card.style.opacity = '1');
            }
        };
        
        // Initialize with appropriate layout
        if (window.innerWidth < 1024) {
            wrapperElement.classList.add('mobile-grid');
        }
        updateSwiper();
        window.addEventListener('resize', updateSwiper);
    });

    // Initialize newest products slider
    const newestEl = document.querySelector('#newest-products-slider');
    if (newestEl) {
        const swiperOptions = {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 4,
            spaceBetween: 24,
            navigation: {
                nextEl: '#newest-products-slider .swiper-button-next',
                prevEl: '#newest-products-slider .swiper-button-prev'
            },
            on: {
                init: updateNewestSlideOpacity,
                slideChange: updateNewestSlideOpacity,
                resize: updateNewestSlideOpacity
            }
        };

        // Handle opacity updates for newest products slider
        function updateNewestSlideOpacity(swiper) {
            swiper.slides.forEach(slide => slide.style.opacity = '0.5');
            let currentSlide = swiper.slides[swiper.activeIndex];
            for (let i = 0; i < swiper.params.slidesPerView && currentSlide; i++) {
                currentSlide.style.opacity = '1';
                currentSlide = currentSlide.nextElementSibling;
            }
        }

        const wrapper = newestEl.querySelector('.swiper-wrapper');
        const originalSlides = Array.from(wrapper.children)
            .map(slide => slide.cloneNode(true));
        let newestSwiper = new Swiper(
            newestEl.querySelector('.swiper'), 
            swiperOptions
        );

    document.querySelectorAll('#newest-filters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        newestSwiper.destroy(true, true);
        wrapper.innerHTML = '';
        originalSlides
            .filter(sl => filter === 'all' || sl.dataset.category === filter)
            .forEach(sl => wrapper.appendChild(sl));
        newestSwiper = new Swiper(newestEl.querySelector('.swiper'), swiperOptions);
        });
    });
    }
}
