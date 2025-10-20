import React from 'react';

// Define the types for the component's props
interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
  isPremium?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, price, features, isPremium = false }) => (
  <div className={`border rounded-lg p-6 flex flex-col ${isPremium ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-white'}`}>
    {isPremium && <span className="text-xs font-bold bg-yellow-400 text-center py-1 rounded-t-lg -mt-6 mx-[-25px] mb-4">GIÁ TRỊ TỐT NHẤT</span>}
    
    <h3 className="text-2xl font-bold mb-4">{plan}</h3>
    <p className="text-3xl font-bold mb-6">{price}<span className="text-lg font-normal">/năm</span></p>
    
    <ul className="mb-6 space-y-2 text-left">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    <button className={`mt-auto w-full py-3 rounded-lg font-semibold transition duration-300 ${isPremium ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
      Tìm hiểu thêm
    </button>
  </div>
);

export default PricingCard;