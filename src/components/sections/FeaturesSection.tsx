import { Briefcase, Cloud, ShieldCheck, Users } from 'lucide-react';
import React from 'react';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Tính năng nổi bật của Microsoft 365</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-blue-100 rounded-full p-4">
                <Briefcase className="text-blue-600" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Ứng dụng Office cao cấp</h3>
            <p className="text-gray-600">Làm việc hiệu quả với Word, Excel, PowerPoint, Outlook và hơn thế nữa.</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-green-100 rounded-full p-4">
                <Cloud className="text-green-600" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">1 TB lưu trữ đám mây</h3>
            <p className="text-gray-600">Lưu trữ, truy cập và chia sẻ tệp, ảnh từ mọi nơi với OneDrive.</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-red-100 rounded-full p-4">
                <ShieldCheck className="text-red-600" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Bảo mật nâng cao</h3>
            <p className="text-gray-600">Bảo vệ email, tệp và dữ liệu của bạn với Microsoft Defender.</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-purple-100 rounded-full p-4">
                <Users className="text-purple-600" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Cho cả gia đình</h3>
            <p className="text-gray-600">Chia sẻ với tối đa 5 người khác và tận hưởng đầy đủ lợi ích.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

