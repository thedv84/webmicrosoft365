import { PricingPlan } from '@/types';

export type PlanVariant = {
  id: string;
  label: string;
  originalPrice: number;
  discountedPrice: number;
  term: string;
};

export type Plan = PricingPlan & {
  variants?: PlanVariant[];
  isBestValue?: boolean;
  logoColor?: string;
  buttonColor?: string;
  promoCode?: string;
};

export const PRICING_PLANS: any = [
  {
    id: 'personal',
    crmProductId: '188',
    name: 'Microsoft 365 Personal',
    shortDescription: 'Dành cho một người, sử dụng trên nhiều thiết bị.',
    productImage: '/images/m365-personal.svg',
    priceOptions: [
      {
        years: 1,
        devices: 1,
        price: 1499000,
        sku: 'CFQ7TTC0K5BF:0003'
      },
    ],
    features: [
      '1 TB dung lượng lưu trữ đám mây OneDrive',
      'Word, Excel, PowerPoint, OneNote',
      'Outlook, Lịch, To Do',
      'Skype',
      'Bảo mật nâng cao với Microsoft Defender',
      'Hoạt động trên Windows, macOS, iOS và Android',
      'Hỗ trợ kỹ thuật liên tục',
    ],
    mainDownloadDescription: 'Tải ứng dụng Microsoft 365 cho thiết bị của bạn và đăng nhập để sử dụng.',
    downloadLinks: [
      { os: 'windows', label: 'Tải cho Windows', url: 'https://www.microsoft.com/microsoft-365/downloads' },
      { os: 'mac', label: 'Tải cho macOS', url: 'https://www.microsoft.com/microsoft-365/downloads' },
      { os: 'android', label: 'Tải cho Android', url: 'https://play.google.com/store/apps/details?id=com.microsoft.office.officehubrow' },
      { os: 'ios', label: 'Tải cho iOS', url: 'https://apps.apple.com/app/microsoft-365-office/id541164041' },
    ],
  },
  {
    id: 'family',
    crmProductId: '189',
    name: 'Microsoft 365 Family',
    shortDescription: 'Dành cho tối đa 6 người, sử dụng trên nhiều thiết bị.',
    productImage: '/images/m365-family.svg',
    priceOptions: [
      {
        years: 1,
        devices: 6,
        price: 1999000,
        sku: 'CFQ7TTC0K5BF:0005'
      },
    ],
    features: [
      '6 TB dung lượng lưu trữ đám mây OneDrive (1 TB mỗi người)',
      'Word, Excel, PowerPoint, OneNote',
      'Outlook, Lịch, To Do',
      'Skype',
      'Bảo mật nâng cao với Microsoft Defender',
      'Tính năng cao cấp trong ứng dụng Family Safety',
      'Hoạt động trên Windows, macOS, iOS và Android',
      'Hỗ trợ kỹ thuật cho cả gia đình',
    ],
    mainDownloadDescription: 'Tải ứng dụng Microsoft 365 và chia sẻ với các thành viên gia đình.',
    downloadLinks: [
      { os: 'windows', label: 'Tải cho Windows', url: 'https://www.microsoft.com/microsoft-365/downloads' },
      { os: 'mac', label: 'Tải cho macOS', url: 'https://www.microsoft.com/microsoft-365/downloads' },
      { os: 'android', label: 'Tải cho Android', url: 'https://play.google.com/store/apps/details?id=com.microsoft.office.officehubrow' },
      { os: 'ios', label: 'Tải cho iOS', url: 'https://apps.apple.com/app/microsoft-365-office/id541164041' },
    ],
  },
];
