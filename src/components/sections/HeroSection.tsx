import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
  
const HeroSection = () => {
  return (
    <section className="bg-white text-center py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Sản phẩm chính hãng - Hóa đơn tài chính đầy đủ
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-gray-600">
          Chúng tôi cam kết cung cấp các gói Kaspersky chính hãng với hóa đơn tài chính đầy đủ, giúp bạn yên tâm bảo vệ thiết bị và dữ liệu cá nhân khỏi các mối đe dọa mạng hiện đại.
        </p>
        <div className="flex justify-center items-center space-x-4 mb-8 text-sm text-gray-500">
          <Image src="/images/kaspersky-3product.png" alt="QR Code" width={300} height={150} />
          </div>
        
        <Link href="#homepricing"className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition duration-300">
          Nhận ưu đãi
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;