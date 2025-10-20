import React from 'react';
import { PRICING_PLANS } from '@/data/plans'; // Adjust path if needed
import DynamicPricingCard from '../ui/DynamicPricingCard';

const DynamicPricingSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div id="homepricing" className="container mx-auto px-4">
        {/* We reverse the array to match the visual order in the image (Premium, Plus, Standard) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS
          .slice()
          .reverse()
          .filter(plan => plan.id !== 'small-office-security')
          .map(plan => (
            <DynamicPricingCard key={plan.id} plan={plan} />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default DynamicPricingSection;