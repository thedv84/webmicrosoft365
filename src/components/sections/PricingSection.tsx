'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { PRICING_PLANS } from '@/data/plans';

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const PricingSection = () => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleBuy = (planId: string) => {
    const plan = PRICING_PLANS.find((p: any) => p.id === planId);
    if (!plan) return;
    const price = plan?.priceOptions?.[0]?.price ?? 0;
    addToCart(plan, 1, price);
    router.push('/checkout');
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Chọn gói Microsoft 365 phù hợp</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Bao gồm ứng dụng Office cao cấp, 1 TB OneDrive, bảo mật nâng cao và nhiều tiện ích khác.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Personal Plan */}
          <div className="border rounded-lg p-8 bg-white shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Microsoft 365 Personal</h3>
            <p className="text-4xl font-bold mb-4">
              {formatVND(1899000)}<span className="text-lg font-normal">/năm</span>
            </p>
            <p className="text-gray-600 mb-6">Dành cho một người</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button size="lg" className="w-full bg-ms-orange text-white hover:bg-ms-orangeHover" onClick={() => handleBuy('personal')}>
                Mua ngay
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full text-ms-primary border-ms-primary hover:bg-ms-neutralLight">
                <Link href="/products/personal">Tìm hiểu thêm</Link>
              </Button>
            </div>
            <ul className="text-left mt-8 space-y-4">
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> 1 TB OneDrive</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Word, Excel, PowerPoint, OneNote</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Outlook, To Do, Skype</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Bảo mật nâng cao</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Windows, macOS, iOS, Android</li>
            </ul>
          </div>

          {/* Family Plan */}
          <div className="border rounded-lg p-8 bg-white shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Microsoft 365 Family</h3>
            <p className="text-4xl font-bold mb-4">
              {formatVND(2499000)}<span className="text-lg font-normal">/năm</span>
            </p>
            <p className="text-gray-600 mb-6">Dành cho tối đa 6 người</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button size="lg" className="w-full bg-ms-orange text-white hover:bg-ms-orangeHover" onClick={() => handleBuy('family')}>
                Mua ngay
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full text-ms-primary border-ms-primary hover:bg-ms-neutralLight">
                <Link href="/products/family">Tìm hiểu thêm</Link>
              </Button>
            </div>
            <ul className="text-left mt-8 space-y-4">
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> 6 TB OneDrive (1 TB/người)</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Word, Excel, PowerPoint, OneNote</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Outlook, To Do, Skype</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Family Safety cao cấp</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Windows, macOS, iOS, Android</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

