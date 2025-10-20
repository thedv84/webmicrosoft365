// src/app/download/page.tsx
import React from 'react';
import { PRICING_PLANS } from '@/data/plans';
import DownloadProductCard from '@/components/downloads/DownloadProductCard';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export const metadata = {
  title: 'Tải phần mềm Kaspersky',
  description: 'Tải về các sản phẩm bảo mật Kaspersky cho máy tính, điện thoại, và doanh nghiệp.',
};

const DownloadPage: React.FC = () => {
  // Filter plans to only show those that have a shortDescription and productImage
  // and are relevant for a general download page.
  const downloadablePlans = PRICING_PLANS.filter(plan => 
    plan.productImage && plan.shortDescription && plan.downloadLinks && plan.downloadLinks.length > 0
  );

  return (
    <div>
      <Header />
    <div className="bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Tải Kaspersky</h1>
        <div className="space-y-6">
          {downloadablePlans.map(plan => (
            <DownloadProductCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
        <Footer />
    </div>
  );
};

export default DownloadPage;