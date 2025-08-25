import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


var swiper = new Swiper('.swiper-container', {
  loop: true,
  // Base settings (for mobile)
  slidesPerView: 1.25,
  centeredSlides: true,
  spaceBetween: 16,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
   // Responsive breakpoints
  breakpoints: {
      // when window width is >= 768px
      768: {
          slidesPerView: 2.5,
          spaceBetween: 20,
          centeredSlides: false,
      },
      // when window width is >= 1024px
      1024: {
          slidesPerView: 3.5,
          spaceBetween: 24,
          centeredSlides: false,
      }
  }
});

// Desktop gallery logic
document.addEventListener('DOMContentLoaded', function() {
  const mainImage = document.getElementById('main-image');
  if (mainImage) { // Run only if desktop gallery exists
      const thumbnails = document.querySelectorAll('.thumbnail-img');
      const nextBtn = document.getElementById('desktop-next-btn');
      const prevBtn = document.getElementById('desktop-prev-btn');
      let currentIndex = 0;

      function updateGallery(newIndex) {
          // Update main image src
          mainImage.src = thumbnails[newIndex].src.replace('120x150', '600x800');
          
          // Update active thumbnail styles
          thumbnails.forEach((t, index) => {
              t.classList.toggle('border-black-200', index === newIndex);
              t.classList.toggle('opacity-100', index === newIndex);
              t.classList.toggle('border-transparent', index !== newIndex);
              t.classList.toggle('opacity-60', index !== newIndex);
          });
          currentIndex = newIndex;
      }

      thumbnails.forEach((thumb, index) => {
          thumb.addEventListener('click', function() {
              updateGallery(index);
          });
      });
      
      if (nextBtn && prevBtn) {
          nextBtn.addEventListener('click', function() {
              let nextIndex = (currentIndex + 1) % thumbnails.length;
              updateGallery(nextIndex);
          });

          prevBtn.addEventListener('click', function() {
              let prevIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
              updateGallery(prevIndex);
          });
      }
  }
});









// @@full screen slider
document.addEventListener('DOMContentLoaded', function() {
  const galleryModal = document.getElementById('gallery-modal');
  const openModalButtons = document.querySelectorAll('.open-gallery-modal');
  const closeModalButtons = [
      document.getElementById('modal-close-btn-mobile'),
      document.getElementById('modal-close-btn-desktop')
  ];
  const mainModalImage = document.getElementById('modal-main-image');
  const mobileThumbnailContainer = document.getElementById('modal-thumbnail-container-mobile');
  const desktopThumbnailContainer = document.getElementById('modal-thumbnail-container-desktop');
  const nextBtn = document.getElementById('modal-next-btn');
  const prevBtn = document.getElementById('modal-prev-btn');

  let imageSources = [];
  let currentIndex = 0;

  function gatherImageSources() {
      const sources = new Set();
      document.querySelectorAll('.swiper-slide img, .thumbnail-img').forEach(img => {
          let src = img.src;
          if (src.includes('120x150')) {
              src = src.replace('120x150', '600x800');
          }
          sources.add(src);
      });
      imageSources = Array.from(sources);
  }
  
  function buildModalThumbnails() {
      mobileThumbnailContainer.innerHTML = '';
      desktopThumbnailContainer.innerHTML = '';
      imageSources.forEach((src, index) => {
          // --- Create Mobile Thumbnail ---
          const mobileThumbWrapper = document.createElement('div');
          mobileThumbWrapper.className = 'p-1 border-2 border-transparent rounded-2xl cursor-pointer transition-all';
          const mobileThumbImg = document.createElement('img');
          mobileThumbImg.src = src.replace('600x800', '120x150');
          mobileThumbImg.className = 'w-full h-auto aspect-square object-cover rounded-xl';
          mobileThumbWrapper.appendChild(mobileThumbImg);
          mobileThumbWrapper.addEventListener('click', () => showImage(index));
          mobileThumbnailContainer.appendChild(mobileThumbWrapper);

          // --- Create Desktop Thumbnail ---
          const desktopThumbWrapper = document.createElement('div');
          desktopThumbWrapper.className = 'p-1 border-2 border-transparent rounded-3xl cursor-pointer transition-all bg-white';
          const desktopThumbImg = document.createElement('img');
          desktopThumbImg.src = src.replace('600x800', '120x150');
          desktopThumbImg.className = 'w-24 h-24 object-cover rounded-2xl';
          desktopThumbWrapper.appendChild(desktopThumbImg);
          desktopThumbWrapper.addEventListener('click', () => showImage(index));
          desktopThumbnailContainer.appendChild(desktopThumbWrapper);
      });
  }

  function showImage(index) {
      if (index < 0 || index >= imageSources.length) return;
      
      currentIndex = index;
      mainModalImage.src = imageSources[currentIndex];

      // Update Mobile Thumbnails
      mobileThumbnailContainer.querySelectorAll('div').forEach((wrapper, i) => {
          wrapper.classList.toggle('border-black-200', i === currentIndex);
          wrapper.classList.toggle('opacity-50', i !== currentIndex);
      });

      // Update Desktop Thumbnails
      desktopThumbnailContainer.querySelectorAll('div').forEach((wrapper, i) => {
          wrapper.classList.toggle('border-black-200', i === currentIndex);
          wrapper.classList.toggle('opacity-40', i !== currentIndex);
      });
  }

  openModalButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          e.preventDefault();
          const parentElement = button.closest('.swiper-slide, .relative');
          const clickedImgSrc = parentElement ? parentElement.querySelector('img').src : imageSources[0];
          const startIndex = imageSources.findIndex(src => src === clickedImgSrc);
          
          showImage(startIndex >= 0 ? startIndex : 0);
          galleryModal.classList.remove('hidden');
          galleryModal.classList.add('flex');
      });
  });

  closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
          galleryModal.classList.add('hidden');
          galleryModal.classList.remove('flex');
      });
  });

  nextBtn.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % imageSources.length;
      showImage(nextIndex);
  });

  prevBtn.addEventListener('click', () => {
      const prevIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
      showImage(prevIndex);
  });
  
  gatherImageSources();
  buildModalThumbnails();
});