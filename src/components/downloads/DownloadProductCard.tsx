// src/components/downloads/DownloadProductCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PricingPlan } from '@/types';

interface DownloadProductCardProps {
  plan: PricingPlan;
}

const DownloadProductCard: React.FC<DownloadProductCardProps> = ({ plan }) => {
  if (!plan.productImage || !plan.shortDescription) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
      <div className="flex-shrink-0">
        <Image
          src={plan.productImage}
          alt={`${plan.name} box`}
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
      <div className="flex-grow text-center md:text-left">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
        <p className="text-gray-600 mb-4">{plan.shortDescription}</p>
        <div className="flex items-center justify-center md:justify-start gap-3">
          <Link
            href={`/download/${plan.id}`}
            className="inline-flex items-center bg-teal-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-teal-700 transition duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Tải về ngay
          </Link>
          <Link
            href={`/products/${plan.id}`}
            className="inline-flex items-center bg-ms-orange text-white font-semibold py-2 px-6 rounded-md hover:bg-ms-orangeHover transition duration-300"
          >
            Mua ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DownloadProductCard;
