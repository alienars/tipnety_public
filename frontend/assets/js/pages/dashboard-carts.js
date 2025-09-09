// Function to open the modal
function openModal() {
    const modal = document.getElementById('new-address-modal');
    modal.classList.remove('hidden');
  }
  
  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('new-address-modal');
    modal.classList.add('hidden');
  }
  
  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements
    const openButton = document.querySelector('.add-new-address-btn');
    const modalBackdrop = document.getElementById('new-address-modal');
    const closeButton = document.getElementById('close-modal-btn');
    const cancelButton = document.getElementById('cancel-btn');
    const modalContent = document.querySelector('#new-address-modal > div');
  
    // Province Select
    const provinceSelectBox = document.getElementById('province-select-box');
    const provinceOptionsList = document.getElementById('province-options-list');
    const selectedProvince = document.getElementById('selected-province');
    const provinceDropdownIcon = document.getElementById('province-dropdown-icon');
  
    // City Select
    const citySelectBox = document.getElementById('city-select-box');
    const cityOptionsList = document.getElementById('city-options-list');
    const selectedCity = document.getElementById('selected-city');
    const cityDropdownIcon = document.getElementById('city-dropdown-icon');
  
    // Event listeners for modal
    if (openButton) {
      openButton.addEventListener('click', openModal);
    }
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }
    if (cancelButton) {
      cancelButton.addEventListener('click', closeModal);
    }
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) {
          closeModal();
        }
      });
    }
    if (modalContent) {
      modalContent.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }
  
    // Event listeners for province select
    if (provinceSelectBox) {
      provinceSelectBox.addEventListener('click', () => {
        provinceOptionsList.classList.toggle('hidden');
        if (provinceDropdownIcon) {
          provinceDropdownIcon.classList.toggle('rotate-180');
        }
      });
    }
    
    if (provinceOptionsList) {
      provinceOptionsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
          const selectedValue = event.target.getAttribute('data-value');
          const selectedText = event.target.textContent;
          selectedProvince.textContent = selectedText;
          selectedProvince.dataset.value = selectedValue;
          provinceOptionsList.classList.add('hidden');
          if (provinceDropdownIcon) {
              provinceDropdownIcon.classList.remove('rotate-180');
          }
        }
      });
    }
  
    // Event listeners for city select
    if (citySelectBox) {
      citySelectBox.addEventListener('click', () => {
        cityOptionsList.classList.toggle('hidden');
        if (cityDropdownIcon) {
          cityDropdownIcon.classList.toggle('rotate-180');
        }
      });
    }
    
    if (cityOptionsList) {
      cityOptionsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
          const selectedValue = event.target.getAttribute('data-value');
          const selectedText = event.target.textContent;
          selectedCity.textContent = selectedText;
          selectedCity.dataset.value = selectedValue;
          cityOptionsList.classList.add('hidden');
          if (cityDropdownIcon) {
              cityDropdownIcon.classList.remove('rotate-180');
          }
        }
      });
    }
  
    // Close all dropdowns if user clicks outside
    document.addEventListener('click', (event) => {
      if (provinceSelectBox && !provinceSelectBox.contains(event.target) && !provinceOptionsList.contains(event.target)) {
        provinceOptionsList.classList.add('hidden');
        if (provinceDropdownIcon) {
          provinceDropdownIcon.classList.remove('rotate-180');
        }
      }
      if (citySelectBox && !citySelectBox.contains(event.target) && !cityOptionsList.contains(event.target)) {
        cityOptionsList.classList.add('hidden');
        if (cityDropdownIcon) {
          cityDropdownIcon.classList.remove('rotate-180');
        }
      }
    });
  
  });