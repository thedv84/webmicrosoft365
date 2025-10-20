'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { PROMO_CODES, PromoCode } from '@/data/promotions'; // <-- Import promo data

const OrderSummary = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();
  
  // State for the promo code input and applied code
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');

  const subtotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0), 
    [cartItems]
  );
  
  // Calculate the discount amount based on the applied promo code
  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;

    if (appliedPromo.type === 'percent') {
      return subtotal * (appliedPromo.value / 100);
    }

    if (appliedPromo.type === 'fixed') {
      // Ensure fixed discount doesn't exceed subtotal
      return Math.min(appliedPromo.value, subtotal);
    }

    return 0;
  }, [appliedPromo, subtotal]);

  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = () => {
    setPromoError(''); // Clear previous errors
    const codeToApply = promoInput.trim().toUpperCase();
    
    const foundCode = PROMO_CODES.find(c => c.code.toUpperCase() === codeToApply);

    if (foundCode) {
      setAppliedPromo(foundCode);
      setPromoInput('');
    } else {
      setPromoError('Mã khuyến mãi không hợp lệ hoặc đã hết hạn.');
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };
  
  const formatCurrency = (amount: number) => Math.round(amount).toLocaleString('vi-VN') + ' VND';

  if (cartItems.length === 0) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục.</p>
        </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Gói sản phẩm/ Dịch vụ</h2>
      
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-6 gap-4 mb-2 text-sm font-semibold text-gray-500">
        <div className="col-span-2">Gói sản phẩm/ Dịch vụ</div>
        <div>Đơn vị tính</div>
        <div>Số lượng</div>
        <div className="text-right">Đơn giá</div>
        <div className="text-right">Thành tiền</div>
      </div>

      {/* Cart Items */}
      {cartItems.map(item => (
        <div key={item.id} className="grid grid-cols-6 gap-4 items-center border-t py-4">
          <div className="col-span-2 flex items-center">
            <button onClick={() => removeItem(item.id)} className="mr-4 text-gray-400 hover:text-red-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd"></path></svg>
            </button>
            
            <span className="ml-4 font-semibold">{item.name}</span>
          </div>
          <div className="text-sm text-gray-600">{item.unit}</div>
          <div>
            <select
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>
          <div className="text-right text-sm">
            {item.originalPrice > 0 && <span className="line-through text-gray-400">{formatCurrency(item.originalPrice)}</span>}<br/>
            <span className="font-semibold">{formatCurrency(item.discountedPrice)}</span>
          </div>
          <div className="text-right font-bold">{formatCurrency(item.discountedPrice * item.quantity)}</div>
        </div>
      ))}
      
      {/* Promo Code & Totals */}
      <div className="border-t pt-6 mt-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <p className="text-sm mb-2 text-gray-700 font-semibold">Thêm mã khuyến mãi</p>
            {!appliedPromo ? (
              <div>
                <div className="flex">
                  <input 
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Nhập mã giảm giá tại đây..."
                    className="border rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="bg-teal-600 text-white px-4 py-2 rounded-r-md font-semibold hover:bg-teal-700 whitespace-nowrap"
                  >
                    Áp dụng
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
              </div>
            ) : (
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-2">
                <p className="text-sm text-green-700">
                  Đã áp dụng mã: <span className="font-bold">{appliedPromo.code}</span>
                </p>
                <button 
                  onClick={handleRemovePromo}
                  className="text-xs font-semibold text-red-500 hover:underline"
                >
                  Xóa
                </button>
              </div>
            )}
          </div>
          <div className="text-right w-full md:w-auto">
            <p className="text-gray-600">Tạm tính: <span className="font-semibold text-black">{formatCurrency(subtotal)}</span></p>
            <p className="text-gray-600">Giảm giá: <span className="font-semibold text-black">{formatCurrency(discountAmount)}</span></p>
            <p className="text-lg font-bold">Thành tiền: <span className="text-red-600 text-2xl">{formatCurrency(finalTotal)}</span></p>
            <button className="mt-4 border border-teal-600 text-teal-600 px-6 py-2 rounded-md font-semibold hover:bg-teal-50">Mua thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;