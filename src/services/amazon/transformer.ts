import { Product } from '../../types';
import { AmazonProduct } from './types';

export function transformProduct(amazonProduct: AmazonProduct): Product {
  return {
    id: amazonProduct.id,
    name: amazonProduct.title,
    description: amazonProduct.description,
    price: calculateDiscountedPrice(amazonProduct.price),
    image: getSafeImageUrl(amazonProduct.imageUrl),
    category: amazonProduct.category,
    compatibility: [],
    stock: 100
  };
}

function calculateDiscountedPrice(originalPrice: number): number {
  return Number((originalPrice * 0.85).toFixed(2));
}

function getSafeImageUrl(originalUrl: string): string {
  try {
    const url = new URL(originalUrl);
    return url.toString();
  } catch {
    return `https://via.placeholder.com/400x400.png?text=${encodeURIComponent('Product Image')}`;
  }
}