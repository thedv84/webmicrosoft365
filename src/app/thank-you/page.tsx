
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ThankYouPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [productName, setProductName] = useState<string>('Sản phẩm đã mua'); // Default
  const [totalAmount, setTotalAmount] = useState<string | null>(null);

  useEffect(() => {
    // Extract parameters from the URL
    setOrderId(searchParams.get('orderId'));
    setTotalAmount(searchParams.get('totalAmount'));
    
    // For product name, we'll try to get it from a potential 'cart' parameter,
    // or use a generic one if not available.
    const cartParam = searchParams.get('cart');
    if (cartParam) {
      try {
        const cartItems = JSON.parse(cartParam);
        if (cartItems && cartItems.length > 0) {
          // Join names of all products in the cart
          setProductName(cartItems.map((item: any) => item.name).join(', '));
        }
      } catch (error) {
        console.error("Failed to parse cart items for thank you page", error);
      }
    }
  }, [searchParams]);

  // Reconstruct the full URL to the previous payment status page
  const paymentStatusUrl = `/payment-status?${searchParams.toString()}`;

  const formatCurrency = (amount: string | null) => 
    amount ? Number(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 VNĐ';

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
        {/* Checkmark icon */}
        <div className="flex items-center justify-center mb-6">
          <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-6">Trân trọng Cảm ơn Quý khách!</h1>
        <p className="text-gray-600 text-lg mb-8">
          Quý khách đã thực hiện xác nhận thanh toán cho đơn hàng. Nhân viên của chúng tôi sẽ kiểm tra tài khoản và gửi mã bản quyền đến quý khách trong thời gian sớm nhất.
        </p>

        {/* Order Information Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Thông tin đơn hàng:</h2>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-gray-700">
            <span className="font-medium">Mã đơn hàng:</span>
            <span className="text-right font-semibold">{orderId || 'N/A'}</span>

            <span className="font-medium">Sản phẩm:</span>
            <span className="text-right font-semibold">{productName || 'N/A'}</span>

            <span className="font-medium">Tổng tiền:</span>
            <span className="text-right font-bold text-orange-600">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        {/* Instructions and Warnings */}
        <p className="text-gray-600 mb-4">
          Nếu quý khách đã thanh toán và không nhận được mã qua SMS hoặc email trong vòng 5 phút, vui lòng kiểm tra lại mục Tin nhắn trên điện thoại và mục thư mục Spam (Thư rác) hoặc liên hệ với bộ phận hỗ trợ của chúng tôi qua số <span className="font-semibold text-teal-600">0978692048</span> để được hỗ trợ ngay lập tức.
        </p>
        <p className="text-gray-600 mb-8">
          Trong trường hợp việc thanh toán của quý khách chưa thành công, quý khách vui lòng quay lại trang thanh toán để thực hiện thanh toán.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href={paymentStatusUrl} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
            Quay lại Trang thanh toán
          </Link>
          <Link href="/" className="border border-gray-300 text-gray-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
            Đi đến trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function ThankYouPage() {
  return (
    <React.Suspense
      fallback={
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
          <div className="text-center text-gray-700">Đang tải trang cảm ơn...</div>
        </div>
      }
    >
      <ThankYouPageContent />
    </React.Suspense>
  );
}
