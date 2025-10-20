'use client';

import React, { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

// Data for payment options
const paymentOptions = [
  { id: 'qr', label: 'Quét mã QR ' },
  { id: 'bank', label: 'Chuyển khoản qua tài khoản ngân hàng' },

];

const CheckoutForms = () => {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    companyAddress: '',
    taxCode: '',
  });
  const [wantInvoice, setWantInvoice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State to track the selected payment method, default to 'qr'
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('qr');

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);
  }, [cartItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống.");
      return;
    }
    setIsSubmitting(true);

    const mainItem = cartItems[0];
    // Add selectedPaymentMethod to the payload
  const payload = {
      ...formData,
      cartItems: cartItems, // Send the entire array of items
      totalPrice: totalPrice, // The grand total is still needed
      paymentMethod: selectedPaymentMethod,
    };

    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok) {
        clearCart();
        window.location.href = data.redirectUrl;
      } else {
        throw new Error(data.error || 'An unknown error occurred.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Customer Information Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Thông tin khách hàng</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Họ và Tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text" id="name" name="name" value={formData.name} onChange={handleInputChange}
              required placeholder="Nguyễn Văn A"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Địa chỉ Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}
              required placeholder="you@example.com"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Số Điện Thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange}
              required placeholder="09xxxxxxxx"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" />
          </div>
          
          <div className="pt-2">
            <label className="inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={wantInvoice}
                onChange={(e) => setWantInvoice(e.target.checked)}
                className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <span className="ml-2 font-medium text-gray-800">Tôi muốn lấy hóa đơn tài chính (VAT)</span>
            </label>

            {/* --- FIX: CONDITIONAL RENDERING --- */}
            {/* This block will only appear if `wantInvoice` is true */}
            {wantInvoice && (
              <div className="mt-4 space-y-4 border-t border-dashed pt-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Tên công ty</label>
                  <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required={wantInvoice} placeholder="Tên công ty đầy đủ" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                </div>
                <div>
                  <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">Địa chỉ công ty</label>
                  <input type="text" id="companyAddress" name="companyAddress" value={formData.companyAddress} onChange={handleInputChange} required={wantInvoice} placeholder="Địa chỉ đăng ký kinh doanh" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                </div>
                <div>
                  <label htmlFor="taxCode" className="block text-sm font-medium text-gray-700">Mã số thuế</label>
                  <input type="text" id="taxCode" name="taxCode" value={formData.taxCode} onChange={handleInputChange} required={wantInvoice} placeholder="Mã số thuế công ty" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Thông tin thanh toán</h2>
        
        {/* --- DYNAMIC PAYMENT OPTIONS --- */}
        <div className="space-y-3">
          {paymentOptions.map(option => (
            <div
              key={option.id}
              className={`border rounded-lg p-3 flex items-center cursor-pointer transition-colors ${
                selectedPaymentMethod === option.id
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPaymentMethod(option.id)}
            >
              <input
                type="radio"
                name="payment"
                id={option.id}
                value={option.id}
                checked={selectedPaymentMethod === option.id}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor={option.id} className="ml-3 font-semibold text-gray-800 cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <div className="border-t pt-4">
            <p className="text-lg font-semibold text-gray-700">Thành tiền:</p>
            <p className="text-3xl font-bold text-red-600">{totalPrice.toLocaleString('vi-VN')} VNĐ</p>
          </div>
          <div className="flex justify-between mt-4">
            <button type="button" onClick={() => router.back()} className="border border-gray-300 px-8 py-3 rounded-md font-semibold hover:bg-gray-100">
              &larr; Quay lại
            </button>
            <button type="submit" disabled={isSubmitting || cartItems.length === 0} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-bold disabled:bg-gray-400">
              {isSubmitting ? 'Đang xử lý...' : 'HOÀN TẤT & THANH TOÁN'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForms;