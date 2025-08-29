function convertNumbers(input) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
    // Check if the input contains Persian digits
    const isPersian = [...input.toString()].some(char => persianDigits.includes(char));
  
    let output = '';
    if (isPersian) {
      // Convert Persian to English
      for (const char of input.toString()) {
        const index = persianDigits.indexOf(char);
        if (index !== -1) {
          output += englishDigits[index];
        } else {
          output += char; // Keep non-digit characters as they are
        }
      }
    } else {
      // Convert English to Persian
      for (const char of input.toString()) {
        const index = englishDigits.indexOf(char);
        if (index !== -1) {
          output += persianDigits[index];
        } else {
          output += char; // Keep non-digit characters as they are
        }
      }
    }
  
    return output;
  }

document.addEventListener('DOMContentLoaded', function () {
    // @@checkout-cart
    // Find all product cards
    const productCards = document.querySelectorAll('.product-card');

    // Add event listeners to each card
    productCards.forEach(card => {
        // پیدا کردن تمام دکمه‌های افزایش و کاهش و مقادیر در هر دو نمای موبایل و دسکتاپ
        const increaseBtns = card.querySelectorAll('.increase-btn');
        const decreaseBtns = card.querySelectorAll('.decrease-btn');
        const quantityValues = card.querySelectorAll('.quantity-value');
        
        // پیدا کردن دکمه حذف
        const removeBtns = card.querySelectorAll('.remove-btn');

        // اختصاص Event Listener به تمام دکمه‌های افزایش
        increaseBtns.forEach((increaseBtn, index) => {
            increaseBtn.addEventListener('click', () => {
                let quantity = convertNumbers(quantityValues[index].textContent)
                quantity = parseInt(quantity);
                quantity++;
                quantity = convertNumbers(quantity)
                quantityValues[index].textContent = quantity;
            });
        });

        // اختصاص Event Listener به تمام دکمه‌های کاهش
        decreaseBtns.forEach((decreaseBtn, index) => {
            decreaseBtn.addEventListener('click', () => {
                let quantity = convertNumbers(quantityValues[index].textContent)
                quantity = parseInt(quantity);
                if (quantity > 1) {
                    quantity--;
                    quantity = convertNumbers(quantity)
                    quantityValues[index].textContent = quantity;
                }
            });
        });
        
        // اختصاص Event Listener به تمام دکمه‌های حذف
        removeBtns.forEach(removeBtn => {
            removeBtn.addEventListener('click', () => {
                card.remove();
                console.log('Product removed!');
            });
        });
    });




    // @@checkout-addr
    // ============== Modal Logic ==============
    const openModalBtn = document.getElementById('openModalBtn');
    const addressModal = document.getElementById('addressModal');
    const modalContent = document.getElementById('modalContent');
    const closeButtons = document.querySelectorAll('.js-close-modal');
    const cancelBtn = document.getElementById('cancelBtn');
    const submitBtn = document.getElementById('submitBtn');

    // --- Check if modal elements exist before adding listeners ---
    if (openModalBtn && addressModal && modalContent && cancelBtn && submitBtn) {
        const openModal = () => {
            addressModal.classList.remove('opacity-0', 'pointer-events-none');
            modalContent.classList.remove('scale-95');
        };
        
        const closeModal = () => {
            addressModal.classList.add('opacity-0', 'pointer-events-none');
            modalContent.classList.add('scale-95');
        };

        openModalBtn.addEventListener('click', openModal);
        closeButtons.forEach(button => button.addEventListener('click', closeModal));
        cancelBtn.addEventListener('click', closeModal);
        
        addressModal.addEventListener('click', (e) => {
            if (e.target === addressModal) {
                closeModal();
            }
        });

        submitBtn.addEventListener('click', () => {
            console.log('Form submitted!');
            closeModal();
        });
    }

    // ============== Address Selection Logic ==============
    const addressCards = document.querySelectorAll('.address-card');

    // --- Check if address cards exist before adding listeners ---
    if (addressCards.length > 0) {
        function selectCard(cardToSelect) {
            addressCards.forEach(card => {
                const selectionArea = card.querySelector('.selection-area');
                const radioUnchecked = card.querySelector('.radio-unchecked');
                const radioChecked = card.querySelector('.radio-checked');

                // Reset styles to default
                card.classList.remove('border-2', 'border-[#fcb108]', 'selected');
                card.classList.add('border', 'border-[#ebebeb]');
                
                if (selectionArea) {
                    selectionArea.classList.remove('bg-[#fff7e6]');
                    selectionArea.classList.add('bg-[#f5f5f6]');
                }
                
                if (radioUnchecked) radioUnchecked.classList.remove('hidden');
                if (radioChecked) radioChecked.classList.add('hidden');
            });

            // Now, select the clicked card
            const selectedSelectionArea = cardToSelect.querySelector('.selection-area');
            const selectedRadioUnchecked = cardToSelect.querySelector('.radio-unchecked');
            const selectedRadioChecked = cardToSelect.querySelector('.radio-checked');
            
            cardToSelect.classList.add('border-2', 'border-[#fcb108]', 'selected');
            cardToSelect.classList.remove('border', 'border-[#ebebeb]');

            if (selectedSelectionArea) {
                selectedSelectionArea.classList.add('bg-[#fff7e6]');
                selectedSelectionArea.classList.remove('bg-[#f5f5f6]');
            }
            
            if (selectedRadioUnchecked) selectedRadioUnchecked.classList.add('hidden');
            if (selectedRadioChecked) selectedRadioChecked.classList.remove('hidden');
        }

        addressCards.forEach(card => {
            card.addEventListener('click', () => {
                selectCard(card);
            });
        });
    }





    // @@checkout-pay
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(opt => {
                opt.classList.remove('border-1', 'border-[#fcb108]');
                opt.classList.add('border', 'border-[#ebebeb]');
                opt.querySelector('.checked-icon').classList.add('hidden');
                opt.querySelector('.unchecked-icon').classList.remove('hidden');
            });
            
            option.classList.add('border-1', 'border-[#fcb108]');
            option.classList.remove('border', 'border-[#ebebeb]');
            option.querySelector('.checked-icon').classList.remove('hidden');
            option.querySelector('.unchecked-icon').classList.add('hidden');
        });
    });

    // --- اسکریپت برای سوییچ کیف پول ---
    const walletToggle = document.getElementById('wallet-toggle');
    const walletToggleCircle = document.getElementById('wallet-toggle-circle');

    walletToggle.addEventListener('click', () => {
        const isToggledOn = walletToggle.classList.contains('bg-[#fcb108]');

        if (isToggledOn) {
            // خاموش کردن
            walletToggle.classList.remove('bg-[#fcb108]');
            walletToggle.classList.add('bg-[#e1e0e3]');
            // UPDATED: حرکت به راست (موقعیت اولیه در حالت RTL)
            walletToggleCircle.classList.remove('-translate-x-5');
            walletToggleCircle.classList.add('translate-x-0');
        } else {
            // روشن کردن
            walletToggle.classList.add('bg-[#fcb108]');
            walletToggle.classList.remove('bg-[#e1e0e3]');
            // UPDATED: حرکت به چپ با مقدار منفی برای RTL
            walletToggleCircle.classList.add('-translate-x-5');
            walletToggleCircle.classList.remove('translate-x-0');
        }
    });


});