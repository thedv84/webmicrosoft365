import { notFound } from 'next/navigation';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PRICING_PLANS } from '@/data/plans';
import ProductDetailContent from '@/components/products/ProductDetailContent';

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { productId } = await params;
  const paramId = decodeURIComponent(String(productId)).trim().toLowerCase();
  const plan = PRICING_PLANS.find((p: { id: any }) => String(p.id).trim().toLowerCase() === paramId);

  if (!plan) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <ProductDetailContent plan={plan as any} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
