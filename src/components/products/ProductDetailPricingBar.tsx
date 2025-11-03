'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import type { Plan, PlanVariant } from '@/data/plans';

interface Props {
  plan: Plan;
}

const ProductDetailPricingBar: React.FC<Props> = ({ plan }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  // Normalize variants: prefer explicit variants, else derive from priceOptions
  const variants: PlanVariant[] = useMemo(() => {
    if (Array.isArray(plan.variants) && plan.variants.length > 0) {
      return plan.variants as PlanVariant[];
    }
    const options = (plan as any).priceOptions as Array<{
      years: number;
      devices: number;
      price: number;
      sku?: string;
    }> | undefined;
    if (!options || options.length === 0) return [] as PlanVariant[];
    return options.map((opt, idx) => ({
      id: opt.sku || String(idx),
      label: `${opt.years} năm / ${opt.devices} thiết bị`,
      originalPrice: opt.price,
      discountedPrice: opt.price,
      term: `${opt.years} năm`,
    }));
  }, [plan]);

  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0]?.id ?? '');

  const selectedVariant = useMemo(() => {
    return variants.find(v => v.id === selectedVariantId) as PlanVariant;
  }, [variants, selectedVariantId]);

  const savings = useMemo(() => {
    if (!selectedVariant) return 0;
    return selectedVariant.originalPrice > 0
      ? Math.round(
          ((selectedVariant.originalPrice - selectedVariant.discountedPrice) /
            selectedVariant.originalPrice) * 100,
        )
      : 0;
  }, [selectedVariant]);

  const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN');

  const handleBuy = () => {
    if (!selectedVariant) return;
    addToCart(plan, selectedVariant);
    router.push('/checkout');
  };

  if (!selectedVariant) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 py-6 gap-6">
      {/* Left: Name and badge (optional rating omitted for simplicity) */}
      <div className="flex items-center gap-3 w-full lg:w-auto">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
          <span className="font-bold text-2xl text-gray-800">K</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{plan.name}</h3>
        </div>
      </div>

      {/* Middle: Variant select */}
      <div className="w-full lg:max-w-xs">
        <div className="relative">
          <select
            value={selectedVariantId}
            onChange={(e) => setSelectedVariantId(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-teal-500 text-gray-800 py-3 px-4 pr-10 rounded-full focus:outline-none focus:border-teal-600"
          >
            {variants.map(v => (
              <option key={v.id} value={v.id}>{v.label}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </span>
        </div>
      </div>

      {/* Right: Price and buy */}
      <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
        <div className="text-right">
          {savings > 0 && (
            <div className="flex items-center justify-end gap-2 mb-1">
              <span className="line-through text-gray-400">{formatCurrency(selectedVariant.originalPrice)} đ</span>
              <span className="text-xs font-semibold bg-yellow-300 text-gray-900 rounded-full px-2 py-0.5">TIẾT KIỆM {savings}%</span>
            </div>
          )}
          <div className="text-4xl font-extrabold text-teal-800">
            {formatCurrency(selectedVariant.discountedPrice)}
            <span className="text-base align-super font-semibold"> đ</span>
          </div>
          <div className="text-sm text-gray-600 -mt-1">{selectedVariant.term.replace('/', '')} đầu</div>
        </div>
        <button
          onClick={handleBuy}
          className="bg-ms-orange hover:bg-ms-orangeHover text-white font-bold rounded-lg px-8 py-3 whitespace-nowrap"
        >
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPricingBar;

