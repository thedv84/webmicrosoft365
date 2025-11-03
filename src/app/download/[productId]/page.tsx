import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PRICING_PLANS } from '@/data/plans';

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default async function DownloadDetailPage({ params }: PageProps) {
  const { productId } = await params;
  const paramId = decodeURIComponent(String(productId)).trim().toLowerCase();

  const plan = (PRICING_PLANS as any[]).find(
    (p) => String(p.id).trim().toLowerCase() === paramId
  );

  if (!plan) {
    notFound();
  }

  const description = plan.mainDownloadDescription || plan.shortDescription;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tải {plan.name}</h1>
          {description && (
            <p className="text-gray-700 mb-6">{description}</p>
          )}

          {Array.isArray(plan.downloadLinks) && plan.downloadLinks.length > 0 ? (
            <div className="space-y-3">
              {plan.downloadLinks.map((dl: any) => (
                <a
                  key={dl.os}
                  href={dl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-gray-800 hover:border-teal-500 hover:bg-teal-50"
                >
                  <span className="font-semibold">
                    {dl.label}
                  </span>
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Hiện chưa có liên kết tải xuống cho gói này.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

