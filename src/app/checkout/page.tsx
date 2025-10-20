import React from 'react';
import type { NextPage } from 'next';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutForms from '@/components/checkout/CheckoutForms';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CheckoutPage: NextPage = () => {
  return (
    <div>
    <Header />
    <div className="bg-teal-50/50 min-h-screen py-12">
        
      <div className="container mx-auto px-4 space-y-8">
      
        <OrderSummary />
        <CheckoutForms />
        
      </div>
     
    </div>
     <Footer />
    </div>
  );
};

export default CheckoutPage;