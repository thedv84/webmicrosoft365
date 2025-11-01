import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Sản phẩm</h3>
            <ul>
              <li className="mb-2"><a href="/products/personal" className="hover:underline">Microsoft 365 Personal</a></li>
              <li className="mb-2"><a href="/products/family" className="hover:underline">Microsoft 365 Family</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Tài nguyên</h3>
            <ul>
              <li className="mb-2"><a href="/download" className="hover:underline">Tải xuống</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Blog</a></li>
              <li className="mb-2"><a href="/support" className="hover:underline">Câu hỏi thường gặp</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Về chúng tôi</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Giới thiệu</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Liên hệ:</h3>
            <span>
              Công ty TNHH Thương mại và Dịch vụ Công nghệ BMB<br />
              Địa chỉ: Yên Hòa - Cầu Giấy - Hà Nội <br />
              Điện thoại: 0978692048
            </span>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2025 Thiết kế bởi BMB</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
