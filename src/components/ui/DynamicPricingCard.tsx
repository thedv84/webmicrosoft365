'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- Import useRouter
import { useCart } from '@/context/CartContext'; // <-- Import useCart
import type { Plan, PlanVariant } from '@/data/plans'; // Adjust path if needed

interface Props {
  plan: Plan;
}

const DynamicPricingCard: React.FC<Props> = ({ plan }) => {
  // State to hold the currently selected variant's ID
  const [selectedVariantId, setSelectedVariantId] = useState<string>(plan.variants[0].id);
    const { addToCart } = useCart(); // <-- Get addToCart function
  const router = useRouter(); // <-- Get router instance

 
  const handleBuyNow = () => {
    // Add the selected item to the global cart state
    addToCart(plan, selectedVariant);
    // Redirect to the checkout page
    router.push('/checkout');
  };

  const handleLearnMore = () => {
    if (plan?.id) {
      router.push(`/products/${plan.id}`);
    }
  };

  // Find the full variant object based on the selected ID
  const selectedVariant = plan.variants.find(v => v.id === selectedVariantId) as PlanVariant;

  // Calculate savings percentage
  const savings = selectedVariant.originalPrice > 0 
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.discountedPrice) / selectedVariant.originalPrice) * 100)
    : 0;

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN');
  };

  const CheckmarkIcon = () => (
    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
  );

  return (
    <div className={`border rounded-lg p-6 flex flex-col relative ${plan.isBestValue ? 'border-purple-600' : 'border-gray-200'}`}>
      {plan.isBestValue && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Æ¯u Ä‘Ã£i tá»‘t nháº¥t
        </div>
      )}
      
      <div className="text-center mb-4">
        <div className={`w-12 h-12 ${plan.logoColor} rounded-md flex items-center justify-center mx-auto mb-2`}>
          <span className="font-bold text-2xl text-white">K</span>
        </div>
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-xs text-gray-500">WindowsÂ® | macOSÂ® | Androidâ„¢ | iOSÂ®</p>
      </div>

      {/* START: Updated Dropdown Code */}
      <div className="mb-4 relative">
        <select
          value={selectedVariantId}
          onChange={(e) => setSelectedVariantId(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-4 pr-10 py-2 text-center appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {plan.variants.map(variant => (
            <option key={variant.id} value={variant.id}>{variant.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      {/* END: Updated Dropdown Code */}


      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2">
          {savings > 0 && <span className="text-gray-500 line-through">{formatCurrency(selectedVariant.originalPrice)}â‚«</span>}
          {savings > 0 && <span className="text-xs font-semibold bg-green-100 text-green-800 rounded-full px-2 py-0.5">Tiáº¿t kiá»‡m {savings}%</span>}
        </div>
        <p className="text-4xl font-bold my-1">
          {formatCurrency(selectedVariant.discountedPrice)}â‚« <span className="text-lg font-normal text-gray-600">{selectedVariant.term}</span>
        </p>
        {plan.promoCode && (
            <p className="text-sm text-red-600">Nháº­p mÃ£ "{plan.promoCode}" giáº£m 10%!</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 mt-1">
        <button 
          onClick={handleBuyNow}
          className="w-full text-white font-bold py-3 rounded-lg transition-colors bg-ms-orange hover:bg-ms-orangeHover">
          Mua ngay
        </button>
        <button
          onClick={handleLearnMore}
          className="w-full border font-semibold py-3 rounded-lg transition-colors text-ms-primary border-ms-primary hover:bg-ms-neutralLight">
          Tìm hiểu thêm
        </button>
      </div>

      <div className="border-t my-6"></div>

      <div>
        <h4 className="font-bold mb-3">TÃ­nh nÄƒng ná»•i báº­t:</h4>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm"><CheckmarkIcon /> {feature}</li>
          ))}
        </ul>
      </div>

      {plan.audience && (
        <div className="mt-4">
            <h4 className="font-bold mb-3">Ai nÃªn dÃ¹ng?</h4>
            <ul className="space-y-2">
            {plan.audience.map((item, index) => (
                <li key={index} className="flex items-start text-sm"><CheckmarkIcon /> {item}</li>
            ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default DynamicPricingCard;
