import type { NextPage } from 'next';
import Head from 'next/head';

// These import paths work correctly thanks to the `tsconfig.json` alias.
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
//import PricingSection from '@/components/sections/PricingSection';
import WhyKasperskySection from '@/components/sections/WhyKasperskySection';
import TabbedHeroSection from '@/components/sections/TabbedHeroSection';
//import NewsSection from '@/components/sections/NewsSection';
import DynamicPricingSection from '@/components/sections/DynamicPricingSection';
import ProductOverviewCard from '@/components/sections/ProductOverviewCard';
import { PRICING_PLANS } from '@/data/plans';

const HomePage: NextPage = () => {
  const smallOfficeSecurityPlan = PRICING_PLANS.find(plan => plan.id === 'small-office-security');
  return (
    <>
      <Head>
        <title>Kaspersky - Giải pháp an ninh mạng</title>
        <meta name="description" content="Bản sao trang đích giải pháp bảo mật của Kaspersky" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          
          <TabbedHeroSection />
          
          <HeroSection />
          <WhyKasperskySection />
          <DynamicPricingSection />
          {smallOfficeSecurityPlan && <ProductOverviewCard plan={smallOfficeSecurityPlan}/>}
          
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;