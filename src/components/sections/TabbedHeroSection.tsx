'use client'; // This directive is needed for components with state and event handlers

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Define the possible tab values for type safety
type ActiveTab = 'home' | 'business';

const TabbedHeroSection = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  const isHomeActive = activeTab === 'home';

  return (
    <section
      className={`py-16 px-4 transition-colors duration-500 ${
        isHomeActive ? 'bg-white text-gray-800' : 'bg-[#292a2d] text-white'
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 border border-gray-300/50 rounded-full p-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                isHomeActive ? 'bg-cyan-500 text-white' : 'hover:bg-gray-500/10'
              }`}
            >
              Dành cho gia đình
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                !isHomeActive ? 'bg-cyan-500 text-white' : 'hover:bg-gray-500/10'
              }`}
            >
              Dành cho doanh nghiệp
            </button>
          </div>
        </div>

        {/* Content Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {isHomeActive ? <HomeContent /> : <BusinessContent />}
        </div>
      </div>
    </section>
  );
};

// --- Content for the "Home" Tab ---
const HomeContent = () => (
  <>
    <div className="text-center md:text-left">
      <h1 className="text-4xl font-bold mb-4 leading-tight">
        Kaspersky - Giải pháp bảo mật giúp bạn an toàn trực tuyến
      </h1>
      <p className="mb-6 text-gray-600">
        Giúp bạn luôn sử dụng internet an toàn và riêng tư cũng như giúp các thiết bị của bạn chạy mượt mà nhờ một trong các gói bảo mật dễ sử dụng, từng giành giải thưởng của chúng tôi.
      </p>
      <div className="text-sm text-gray-500 mb-8">
        Tương thích với: Windows® | macOS® | Android™ | iOS®
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
        <Link href="#homepricing"className="bg-teal-600 text-white font-bold py-3 px-8 rounded-md hover:bg-teal-700 transition-colors w-full sm:w-auto">
          Các phiên bản Kaspersky cho bạn
        </Link>
        <a href="#" className="text-teal-600 font-semibold hover:underline">
         
        </a>
      </div>
    </div>
    <div className="flex justify-center">
      <Image
        src="/images/hero-home.png"
        alt="Couple using a tablet"
        width={500}
        height={350}
        className="rounded-lg"
      />
    </div>
  </>
);

// --- Content for the "Business" Tab ---
const BusinessContent = () => (
  <>
    <div className="text-center md:text-left">
      <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
        Kasperky small office security - Bảo mật cho doanh nghiệp để ứng phó với mọi thách thức
      </h1>
      <p className="mb-6 text-gray-300">
        Bảo vệ thành quả cho tổ chức của bạn bằng tính năng bảo vệ hàng đầu trong ngành trước các mối đe dọa mạng mới và không ngừng phát triển.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
        <Link href="#ddnPricing"className="bg-teal-500 text-white font-bold py-3 px-8 rounded-md hover:bg-teal-600 transition-colors w-full sm:w-auto">
          Sản phẩm cho doanh nghiệp nhỏ
        </Link>
        <a href="#" className="text-teal-500 font-semibold hover:underline">
         
        </a>
      </div>
    </div>
    <div className="flex justify-center">
      <Image
        src="/images/hero-business.png"
        alt="Business professionals in a server room"
        width={500}
        height={350}
        className="rounded-lg"
      />
    </div>
  </>
);

export default TabbedHeroSection;