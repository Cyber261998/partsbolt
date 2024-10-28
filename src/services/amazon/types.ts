export interface AmazonProduct {
  asin: string;
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  rating: number;
  salesRank: number;
  stockStatus: 'in_stock' | 'out_of_stock';
  reviews: number;
  priceHistory: PricePoint[];
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface CrawlerConfig {
  maxProducts: number;
  minRating: number;
  minReviews: number;
  categories: string[];
}

export interface CrawlerResult {
  success: boolean;
  products: AmazonProduct[];
  error?: string;
}