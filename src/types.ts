export interface ProductSpec {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Laptops' | 'Headphones' | 'Smartphones' | 'Wearables' | 'Audio' | 'Cameras';
  price: number;
  originalPrice?: number;
  matchScore: number; // 0 to 100
  calculatedMatchScore?: number;
  scoreBreakdown?: {
    budgetScore: number;
    featureScore: number;
    categoryScore: number;
  };
  benchmarks?: {
    geekbenchSingle?: number;
    geekbenchMulti?: number;
    batteryHours?: number;
    noiseScore?: number;
    valueIndex?: number;
  };
  badge?: string; // e.g., 'BEST OVERALL', 'BUDGET PICK', 'BATTERY KING', 'WINNER'
  image: string;
  galleryImages?: string[];
  rating: number;
  reviewCount: number;
  summary: string;
  aiReason: string;
  specs: ProductSpec;
  pros: string[];
  cons: string[];
  inStock: boolean;
  storeUrl?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  itemCount: string;
  image: string;
  description: string;
  featuredProduct: string;
}

export interface FilterState {
  maxBudget: number;
  category: string;
  brand: string;
  purpose: string;
  minRating: number;
  selectedFeatures: string[];
  searchPrompt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendedProductIds?: string[];
}

export type NavigationPage = 'home' | 'recommendations' | 'compare' | 'product-detail' | 'about';
