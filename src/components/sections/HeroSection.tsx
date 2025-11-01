import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="bg-white text-center py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Microsoft 365 chính hãng — Hoàn thành mọi việc
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-gray-600">
          Bộ ứng dụng Office cao cấp, 1 TB OneDrive và bảo mật nâng cao.
          Phù hợp cho cá nhân và gia đình, chạy trên mọi thiết bị.
        </p>
        <div className="flex justify-center items-center mb-8">
          <Image src="/images/hero-home.png" alt="Microsoft 365" width={600} height={280} />
        </div>

        <Link href="#pricing" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
          Xem giá và mua
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

