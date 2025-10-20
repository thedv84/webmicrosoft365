'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';
// Define the shape of a cart item for type safety
interface CartItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
}

const removeAccents = (str: string): string => {
  if (!str) return '';
  return str
    .normalize('NFD') // Decompose combined graphemes into base characters and diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd') // Manually handle 'đ'
    .replace(/Đ/g, 'D'); // Manually handle 'Đ'
};

const PaymentStatusPage = () => {
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // Read the chosen payment method from the URL
  const initialPaymentMethod = searchParams.get('paymentMethod');
  const [activePaymentMethod, setActivePaymentMethod] = useState<'qr' | 'bank'>(
    initialPaymentMethod === 'bank' ? 'bank' : 'qr' // Default to 'qr' if param is missing or invalid
  );
  // Extract data from URL parameters
  const orderId = searchParams.get('id');
  const orderHash = searchParams.get('if');
  const customerName = searchParams.get('customerName');
  const companyName = searchParams.get('companyName'); // <-- Get company name
  const customerEmail = searchParams.get('customerEmail');
  const customerPhone = searchParams.get('customerPhone');
  const totalAmount = searchParams.get('totalAmount'); // This should be the final amount after discounts
  const tentkcty = "CTY TNHH THUONG MAI VA DICH VU CONG NGHE BMB";
  const beneficiaryName = removeAccents(companyName || customerName || '');
  const router = useRouter();
  //const [activePaymentMethod, setActivePaymentMethod] = useState<'qr' | 'bank'>('qr');
  const [isOrderInfoVisible, setIsOrderInfoVisible] = useState(true);

  useEffect(() => {
    const cartParam = searchParams.get('cart');
    if (cartParam) {
      try {
        const parsedCart = JSON.parse(cartParam);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart items from URL", error);
        setCartItems([]); // Reset to empty on error
      }
    }
  }, [searchParams]);
  // Fallback / Loading state
  if (!orderId || !orderHash || !customerName || !customerEmail || !customerPhone || !totalAmount) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="text-center text-gray-700">Đang tải thông tin đơn hàng...</div>
      </div>
    );
  }

  const formatCurrency = (amount: string) => 
    Number(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  // Function to handle navigation to the Thank You page
  const handlePaymentConfirmed = () => {
     router.push(`/thank-you?${searchParams.toString()}`);
  };

  return (
    <div>

    <Header />
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      
      <div className="container mx-auto max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Order Information Section */}
        <div className="border-b border-gray-200 px-6 py-4">
          <button 
            onClick={() => setIsOrderInfoVisible(!isOrderInfoVisible)}
            className="w-full flex justify-between items-center text-left py-2 focus:outline-none"
          >
            <h2 className="text-lg font-bold text-orange-600 flex items-center">
              <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              Thông tin Đơn hàng
            </h2>
            <svg className={`w-5 h-5 transition-transform duration-300 ${isOrderInfoVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {isOrderInfoVisible && (
            <div className="mt-4 text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Khách hàng:</span>
                <span className="font-semibold text-right">
                  {customerName} - {customerPhone}<br/>
                  {customerEmail}
                </span>
              </div>
               {/* --- THE FIX IS HERE --- */}
              <div className="flex justify-between">
                <span>Sản phẩm:</span>
                <div className="font-semibold text-right">
                  {cartItems.map(item => (
                    <div key={item.id}>
                      {item.name} (SL: {item.quantity})
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-xl font-bold">Tổng tiền hàng:</span>
                <span className="text-xl font-bold text-orange-600">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Left Column: Payment Method Selection */}
          <div>
            <h3 className="text-lg font-bold mb-4">Chọn phương thức</h3>
            <div className="space-y-4">
              <button
                onClick={() => setActivePaymentMethod('qr')}
                className={`w-full text-left p-4 rounded-lg border-2 relative transition-colors duration-200 ${
                  activePaymentMethod === 'qr' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                  Khuyên dùng
                </div>
                <div className="flex items-center">
                  <Image src="/images/qr-code-icon.png" alt="QR Code" width={24} height={24} className="mr-3" />
                  <div>
                    <p className="font-semibold">Quét mã QR</p>
                    <p className="text-sm text-gray-500">{activePaymentMethod === 'qr' ? 'Đang chọn' : ''}</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActivePaymentMethod('bank')}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors duration-200 ${
                  activePaymentMethod === 'bank' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Image src="/images/bank-transfer-icon.png" alt="Bank Transfer" width={24} height={24} className="mr-3" />
                  <div>
                    <p className="font-semibold">Chuyển khoản / Ví điện tử</p>
                    <p className="text-sm text-gray-500">{activePaymentMethod === 'bank' ? 'Đang chọn' : ''}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Payment Details */}
          <div>
            <h3 className="text-lg font-bold mb-4">Chi tiết Thanh toán</h3>
            {activePaymentMethod === 'qr' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <h4 className="text-2xl font-bold text-purple-800 mb-4">THANH TOÁN BẰNG MÃ QR</h4>
                <div className="flex justify-center space-x-2 mb-4">
                
                </div>
                <p className="text-4xl font-bold text-red-600 mb-4">Tổng thanh toán: {formatCurrency(totalAmount)}</p>
                <p className="text-sm text-gray-700 mb-4">
                  Quý khách mở ứng dụng Ngân hàng, chọn <span className="font-semibold">Quét Mã QR</span> để thanh toán.
                  Chúng tôi sẽ gửi mã bản quyền Bkav Pro tới email <span className="font-semibold">{customerEmail}</span>
                  hoặc SĐT <span className="font-semibold">{customerPhone}</span> ngay sau khi nhận được thanh toán.
                </p>
                {/* Placeholder for QR Code image - This should be dynamic based on order details */}
                <Image 
                  src={`https://api.vietqr.io/image/970422-123476688-oYNSWtz.jpg?accountName=${tentkcty}&amount=${totalAmount}&addInfo=${beneficiaryName}`} 
                  alt="QR Code for Payment" 
                  width={250} 
                  height={250} 
                  className="mx-auto my-4 border border-gray-200"
                  unoptimized // Important for external/dynamic image URLs
                />
                <p className="text-xs text-gray-500 mb-4">* Nếu lỗi, thử chuyển khoản trực tiếp.</p>
                <button onClick={handlePaymentConfirmed} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300">
                  Tôi đã thực hiện thanh toán
                </button>
              </div>
            )}
            {activePaymentMethod === 'bank' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-2xl font-bold text-blue-800 mb-4">CHUYỂN KHOẢN NGÂN HÀNG</h4>
                <p className="text-lg font-semibold mb-2">Tổng thanh toán: {formatCurrency(totalAmount)}</p>
                <div className="text-gray-700 space-y-2 text-sm">
                  <p>Ngân hàng: Quân đội (MB Bank)</p>
                  <p>Số tài khoản: 123476688</p>
                  <p>Chủ tài khoản: {tentkcty}</p>
                  <p>Nội dung chuyển khoản: {beneficiaryName}</p>
                </div>
                 <p className="text-sm text-gray-700 mt-4">
                  Sau khi chuyển khoản thành công, chúng tôi sẽ gửi mã bản quyền Bkav Pro tới Email <span className="font-semibold">{customerEmail}</span> hoặc SĐT <span className="font-semibold">{customerPhone}</span>.
                </p>
                <button onClick={handlePaymentConfirmed} className="mt-6 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300">
                  Tôi đã thực hiện thanh toán
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
        <Footer />
    </div>
  );
};

export default PaymentStatusPage;