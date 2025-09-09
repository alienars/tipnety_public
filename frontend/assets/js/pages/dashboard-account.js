document.addEventListener('DOMContentLoaded', function() {
    // Province Select
    const provinceSelectBox = document.getElementById('province-select-box');
    const provinceOptionsList = document.getElementById('province-options-list');
    const selectedProvince = document.getElementById('selected-province');
    const provinceDropdownIcon = document.getElementById('province-dropdown-icon');

    provinceSelectBox.addEventListener('click', function() {
        provinceOptionsList.classList.toggle('hidden');
        provinceDropdownIcon.classList.toggle('rotate-180');
    });

    provinceOptionsList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            const selectedValue = event.target.getAttribute('data-value');
            const selectedText = event.target.textContent;

            selectedProvince.textContent = selectedText;
            selectedProvince.dataset.value = selectedValue;

            provinceOptionsList.classList.add('hidden');
            provinceDropdownIcon.classList.remove('rotate-180');
        }
    });

    // City Select
    const citySelectBox = document.getElementById('city-select-box');
    const cityOptionsList = document.getElementById('city-options-list');
    const selectedCity = document.getElementById('selected-city');
    const cityDropdownIcon = document.getElementById('city-dropdown-icon');

    citySelectBox.addEventListener('click', function() {
        cityOptionsList.classList.toggle('hidden');
        cityDropdownIcon.classList.toggle('rotate-180');
    });

    cityOptionsList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            const selectedValue = event.target.getAttribute('data-value');
            const selectedText = event.target.textContent;

            selectedCity.textContent = selectedText;
            selectedCity.dataset.value = selectedValue;

            cityOptionsList.classList.add('hidden');
            cityDropdownIcon.classList.remove('rotate-180');
        }
    });

    // Close all dropdowns if user clicks outside
    document.addEventListener('click', function(event) {
        if (!provinceSelectBox.contains(event.target) && !provinceOptionsList.contains(event.target)) {
            provinceOptionsList.classList.add('hidden');
            provinceDropdownIcon.classList.remove('rotate-180');
        }
        if (!citySelectBox.contains(event.target) && !cityOptionsList.contains(event.target)) {
            cityOptionsList.classList.add('hidden');
            cityDropdownIcon.classList.remove('rotate-180');
        }
    });

    const checkboxes = document.querySelectorAll('.toggle-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
          const isChecked = this.getAttribute('data-checked') === 'true';
    
          if (isChecked) {
            // Change to unchecked state
            this.setAttribute('data-checked', 'false');
            this.classList.remove('bg-[#12B76A]', 'flex', 'items-center', 'justify-center');
            this.classList.add('border', 'border-[#5e5e5e]');
            this.innerHTML = '';
          } else {
            // Change to checked state
            this.setAttribute('data-checked', 'true');
            this.classList.remove('border', 'border-[#5e5e5e]');
            this.classList.add('bg-[#12B76A]', 'flex', 'items-center', 'justify-center');
            this.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2831_9348)">
<path d="M3.33337 9.33331L5.66671 11.6666L12.6667 4.33331" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2831_9348">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>`;
          }
        });
      });

});