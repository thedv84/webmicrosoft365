import type { NextPage } from 'next';
import Head from 'next/head';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import PricingSection from '@/components/sections/PricingSection';
import FeaturesSection from '@/components/sections/FeaturesSection';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Microsoft 365 - Hoàn thành mọi việc</title>
        <meta name="description" content="Trang web bán sản phẩm Microsoft 365 chính hãng" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <PricingSection />
          <FeaturesSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;

