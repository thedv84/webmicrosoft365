import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Cho gia đình</h3>
            <ul>
              <li className="mb-2"><a href="/products/standard" className="hover:underline">Kaspersky Standard</a></li>
              <li className="mb-2"><a href="/products/plus" className="hover:underline">Kaspersky Plus</a></li>
              <li className="mb-2"><a href="/products/premium" className="hover:underline">Kaspersky Premium</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Cho các thiết bị cụ thể</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Diệt virus cho Android</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Diệt virus cho Mac</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Diệt virus cho Windows</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Giải pháp cho doanh nghiệp</h3>
            <ul>
              <li className="mb-2"><a href="/products/small-office-security" className="hover:underline">Bảo mật văn phòng nhỏ</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Phát hiện và phản hồi điểm cuối</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Liên hệ với chúng tôi:</h3>
            <span>
              Công ty TNHH Thương mại và Dịch vụ Công Nghệ BMB <br />
              Địa chỉ: Ngõ 139 Nguyễn Ngọc Vũ, Trung Hòa, Cầu Giấy, Hà Nội <br />
              Điện thoại: 0978692048
            </span>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2025 Phongchongvirus.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;