/**
 * Global Utility Functions
 */

// Persian digit mappings
const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/**
 * Converts English numbers to Persian numbers
 * 
 * @param {string|number} input - The number or string containing numbers to convert
 * @returns {string} The input with all English digits converted to Persian digits
 * 
 * @example
 * toPersianNumber(123) // returns "۱۲۳"
 * toPersianNumber("456") // returns "۴۵۶"
 */
export function toPersianNumber(input) {
    const str = String(input);
    return str.replace(/\d/g, (d) => PERSIAN_DIGITS[+d]);
}
