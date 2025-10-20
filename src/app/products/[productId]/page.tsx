// src/app/products/[productId]/page.tsx
import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PRICING_PLANS } from '@/data/plans';
import ProductDetailPricingBar from '@/components/products/ProductDetailPricingBar';

interface PageProps {
  params: { productId: string };
}

export async function generateStaticParams() {
  return PRICING_PLANS.map(p => ({ productId: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const plan = PRICING_PLANS.find(p => p.id === params.productId);
  if (!plan) return { title: 'Sản phẩm không tồn tại' };
  return {
    title: `${plan.name} — Chi tiết sản phẩm`,
    description: plan.shortDescription || plan.mainDownloadDescription || plan.name,
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const plan = PRICING_PLANS.find(p => p.id === params.productId);
  if (!plan) return notFound();

  const osText = 'Windows® | macOS® | Android™ | iOS®';

  const Check = () => (
    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero (Image 1) */}
        <section className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 flex justify-center">
              {plan.productImage && (
                <Image
                  src={plan.productImage}
                  alt={`${plan.name} box`}
                  width={320}
                  height={380}
                  className="object-contain"
                />
              )}
            </div>
            <div className="md:col-span-2">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{plan.name}</h1>
              <div className="text-gray-500 mb-4">{osText}</div>
              {(plan.mainDownloadDescription || plan.shortDescription) && (
                <p className="text-gray-700 leading-7 mb-6">
                  {plan.mainDownloadDescription || plan.shortDescription}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Tính năng nổi bật:</h3>
                  <ul className="space-y-2">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start text-gray-700"><Check /> <span>{f}</span></li>
                    ))}
                  </ul>
                </div>
                {plan.audience && plan.audience.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Ai nên dùng?</h3>
                    <ul className="space-y-2">
                      {plan.audience.map((a, i) => (
                        <li key={i} className="flex items-start text-gray-700"><Check /> <span>{a}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing bar (Image 2) */}
        <section className="container mx-auto px-4 pb-12">
          <ProductDetailPricingBar plan={plan} />
          <p className="mt-3 text-sm text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Đảm bảo hoàn tiền trong vòng 30 ngày
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

