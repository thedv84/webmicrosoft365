import React from 'react';
import PricingCard from '../ui/PricingCard';

const PricingSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Tận hưởng cuộc sống số tốt nhất của bạn</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            plan="Kaspersky Standard"
            price="Từ 240,000 đ"
            features={[
              'Bảo vệ chống virus theo thời gian thực',
              'Bảo vệ thanh toán trực tuyến',
              'Tối ưu hóa hiệu suất'
            ]}
          />
          <PricingCard
            plan="Kaspersky Plus"
            price="Từ 410,000 đ"
            features={[
              'Bảo vệ chống virus theo thời gian thực',
              'Bảo vệ thanh toán trực tuyến',
              'Tối ưu hóa hiệu suất',
              'VPN siêu nhanh không giới hạn',
              'Kiểm tra rò rỉ dữ liệu'
            ]}
          />
          <PricingCard
            plan="Kaspersky Premium"
            price="Từ 510,000 đ"
            features={[
              'Bảo vệ chống virus theo thời gian thực',
              'Bảo vệ thanh toán trực tuyến',
              'Tối ưu hóa hiệu suất',
              'VPN siêu nhanh không giới hạn',
              'Kiểm tra rò rỉ dữ liệu',
              'Bảo vệ danh tính',
              'Kiểm tra và loại bỏ virus chuyên nghiệp',
              'Kaspersky Safe Kids MIỄN PHÍ 1 NĂM'
            ]}
            isPremium
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;