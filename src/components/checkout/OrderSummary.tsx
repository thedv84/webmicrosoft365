'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const OrderSummary = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const subtotal = React.useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0), 
    [cartItems]
  );

  const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.round(amount));

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
      <h2 className="text-xl font-bold mb-4">Tạm tính đơn hàng</h2>
      
      <div className="hidden md:grid grid-cols-5 gap-4 mb-2 text-sm font-semibold text-gray-500">
        <div className="col-span-2">Sản phẩm</div>
        <div>Số lượng</div>
        <div className="text-right">Đơn giá</div>
        <div className="text-right">Thành tiền</div>
      </div>

      {cartItems.map(item => (
        <div key={item.id} className="grid grid-cols-5 gap-4 items-center border-t py-4">
          <div className="col-span-2 flex items-center">
            <button onClick={() => removeItem(item.id)} className="mr-4 text-gray-400 hover:text-red-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd"></path></svg>
            </button>
            <Image src={item.productImage} alt={item.name} width={64} height={64} className="rounded-md" />
            <span className="ml-4 font-semibold">{item.name}</span>
          </div>
          <div>
            <select
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>
          <div className="text-right font-semibold">{formatCurrency(item.price)}</div>
          <div className="text-right font-bold">{formatCurrency(item.price * item.quantity)}</div>
        </div>
      ))}
      
      <div className="border-t pt-6 mt-6">
        <div className="text-right">
          <p className="text-lg font-bold">Thành tiền: <span className="text-blue-600 text-2xl">{formatCurrency(subtotal)}</span></p>
          <button className="mt-4 border border-blue-600 text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-50">Tiếp tục mua sắm</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

