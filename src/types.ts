export interface MenuItem {
  id: string;
  label: string;
  link?: string;
  // Optional fields used by NavbarDropdown
  isHighlight?: boolean;
  description?: string;
  items?: MenuItem[];
}

export interface PricingPlan {
  id: string;
  crmId: string;
  name: string;
  shortDescription: string;
  productImage: string;
  priceOptions: PriceOption[];
  features: string[];
  mainDownloadDescription?: string;
  audience?: string[];
  downloadLinks?: {
    os: 'windows' | 'mac' | 'android' | 'ios';
    label: string;
    url: string;
  }[];
}

export interface PriceOption {
  years: number;
  devices: number;
  price: number;
  sku: string;
}
