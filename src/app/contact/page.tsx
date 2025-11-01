import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <section className="bg-white border-b">
          <div className="container mx-auto px-6 py-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Liên hệ</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Gửi câu hỏi về đơn hàng, thanh toán, hoặc hỗ trợ cài đặt.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
            <div className="space-y-2 text-gray-700">
              <p>Email: <a className="text-blue-600 hover:underline" href="mailto:support@example.com">supportbmb@gmail.com</a></p>
              <p>Điện thoại: <a className="text-blue-600 hover:underline" href="tel:+84000000000">0978692048</a></p>
              <p>Giờ làm việc: 8:30–22:00 (T2–CN)</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Gửi tin nhắn</h2>
            <form className="space-y-4" action="#" method="post">
              <div>
                <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                <input name="name" required className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" required className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                <textarea name="message" rows={4} required className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700">Gửi</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

