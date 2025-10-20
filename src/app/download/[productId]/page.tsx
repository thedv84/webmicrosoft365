// src/app/download/[productId]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRICING_PLANS } from '@/data/plans';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface ProductDownloadDetailsProps {
  params: {
    productId: string;
  };
}

// Generate static params for all downloadable products
export async function generateStaticParams() {
  return PRICING_PLANS
    .filter(plan => plan.downloadLinks && plan.downloadLinks.length > 0)
    .map(plan => ({
      productId: plan.id,
    }));
}

// Generate dynamic metadata for each product page
export async function generateMetadata({ params }: ProductDownloadDetailsProps): Promise<Metadata> {
  const plan = PRICING_PLANS.find(p => p.id === params.productId);

  if (!plan) {
    return { title: 'Sản phẩm không tìm thấy' };
  }

  return {
    title: `Tải ${plan.name}`,
    description: `Tải về phần mềm bảo mật ${plan.name} cho các thiết bị của bạn.`,
  };
}

const ProductDownloadDetails: React.FC<ProductDownloadDetailsProps> = ({ params }) => {
  const plan = PRICING_PLANS.find(p => p.id === params.productId);

  if (!plan || !plan.downloadLinks || plan.downloadLinks.length === 0) {
    notFound(); // Show 404 page if product or download links are not found
  }

  // Icons mapping for different OS
  const osIcons: { [key: string]: string } = {
    windows: '/icons/windows-icon.svg',
    mac: '/icons/apple-icon.svg',
    android: '/icons/android-icon.svg',
    ios: '/icons/ios-icon.svg',
  };

  return (
    <div>
    <Header/>
    <div className="bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Tải {plan.name}</h1>

        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
          <div className="flex-shrink-0">
            {plan.productImage && (
              <Image 
                src={plan.productImage} 
                alt={`${plan.name} box`} 
                width={180} 
                height={180} 
                className="object-contain" 
              />
            )}
          </div>
          <div className="text-center md:text-left">
            <p className="text-green-600 font-semibold text-lg mb-2">Cảm ơn bạn đã tải về sản phẩm của chúng tôi</p>
            {plan.mainDownloadDescription && (
              <p className="text-gray-600 text-base">{plan.mainDownloadDescription}</p>
            )}
          </div>
        </div>

        <div className="mt-2 flex justify-center md:justify-start">
          <Link
            href={`/products/${plan?.id}`}
            className="inline-flex items-center bg-red-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-600 transition duration-300"
          >
            Mua Ngay
          </Link>
        </div>
        <div className="border-t border-gray-200 pt-8 mt-8 space-y-6">
          {plan.downloadLinks.map(link => (
            <div key={link.os} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                {osIcons[link.os] && (
                  <Image 
                    src={osIcons[link.os]} 
                    alt={`${link.os} icon`} 
                    width={40} 
                    height={40} 
                    className="mr-4"
                  />
                )}
                <span className="text-lg font-semibold text-gray-800">{link.label}</span>
              </div>
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-teal-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-teal-700 transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Tải về ngay
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
          <Footer/>
    </div>
  );
};

export default ProductDownloadDetails;
