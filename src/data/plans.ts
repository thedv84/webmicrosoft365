export interface PlanVariant {
  id: string;
  crmProductId: string; // <-- Add crmProductId here
  label: string;
  originalPrice: number;
  discountedPrice: number;
  term: string;
}

// Define the structure for OS-specific download links
export interface DownloadLink {
  os: 'windows' | 'mac' | 'android' | 'ios';
  label: string; // e.g., "Cài đặt cho Máy tính Windows"
  url: string;
}

export interface Plan {
  id:  'premium' | 'plus' | 'standard' | 'small-office-security'; // <-- Update to include new plan ID
  // crmProductId: string; // <-- Remove from here
  name: string;
  isBestValue: boolean;
  logoColor: string;
  buttonColor: string;
  features: string[];
  variants: PlanVariant[];
  promoCode?: string;
  audience?: string[];
  planCategory?: 'home' | 'business' | 'other';
  detailsLink?: string;
  productImage?: string; // Add this for the product box image
  shortDescription?: string; // Add this for the product description on main download page
  mainDownloadDescription?: string; // For the text below the product name on Image 1
  downloadLinks?: DownloadLink[]; // Array of OS-specific download links
}

// All the data for the pricing plans
export const PRICING_PLANS: Plan[] = [
  {
    id: 'small-office-security', // <-- Add a new ID for this product
    name: 'Kaspersky Small Office Security',
    isBestValue: false, // Or true, depending on its status
    logoColor: '#00A38D', // Example color
    buttonColor: '#00A38D', // Example color
    features: [
      'Được thiết kế kế đặc biệt dành riêng cho các doanh nghiệp nghiệp rất nhỏ',
      'Đặt và quên” không yêu cầu bất kỳ kỹ năng CNTT nào',
      'Giải pháp bảo mật dành cho máy tính, máy chủ, thiết bị di động, dữ liệu và tiền bạc',
    ],
    planCategory: 'business',
    variants: [
      { id: 'ksos-5p5m1fs1y', crmProductId: '59', label: '5 PCs + 5 Mobile + 1 File Server', originalPrice: 3800000, discountedPrice: 3800000, term: '/1 năm' },
      { id: 'ksos-10p10m1fs1y', crmProductId: '65', label: '10 PCs + 10 Mobile + 1 File Server', originalPrice: 4600000, discountedPrice: 4600000, term: '/1 năm' },
      // Add more variants as needed
    ],
    detailsLink: '/products/small-office-security', // <-- Link to a dedicated product details page
    productImage: '/images/kaspersky-small-office-security.webp', // Image for KSOS product box
    shortDescription: 'Kaspersky Small Office Security là giải pháp bảo mật dành cho các doanh nghiệp nhỏ, dễ sử dụng, bảo vệ máy tính, máy chủ và thiết bị di động.',
    mainDownloadDescription: 'Cảm ơn bạn đã tải về sản phẩm của chúng tôi. Giải pháp bảo mật mạnh mẽ cho doanh nghiệp nhỏ của bạn. Bảo vệ máy tính, máy Mac, máy chủ file và thiết bị di động của doanh nghiệp bạn.',
    downloadLinks: [
      { os: 'windows', label: 'Cài đặt cho Máy tính Windows', url: 'https://downloads.kaspersky-labs.com/main/kaspersky_small_office_security/latest/full/kaspersky_small_office_security.exe' },
      { os: 'mac', label: 'Cài đặt cho Máy tính Mac', url: 'https://downloads.kaspersky-labs.com/main/kaspersky_small_office_security/latest/full/kaspersky_small_office_security.dmg' },
      { os: 'android', label: 'Cài đặt cho thiết bị Android', url: 'https://play.google.com/store/apps/details?id=com.kms.free' },
      { os: 'ios', label: 'Cài đặt cho thiết bị iPhone & Ipad', url: 'https://apps.apple.com/app/kaspersky-vpn-security/id1258673322' },
    ],
  },
  {
    id: 'premium',
    //crmProductId: '57',
    name: 'Kaspersky Premium',
    isBestValue: true,
    logoColor: 'bg-purple-800',
    buttonColor: 'bg-purple-800 hover:bg-purple-900',
    features: [
      'Chống virus, chống lừa đảo theo thời gian thực',
      'Bảo vệ thanh toán trực tuyến',
      'VPN siêu nhanh không giới hạn',
      'Trình quản lý mật khẩu',
      'Bảo vệ danh tính cao cấp',
      'Bảo vệ trẻ em Cơ bản (*)',
    ],
    planCategory: 'home',
   variants: [
      { id: 'p-1d1y', crmProductId: '184', label: '1 thiết bị/năm', originalPrice: 636000, discountedPrice: 499000, term: '/1 năm' },
      { id: 'p-3d1y', crmProductId: '185', label: '3 thiết bị/năm', originalPrice: 900000, discountedPrice: 719000, term: '/1 năm' },
      { id: 'p-5d1y', crmProductId: '186', label: '5 thiết bị/năm', originalPrice: 1100000, discountedPrice: 899000, term: '/1 năm' }, // Example of a different ID for a different variant
      { id: 'p-10d1y', crmProductId: '187', label: '10 thiết bị/năm', originalPrice: 1500000, discountedPrice: 1199000, term: '/1 năm' }, 
    ],
    detailsLink: '/products/premium',
    productImage: '/images/kaspersky-premium.webp', // Image for Premium product box
    shortDescription: 'Kaspersky Premium là giải pháp bảo vệ toàn diện cho thiết bị, bao gồm tính năng chống virus, bảo vệ quyền riêng tư, danh tính, tối ưu hóa hiệu suất và hỗ trợ kỹ thuật cao cấp.',
    mainDownloadDescription: 'Cảm ơn bạn đã tải về sản phẩm của chúng tôi. Sức mạnh bảo vệ của gia đình bạn. Khi gia đình bạn nối mạng, phần mềm bảo mật này mang đến sức mạnh bảo vệ hộ trên PC, máy Mac, Android, iPhone & iPad.',
    downloadLinks: [
      { os: 'windows', label: 'Cài đặt cho Máy tính Windows', url: 'https://downloads.kaspersky-labs.com/main/kaspersky_premium/latest/full/kaspersky_premium.exe' },
      { os: 'mac', label: 'Cài đặt cho Máy tính Mac', url: 'https://downloads.kaspersky-labs.com/main/kaspersky_premium/latest/full/kaspersky_premium.dmg' },
      { os: 'android', label: 'Cài đặt cho thiết bị Android', url: 'https://play.google.com/store/apps/details?id=com.kms.free' },
      { os: 'ios', label: 'Cài đặt cho thiết bị iPhone & Ipad', url: 'https://apps.apple.com/app/kaspersky-vpn-security/id1258673322' },
    ],
  },
  {
    id: 'plus',
   // crmProductId: '58',
    name: 'Kaspersky Plus',
    isBestValue: false,
    logoColor: 'bg-purple-600',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    promoCode: 'ONLINEK10',
    features: [
      'Chống virus, chống lừa đảo theo thời gian thực',
      'Bảo vệ thanh toán trực tuyến',
      'Tối ưu hóa hiệu suất máy',
      'VPN siêu nhanh không giới hạn',
      'Trình quản lý mật khẩu',
    ],
    planCategory: 'home',
    variants: [
      { id: 'plus-1d1y', crmProductId: '181', label: '1 thiết bị /năm', originalPrice: 500000, discountedPrice: 399000, term: '/1 năm' },
      { id: 'plus-3d1y', crmProductId: '182', label: '3 thiết bị/năm', originalPrice: 650000, discountedPrice: 599000, term: '/1 năm' },
      { id: 'plus-5d1y', crmProductId: '176', label: '5 thiết bị/năm', originalPrice: 900000, discountedPrice: 749000, term: '/1 năm' },
      { id: 'plus-10d1y', crmProductId: '183', label: '10 thiết bị/năm', originalPrice: 1100000, discountedPrice: 999000, term: '/1 năm' },
    ],
    detailsLink: '/products/plus',
    productImage: '/images/kaspersky-plus.webp', // Image for Plus product box
    shortDescription: 'Kaspersky Plus là giải pháp an ninh mạng thế hệ mới bảo vệ bạn khỏi virus, mã độc tống tiền và phần mềm độc hại mới mà không làm chậm thiết bị',
    mainDownloadDescription: 'Cảm ơn bạn đã tải về sản phẩm của chúng tôi. Bảo mật toàn diện để bảo vệ gia đình bạn. Khi gia đình bạn nối mạng, phần mềm bảo mật này mang đến sức mạnh bảo vệ hộ trên PC, máy Mac, Android, iPhone & iPad.',
    downloadLinks: [
      { os: 'windows', label: 'Cài đặt cho Máy tính Windows', url: 'https://downloads.kaspersky-labs.com/main/kaspersky_plus/latest/full/kaspersky_plus.exe' },
      { os: 'mac', label: 'Cài đặt cho Máy tính Mac', url: 'https://downloads.kaspersky-labs.com/main/kaspersky_plus/latest/full/kaspersky_plus.dmg' },
      { os: 'android', label: 'Cài đặt cho thiết bị Android', url: 'https://play.google.com/store/apps/details?id=com.kms.free' },
      { os: 'ios', label: 'Cài đặt cho thiết bị iPhone & Ipad', url: 'https://apps.apple.com/app/kaspersky-vpn-security/id1258673322' },
    ],
  },
  {
    id: 'standard',
    //crmProductId: '59',
    name: 'Kaspersky Standard',
    isBestValue: false,
    logoColor: 'bg-cyan-500',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    features: [
      'Chống virus, chống lừa đảo theo thời gian thực',
      'Bảo vệ thanh toán trực tuyến',
      'Tối ưu hóa hiệu suất máy',
    ],
    audience: [
        'Dùng internet ít',
        'Chỉ dùng máy tính ở nhà',
    ],
    planCategory: 'home',
    variants: [
      { id: 'std-1d1y', crmProductId: '177', label: '1 thiết bị/năm', originalPrice: 299000, discountedPrice: 229000, term: '/1 năm' },
      { id: 'std-3d1y', crmProductId: '178', label: '3 thiết bị/năm', originalPrice: 550000, discountedPrice: 449000, term: '/1 năm' },
      { id: 'std-5d1y', crmProductId: '179', label: '5 thiết bị /năm', originalPrice: 650000, discountedPrice: 549000, term: '/1 năm' },
      { id: 'std-10d1y', crmProductId: '180', label: '10 thiết bị /năm', originalPrice: 900000, discountedPrice: 799000, term: '/1 năm' },
    ],
    detailsLink: '/products/standard',
    productImage: '/images/kaspesky-standard.webp', // Image for Standard product box
    shortDescription: 'Kaspersky Standard là giải pháp bảo mật Tiêu chuẩn cung cấp khả năng bảo vệ mạnh mẽ khỏi virus, phần mềm độc hại và mã độc tống tiền',
    mainDownloadDescription: 'Cảm ơn bạn đã tải về sản phẩm của chúng tôi. Bảo vệ gia đình bạn một cách đáng tin cậy. Khi gia đình bạn nối mạng, phần mềm bảo mật này mang đến sức mạnh bảo vệ hộ trên PC, máy Mac, Android, iPhone & iPad.',
    downloadLinks: [
      { os: 'windows', label: 'Cài đặt cho Máy tính Windows', url: 'https://downloads.kaspersky-labs.com/main/kaspersky_standard/latest/full/kaspersky_standard.exe' },
      { os: 'mac', label: 'Cài đặt cho Máy tính Mac', url: 'https://downloads.kaspersky-labs.com/main/kaspersky_standard/latest/full/kaspersky_standard.dmg' },
      { os: 'android', label: 'Cài đặt cho thiết bị Android', url: 'https://play.google.com/store/apps/details?id=com.kms.free' },
      { os: 'ios', label: 'Cài đặt cho thiết bị iPhone & Ipad', url: 'https://apps.apple.com/app/kaspersky-vpn-security/id1258673322' },
    ],
  },
];