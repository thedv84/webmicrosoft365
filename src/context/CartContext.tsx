'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { Plan, PlanVariant } from '@/data/plans'; // Adjust path if needed

// Define the shape of a single item in our cart
export interface CartItem {
  id: string; // Use variant ID as the unique identifier
  crmProductId: string;
  name: string;
  image: string;
  unit: string;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
}

// Define what the context will provide
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (plan: Plan, variant: PlanVariant) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
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

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (plan: Plan, variant: PlanVariant) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === variant.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === variant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const newItem: CartItem = {
          id: variant.id,
          crmProductId: variant.crmProductId, // <-- THE FIX IS HERE
          name: plan.name,
          image: '/images/kaspersky-box.png',
          unit: variant.label,
          quantity: 1,
          originalPrice: variant.originalPrice,
          discountedPrice: variant.discountedPrice
        };
        return [...prevItems, newItem];
      }
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

// Create a custom hook for easy access to the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};