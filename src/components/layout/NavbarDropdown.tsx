// src/components/layout/NavbarDropdown.tsx
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { MenuItem } from '@/config/menu'; // Import MenuItem type
import { useClickAway } from 'react-use'; // For closing dropdowns when clicking outside

// Install react-use if you haven't: npm install react-use

interface NavbarDropdownProps {
  item: MenuItem; // The parent menu item (e.g., "Sản phẩm và dịch vụ")
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useClickAway(ref, () => {
    setIsOpen(false);
  });

  // Handle opening/closing dropdown
  const handleToggle = () => setIsOpen(!isOpen);

  // Determine if it's a multi-column dropdown like "Sản phẩm và dịch vụ"
  const isMegaMenu = item.id === 'products-services';
  const columns = item.items && isMegaMenu ? item.items.length : 1; // Number of columns for mega menu

  return (
    <div ref={ref} className="relative group">
      <button
        onClick={handleToggle}
        className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200 py-2 px-3 focus:outline-none"
      >
        {item.label}
        <svg
          className={`ml-1 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && item.items && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-white rounded-lg shadow-xl py-2 z-50
            ${isMegaMenu ? 'grid gap-4 p-4 lg:grid-flow-col' : ''}`}
          style={isMegaMenu ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : {}}
        >
          {item.items.map(subItem => (
            <div key={subItem.id} className={isMegaMenu ? 'min-w-[200px]' : ''}>
              {subItem.items ? ( // If it's a category header in mega menu
                <div className="px-4 py-2 font-bold text-gray-800 text-sm">
                  {subItem.label}
                </div>
              ) : ( // Regular sub-menu item or product item
                <Link
                  href={subItem.link || '#'}
                  className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-600 rounded-md
                    ${isMegaMenu ? 'flex flex-col items-start' : ''}`}
                  onClick={() => setIsOpen(false)} // Close dropdown on item click
                >
                  <span className="font-semibold text-sm">{subItem.label}</span>
                  {subItem.isHighlight && (
                    <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                      SẢN PHẨM BÁN CHẠY NHẤT
                    </span>
                  )}
                  {subItem.description && isMegaMenu && (
                    <span className="text-xs text-gray-500 mt-0.5">{subItem.description}</span>
                  )}
                </Link>
              )}
              {/* Render nested items for mega menu sub-groups */}
              {subItem.items && isMegaMenu && (
                <div className="mt-1 space-y-1">
                  {subItem.items.map(nestedItem => (
                    <Link
                      key={nestedItem.id}
                      href={nestedItem.link || '#'}
                      className="block px-4 py-1 text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-md text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {nestedItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;