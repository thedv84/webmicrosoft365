'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import type { Plan, PlanVariant } from '@/data/plans'; // Import Plan and PlanVariant types

// Define the props for the ProductOverviewCard component
interface ProductOverviewCardProps {
  plan: Plan; // The full plan object
}

const ProductOverviewCard: React.FC<ProductOverviewCardProps> = ({ plan }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<PlanVariant | null>(null);
    const router = useRouter();
  // Set the first variant as selected by default when the component mounts or plan changes
  useEffect(() => {
    if (plan.variants && plan.variants.length > 0) {
      setSelectedVariant(plan.variants[0]);
    }
  }, [plan]);

  const handleVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const variant = plan.variants.find(v => v.id === selectedId);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  const handleBuyNow = () => {
    if (selectedVariant) {
      addToCart(plan, selectedVariant);
      // Optionally redirect to checkout or show a confirmation
      router.push('/checkout');
    } else {
      alert("Vui lòng chọn một biến thể sản phẩm.");
    }
  };

  if (!selectedVariant) {
    return null; // Or a loading spinner
  }

  // Format price for display
  const formattedPrice = selectedVariant.discountedPrice.toLocaleString('vi-VN');

  return (
    <div id="ddnPricing" className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 py-8 relative mx-auto max-w-6xl">
      {/* Icon in top right corner */}
      <div className="absolute top-4 right-4 z-10">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
          <span className="font-bold text-2xl text-gray-800">K</span>
        </div>
      </div>

      {/* Left Section: Text Content */}
      <div className="lg:w-1/2 p-4 text-center lg:text-left">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Kaspersky <br /> Small Office Security</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto lg:mx-0">
          An ninh mạng dành cho các chủ doanh nghiệp nhỏ với rất nhiều việc cần xử lý
        </p>
        <ul className="text-gray-700 space-y-2 mb-6 text-left max-w-md mx-auto lg:mx-0">
          <li>• Được thiết kế kế đặc biệt dành riêng cho các doanh nghiệp nghiệp rất nhỏ</li>
          <li>• Đặt và quên” không yêu cầu bất kỳ kỹ năng CNTT nào</li>
          <li>• Giải pháp bảo mật dành cho máy tính, máy chủ, thiết bị di động, dữ liệu và tiền bạc</li>
        </ul>

        {/* Combobox, Price, and Buttons */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
          {/* Combobox */}
          <div className="relative w-full max-w-xs">
            <select
              onChange={handleVariantChange}
              value={selectedVariant.id}
              className="appearance-none w-full bg-gray-50 border border-teal-500 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-teal-700 shadow-sm"
            >
              {plan.variants.map(variant => (
                <option key={variant.id} value={variant.id}>
                  {variant.label} ({variant.term})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Price Display */}
          <div className="text-red-600 text-5xl font-bold mt-4">
            {formattedPrice}<span className="text-2xl align-super">đ</span> <span className="text-xl font-normal text-gray-700">{selectedVariant.term}</span>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleBuyNow}
              className="bg-teal-600 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-700 transition duration-300 shadow-md"
            >
              Mua ngay
            </button>
            <Link
              href={plan.detailsLink || '#'} // Assuming a detailsLink might exist for the plan
              className="flex items-center text-teal-600 border border-teal-600 font-bold py-3 px-8 rounded-full hover:bg-teal-50 transition duration-300"
            >
              Tìm hiểu thêm &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="lg:w-1/2 p-4 flex justify-center items-center relative z-0">
        <div className="absolute inset-0 bg-teal-50 opacity-20 transform -skew-x-12 z-0 hidden lg:block"></div>
        <Image
          src="/images/koso_original.jpg" // This image needs to be in your public/images folder
          alt="Kaspersky Small Office Security"
          width={300}
          height={200}
          className="relative z-10"
        />
      </div>
    </div>
  );
};

export default ProductOverviewCard;