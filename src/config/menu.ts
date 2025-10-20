// src/config/menu.ts

import { PRICING_PLANS } from '@/data/plans'; // Import your pricing plans

// Define the shape of a single menu item
export interface MenuItem {
  id: string;
  label: string;
  link?: string; // Optional link if it's a direct page
  items?: MenuItem[]; // Optional sub-menu items
  isHighlight?: boolean; // For "SẢN PHẨM BÁN CHẠY NHẤT"
  description?: string; // For descriptions under menu items
}

// Function to generate product menu items dynamically from PRICING_PLANS
const generateProductMenuItems = (plans: typeof PRICING_PLANS): MenuItem[] => {
  // --- THE FIX IS HERE: Use 'planCategory' for filtering ---
  const homePlans = plans.filter(p => p.planCategory === 'home' || p.planCategory === undefined);
  const businessPlans = plans.filter(p => p.planCategory === 'business');
  const otherProducts = plans.filter(p => p.planCategory === 'other');
  
  // The rest of the function remains the same
  return [
    {
      id: 'danh-cho-ca-nhan',
      label: 'Dành cho cá nhân',
      items: homePlans.map(plan => ({
        id: `home-${plan.id}`,
        label: plan.name.replace('Kaspersky ', ''),
        link: `/products/${plan.id}`,
        //link: `#homepricing`,
        description: plan.features[0],
        isHighlight: plan.isBestValue,
      })),
    },
    {
      id: 'danh-cho-doanh-nghiep',
      label: 'Dành cho doanh nghiệp',
      items: businessPlans.map(plan => ({
        id: `business-${plan.id}`,
        label: plan.name.replace('Kaspersky ', ''),
        link: `/products/${plan.id}`,
        //link: `#ddnPricing`,
        description: plan.features[0],
      })),
    },
    // ... other product groups ...
  ].filter(group => group.items?.length); // Filter out empty groups
};


// Main menu configuration
export const MAIN_MENU: MenuItem[] = [
  {
    id: 'products-services',
    label: 'Sản phẩm và dịch vụ',
    items: generateProductMenuItems(PRICING_PLANS),
  },
  {
    id: 'guidelines',
    label: 'Hướng dẫn',
    link: '#', // Direct link if no submenu
  },
  {
    id: 'tech-news',
    label: 'Tin công nghệ',
    items: [
      // { id: 'promotion', label: 'Khuyến mãi', link: '/news/promotion' },
      // { id: 'tips-tricks', label: 'Kinh nghiệm thủ thuật', link: '/news/tips-tricks' },
      // { id: 'security-tech', label: 'Bảo mật và công nghệ', link: '/news/security-tech' },
      // { id: 'new-tech-products', label: 'Sản phẩm công nghệ mới', link: '/news/new-tech-products' },
      // { id: 'proguide-announcements', label: 'Thông báo từ Proguide', link: '/news/proguide-announcements' },
      // { id: 'usage-advice', label: 'Tư vấn sử dụng', link: '/news/usage-advice' },
      // { id: 'tech-videos', label: 'Video công nghệ', link: '/news/tech-videos' },
      // { id: 'fake-alert', label: 'Cảnh báo hàng giả', link: '/news/fake-alert' },
      // { id: 'nts-education-fund', label: 'Quỹ hỗ trợ giáo dục NTS', link: '/news/nts-education-fund' },
    ],
  },
  {
    id: 'software-download',
    label: 'Tải phần mềm',
    link: '/download',
  },
  {
    id: 'contact',
    label: 'Liên hệ',
    link: '#footer',
  },
];