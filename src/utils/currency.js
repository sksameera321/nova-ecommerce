/**
 * NOVA Atelier – Currency Utility (INR ₹)
 * Standardizes currency conversions and Indian numbering system formatting
 * Developer: Sameera Bhanu
 */

export const USD_TO_INR_RATE = 85;
export const FREE_SHIPPING_THRESHOLD_INR = 5000;
export const STANDARD_SHIPPING_FEE_INR = 499;
export const GST_RATE = 0.18; // 18% Luxury Goods & Services Tax

/**
 * Converts USD price to INR
 * @param {number} usdAmount
 * @returns {number}
 */
export const convertToINR = (usdAmount) => {
  const num = Number(usdAmount) || 0;
  return Math.round(num * USD_TO_INR_RATE);
};

/**
 * Formats an amount into Indian Rupee format (e.g. ₹7,649 or ₹1,25,000)
 * @param {number} amount
 * @param {Object} options
 * @returns {string}
 */
export const formatINR = (amount, options = {}) => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: options.decimals ?? 0
  }).format(num);
};
