// src/components/layout/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { MAIN_MENU } from '@/config/menu'; // Import your menu config
import NavbarDropdown from './NavbarDropdown'; // Import the new dropdown component

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          <Image src="/images/logo.png" alt="Logo" width={150} height={50} />
        </Link>
        
        {/* Main Navigation - Hidden on small screens */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
          {MAIN_MENU.map(menuItem => (
            <React.Fragment key={menuItem.id}>
              {menuItem.items ? ( // If it has sub-items, render as a dropdown
                <NavbarDropdown item={menuItem} />
              ) : ( // Otherwise, render as a direct link
                <Link href={menuItem.link || '#'} className="text-gray-700 hover:text-green-600 transition-colors duration-200 py-2 px-3">
                  {menuItem.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Cart Icon */}
        <Link href="/checkout" className="relative flex items-center p-2 group">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-gray-600 group-hover:text-teal-600 transition-colors" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
        
        {/* Mobile menu button (you might want to add a hamburger icon and sidebar for mobile) */}
        <div className="md:hidden flex items-center">
            {/* Hamburger icon for mobile menu */}
            <button className="text-gray-600 hover:text-green-600 focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;