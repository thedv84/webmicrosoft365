'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface ProductDetailContentProps {
  plan: any;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({ plan }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    // For Microsoft 365 plans we have priceOptions
    const price = plan?.priceOptions?.[0]?.price ?? 0;
    // Keep payload shape consistent with CartContext usage in this project
    try {
      addToCart(plan, 1, price);
    } catch (e) {
      // Fallback for alternative signature (plan + variant)
      addToCart(plan, { id: 'default', label: plan?.name ?? 'Mua', originalPrice: price, discountedPrice: price, term: '/năm' });
    }
    router.push('/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <Image
            src={plan.productImage}
            alt={`${plan.name}`}
            width={400}
            height={400}
            className="object-contain rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{plan.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{plan.shortDescription}</p>

          <div className="mb-8">
            <p className="text-4xl font-bold text-blue-600">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(plan.priceOptions?.[0]?.price ?? 0)}
              <span className="text-lg font-normal text-gray-500">/năm</span>
            </p>
          </div>

          <Button onClick={handleAddToCart} size="lg" className="w-full md:w-auto bg-ms-orange text-white hover:bg-ms-orangeHover">
            Mua ngay
          </Button>

          <div className="mt-8 text-sm text-gray-500">
            <p>Tương thích với Windows, macOS, iOS và Android.</p>
          </div>
        </div>
      </div>

      {Array.isArray(plan.features) && plan.features.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Tất cả tính năng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plan.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-1" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailContent;
