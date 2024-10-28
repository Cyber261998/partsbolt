export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  compatibility: string[];
  stock: number;
  translations?: {
    [key: string]: {
      name: string;
      description: string;
      category: string;
    };
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Language = 'en' | 'zh' | 'ru' | 'ar' | 'fr' | 'de';

export interface Translation {
  [key: string]: {
    [key: string]: string;
  };
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  compatibility: string[];
  stock: number;
  translations?: {
    [key: string]: {
      name: string;
      description: string;
      category: string;
    };
  };
}