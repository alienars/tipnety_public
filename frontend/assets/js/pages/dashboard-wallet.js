document.addEventListener('DOMContentLoaded', () => {

    const chargeInput = document.getElementById('charge-input');
    const confirmAmount = document.getElementById('confirm-amount');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const chargeAmountButtons = document.querySelectorAll('.charge-amount-btn');

    // Utility function to convert Persian numbers to English
    const toEnglishNumber = (str) => {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        return str.toString().split('').map(char => {
            const index = persianDigits.indexOf(char);
            return index > -1 ? englishDigits[index] : char;
        }).join('');
    };

    // Utility function to convert English numbers to Persian
    const toPersianNumber = (str) => {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        return str.toString().split('').map(char => {
            const index = englishDigits.indexOf(char);
            return index > -1 ? persianDigits[index] : char;
        }).join('');
    };

    // A single, reusable function to clean and get the numeric value.
    const getNumericValue = (str) => {
        const englishStr = toEnglishNumber(str);
        const value = parseInt(englishStr.replace(/,/g, ''), 10);
        return isNaN(value) ? 0 : value;
    };
    
    // Format the number with commas for better readability and convert to Persian
    const formatNumber = (number) => {
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return toPersianNumber(formattedNumber);
    };

    const updateDisplay = (value) => {
        const formattedValue = formatNumber(value);
        chargeInput.value = formattedValue;
        confirmAmount.textContent = formattedValue;
    };

    // Set initial value
    updateDisplay(getNumericValue(chargeInput.value));

    // Event listeners for increment/decrement buttons
    incrementBtn.addEventListener('click', () => {
        let currentValue = getNumericValue(chargeInput.value);
        currentValue += 1000;
        updateDisplay(currentValue);
    });

    decrementBtn.addEventListener('click', () => {
        let currentValue = getNumericValue(chargeInput.value);
        if (currentValue >= 1000) {
            currentValue -= 1000;
            updateDisplay(currentValue);
        }
    });

    // Event listener for charge amount buttons
    chargeAmountButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const amountSpan = event.currentTarget.querySelector('span');
            const amount = getNumericValue(amountSpan.textContent);
            updateDisplay(amount);
        });
    });

    // Update the confirm amount when the input field changes
    chargeInput.addEventListener('input', () => {
        const value = getNumericValue(chargeInput.value);
        updateDisplay(value);
    });
  });