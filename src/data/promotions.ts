export interface PromoCode {
  code: string; // The code the user will type
  type: 'percent' | 'fixed'; // The type of discount
  value: number; // The discount value (e.g., 10 for 10% or 50000 for 50,000 VND)
}

// Array of available promotion codes
export const PROMO_CODES: PromoCode[] = [
  {
    code: 'GIAM10',
    type: 'percent',
    value: 10, // 10% off the subtotal
  },
  {
    code: 'KASPERSKY50K',
    type: 'fixed',
    value: 50000, // 50,000 VND flat discount
  },
  {
    code: 'SPECIAL20',
    type: 'percent',
    value: 20, // 20% off the subtotal
  },
];