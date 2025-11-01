import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <section className="bg-white border-b">
          <div className="container mx-auto px-6 py-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Hỗ trợ Microsoft 365</h1>
            <p className="text-gray-600 mt-2 max-w-3xl">
              Hướng dẫn cài đặt, kích hoạt và sử dụng Microsoft 365 trên Windows, macOS, iOS và Android. Nếu bạn cần trợ giúp thêm, hãy <Link className="text-blue-600 hover:underline" href="/contact">liên hệ chúng tôi</Link>.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-6 py-10 grid gap-8">
          {/* Bắt đầu */}
          <div id="bat-dau" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Bắt đầu nhanh</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Mua gói <Link className="text-blue-600 hover:underline" href="/products/personal">Microsoft 365 Personal</Link> hoặc <Link className="text-blue-600 hover:underline" href="/products/family">Microsoft 365 Family</Link>.</li>
              <li>Đăng nhập hoặc tạo tài khoản Microsoft (MSA) tại <a className="text-blue-600 hover:underline" href="https://account.microsoft.com" target="_blank" rel="noreferrer">account.microsoft.com</a>.</li>
              <li>Nếu có mã kích hoạt (product key), truy cập <a className="text-blue-600 hover:underline" href="https://redeem.microsoft.com" target="_blank" rel="noreferrer">redeem.microsoft.com</a> để nhập mã và gắn với tài khoản Microsoft của bạn.</li>
              <li>Tải ứng dụng tại trang <Link className="text-blue-600 hover:underline" href="/download">Tải xuống</Link> và tiến hành cài đặt.</li>
            </ol>
          </div>

          {/* Cài đặt Windows */}
          <div id="cai-dat-windows" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Cài đặt trên Windows</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Tải trình cài đặt Microsoft 365 cho Windows từ trang <Link className="text-blue-600 hover:underline" href="/download">Tải xuống</Link>.</li>
              <li>Mở file tải về (Setup.exe) và làm theo hướng dẫn trên màn hình.</li>
              <li>Sau khi cài xong, mở Word/Excel/PowerPoint và đăng nhập bằng tài khoản Microsoft đã kích hoạt.</li>
              <li>Nếu thấy thông báo “Yêu cầu kích hoạt”, hãy đảm bảo bạn đăng nhập đúng tài khoản đã đổi mã (redeem).</li>
            </ol>
          </div>

          {/* Cài đặt macOS */}
          <div id="cai-dat-macos" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Cài đặt trên macOS</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Tải bộ cài Microsoft 365 cho macOS tại <Link className="text-blue-600 hover:underline" href="/download">Tải xuống</Link>.</li>
              <li>Mở file .pkg hoặc .dmg và kéo các ứng dụng vào thư mục Applications (nếu được yêu cầu).</li>
              <li>Mở Word/Excel/PowerPoint và đăng nhập bằng tài khoản Microsoft của bạn.</li>
            </ol>
          </div>

          {/* Di động */}
          <div id="di-dong" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Cài đặt trên iOS/Android</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><a className="text-blue-600 hover:underline" href="https://play.google.com/store/apps/details?id=com.microsoft.office.officehubrow" target="_blank" rel="noreferrer">Microsoft 365 cho Android (Google Play)</a></li>
              <li><a className="text-blue-600 hover:underline" href="https://apps.apple.com/app/microsoft-365-office/id541164041" target="_blank" rel="noreferrer">Microsoft 365 cho iOS (App Store)</a></li>
            </ul>
            <p className="text-gray-700 mt-2">Đăng nhập tài khoản Microsoft để đồng bộ file với OneDrive.</p>
          </div>

          {/* Kích hoạt & đổi mã */}
          <div id="kich-hoat" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Kích hoạt và đổi mã</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Đi tới <a className="text-blue-600 hover:underline" href="https://redeem.microsoft.com" target="_blank" rel="noreferrer">redeem.microsoft.com</a>.</li>
              <li>Đăng nhập tài khoản Microsoft.</li>
              <li>Nhập product key (25 ký tự) và xác nhận quốc gia, ngôn ngữ.</li>
              <li>Sau khi đổi mã thành công, tải ứng dụng và đăng nhập để sử dụng.</li>
            </ol>
          </div>

          {/* Chia sẻ Family */}
          <div id="chia-se-family" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Chia sẻ gói Family</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Truy cập <a className="text-blue-600 hover:underline" href="https://account.microsoft.com/services" target="_blank" rel="noreferrer">account.microsoft.com/services</a>.</li>
              <li>Chọn gói Family và nhấn “Chia sẻ”.</li>
              <li>Mời tối đa 5 thành viên qua email. Thành viên cần chấp nhận lời mời bằng tài khoản Microsoft của họ.</li>
            </ol>
          </div>

          {/* Sử dụng cơ bản */}
          <div id="su-dung-co-ban" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Sử dụng cơ bản</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><span className="font-semibold">Word, Excel, PowerPoint:</span> mở ứng dụng → đăng nhập → tạo/sửa tài liệu.</li>
              <li><span className="font-semibold">Lưu vào OneDrive:</span> chọn Save/Save As → OneDrive – Personal/Family để đồng bộ đa thiết bị.</li>
              <li><span className="font-semibold">Microsoft Teams/Outlook:</span> dùng cùng tài khoản để họp và email.</li>
            </ul>
          </div>

          {/* Quản lý đăng ký */}
          <div id="quan-ly" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Quản lý tài khoản & đăng ký</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Xem trạng thái gói, gia hạn, phương thức thanh toán tại <a className="text-blue-600 hover:underline" href="https://account.microsoft.com/services" target="_blank" rel="noreferrer">account.microsoft.com/services</a>.</li>
              <li>Quản lý thiết bị đăng nhập tại <a className="text-blue-600 hover:underline" href="https://account.microsoft.com/devices" target="_blank" rel="noreferrer">account.microsoft.com/devices</a>.</li>
            </ul>
          </div>

          {/* Khắc phục sự cố */}
          <div id="khac-phuc" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Khắc phục sự cố phổ biến</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><span className="font-semibold">Yêu cầu kích hoạt:</span> đảm bảo đăng nhập đúng tài khoản đã đổi mã và có gói còn hiệu lực.</li>
              <li><span className="font-semibold">Vượt giới hạn thiết bị:</span> đăng xuất Office trên thiết bị cũ tại <a className="text-blue-600 hover:underline" href="https://account.microsoft.com/services" target="_blank" rel="noreferrer">Services & Subscriptions</a>.</li>
              <li><span className="font-semibold">Không cài đặt được:</span> gỡ cài đặt Office cũ, khởi động lại, tắt phần mềm chống virus tạm thời rồi cài lại.</li>
              <li>Vẫn lỗi? <Link className="text-blue-600 hover:underline" href="/contact">Liên hệ hỗ trợ</Link>.</li>
            </ul>
          </div>

          {/* Tải xuống nhanh */}
          <div id="tai-xuong" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Tải xuống nhanh</h2>
            <p className="text-gray-700">Chọn nền tảng của bạn:</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link className="px-4 py-2 rounded-md border text-blue-600 hover:bg-blue-50" href="/download">Windows/macOS</Link>
              <a className="px-4 py-2 rounded-md border text-blue-600 hover:bg-blue-50" href="https://play.google.com/store/apps/details?id=com.microsoft.office.officehubrow" target="_blank" rel="noreferrer">Android</a>
              <a className="px-4 py-2 rounded-md border text-blue-600 hover:bg-blue-50" href="https://apps.apple.com/app/microsoft-365-office/id541164041" target="_blank" rel="noreferrer">iOS</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
