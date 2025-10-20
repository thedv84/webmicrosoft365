// src/data/checkout.ts

export interface CartItem {
  id: number;
  image: string;
  name: string;
  unit: string;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
}

export const initialCartItems: CartItem[] = [
  {
    id: 1,
    image: '/images/kaspersky-box.png', // Make sure you have this image in your public/images folder
    name: 'Kaspersky Premium',
    unit: '1 thiết bị/năm',
    quantity: 2,
    originalPrice: 636000,
    discountedPrice: 510000,
  },
  {
    id: 2,
    image: '/images/kaspersky-box.png',
    name: 'Kaspersky Premium',
    unit: '5 thiết bị/năm',
    quantity: 1,
    originalPrice: 1050000,
    discountedPrice: 820000,
  },
];