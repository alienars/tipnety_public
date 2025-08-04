/**
 * Contact page specific functionality
 * Handles branch image slider initialization
 */

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

// Required Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', () => {
    // Branch locations image slider
    const branchSlider = new Swiper('.contact-branch-slider', {
        modules: [Navigation],
        loop: true,
        navigation: {
            nextEl: '.custom-swiper-next',
            prevEl: '.custom-swiper-prev'
        },
        speed: 500,
        slidesPerView: 1,
        spaceBetween: 0,
        grabCursor: true,
        autoHeight: true
    });
});
