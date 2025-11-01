'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { PricingPlan } from '@/types';

export interface CartItem extends PricingPlan {
  id: string; // Use variant ID as the unique identifier
  crmProductId: string;
  name: string;
  image: string;
  unit: string;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  price: number; // backward-compat: equals discountedPrice per unit
}

interface CartContextType {
  cartItems: CartItem[];
  // Supports (plan, quantity, price) and (plan, variant)
  addToCart: (plan: PricingPlan, quantityOrVariant: number | any, price?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('shoppingCart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (plan: PricingPlan, quantity: any, price?: number) => {
    const isVariant = typeof quantity === 'object' && quantity !== null;
    const variant = isVariant ? quantity : undefined as any;
    const q = isVariant ? 1 : (Number(quantity) || 1);
    const unit = isVariant ? (variant.term || '/năm') : '/năm';
    const originalP = isVariant
      ? Number(variant?.originalPrice ?? variant?.discountedPrice ?? 0)
      : Number(price) || 0;
    const discountedP = isVariant
      ? Number(variant?.discountedPrice ?? variant?.originalPrice ?? 0)
      : Number(price) || 0;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === plan.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === plan.id ? { ...item, quantity: item.quantity + q } : item
        );
      }

      const newItem: CartItem = {
        ...plan,
        crmProductId: String((plan as any).crmProductId ?? ''),
        name: plan.name,
        image: (plan as any).productImage ?? '',
        unit,
        quantity: q,
        originalPrice: originalP,
        discountedPrice: discountedP,
        price: discountedP,
      } as unknown as CartItem;
      return [...prevItems, newItem];
    });
  };
  
  const updateQuantity = (itemId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };
  
  const removeItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
