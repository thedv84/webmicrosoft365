'use client'; // This directive is needed for state and event handlers

import React, { useState } from 'react';
import Image from 'next/image';

// Define the types for our tabs for type safety
type TabID = 'protection' | 'performance' | 'easeOfUse';

// Store tab content in a structured object for clean rendering
const TABS_CONTENT = {
  protection: {
    title: 'Bảo vệ toàn diện',
    description: 'Mỗi gói của Kaspersky đều sử dụng công nghệ AI tân tiến để phát hiện và ngăn chặn mọi mối đe dọa trực tuyến – ngay cả những mối đe dọa chưa từng phát hiện. Vì vậy, mỗi khi bạn kết nối với internet, chúng tôi sẽ:',
    features: [
      'Bảo vệ quyền riêng tư của bạn bằng cách chặn các nỗ lực truy cập trái phép vào webcam của bạn hoặc theo dõi hoạt động của bạn trên các website.',
      'Bảo mật cho các khoản thanh toán của bạn trong Trình duyệt được bảo vệ chống tin tặc khi bạn mua sắm hoặc giao dịch ngân hàng trực tuyến.',
      'Ngăn những kẻ xâm nhập vào mạng của bạn và kiểm tra xem các website và email có an toàn để bạn mở không.',
    ],
    image: '/images/why-protection.webp',
  },
  performance: {
    title: 'Giúp cho các thiết bị hoạt động mượt mà',
    description: 'Giải pháp bảo mật của chúng tôi chạy liên tục trong nền, giúp bạn được bảo vệ tối đa đồng thời sử dụng lượng tài nguyên tối thiểu trên thiết bị của bạn. Các gói Kaspersky Standard, Plus và Premium liên tục giành được điểm cao nhất về hiệu năng trong các bài đánh giá độc lập. Ngoài ra, bạn có thể:',
    features: [
      'Tùy chỉnh khả năng bảo vệ của bạn bằng cách chọn các thành phần bạn muốn cài đặt và tắt chúng sau này nếu bạn đổi ý.',
      'Lên lịch quét virus để chạy khi bạn không sử dụng máy tính của mình.',
    ],
    image: '/images/why-performance.webp',
  },
  easeOfUse: {
    title: 'Không làm phiền bạn',
    description: 'Phần mềm chống virus đã bị chỉ trích trong những năm gần đây vì bản chất thâm nhập gần như phần mềm độc hại mà phần mềm này có nhiệm vụ chống lại. Nhưng chúng tôi bảo mật theo cách khác – giúp bạn nắm quyền kiểm soát. Trên một gói Kaspersky, bạn có thể:',
    features: [
      'Chọn các thông báo (nếu có) mà bạn muốn nhận từ chúng tôi.',
      'Tạm dừng tất cả các bản cập nhật và cảnh báo khi bạn đang làm việc hoặc chơi trò chơi – bằng một thiết lập duy nhất.',
    ],
    image: '/images/why-easeofuse.webp',
  },
};

const WhyKasperskySection = () => {
  const [activeTab, setActiveTab] = useState<TabID>('protection');

  const currentContent = TABS_CONTENT[activeTab];

  const CheckmarkIcon = () => (
    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  );

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Tại sao nên chọn Kaspersky?</h2>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-gray-100 rounded-full p-1.5">
            {(Object.keys(TABS_CONTENT) as TabID[]).map((tabId) => (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  activeTab === tabId ? 'bg-teal-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tabId === 'protection' && 'Bảo vệ'}
                {tabId === 'performance' && 'Hiệu suất'}
                {tabId === 'easeOfUse' && 'Dễ sử dụng'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h3 className="text-2xl font-bold mb-4">{currentContent.title}</h3>
            <p className="text-gray-600 mb-6">{currentContent.description}</p>
            <ul className="space-y-4">
              {currentContent.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckmarkIcon />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center">
            {/* The background shape is a simple div with Tailwind transforms */}
            <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-cyan-200/50 rounded-3xl transform -rotate-6"></div>
                <div className="relative">
                    <Image
                      src={currentContent.image}
                      alt={currentContent.title}
                      width={600}
                      height={450}
                      className="rounded-lg"
                    />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyKasperskySection;