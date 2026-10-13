import { CURRENCY } from '../config';

/**
 * Formats a number to Indian Rupees representation (e.g. ₹1,499)
 */
export function formatCurrency(amount: number): string {
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${CURRENCY}${formatted}`;
}
