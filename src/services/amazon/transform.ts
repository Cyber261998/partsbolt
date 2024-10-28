import { AmazonProduct } from './types';
import { ProductFormData } from '../../types';

export function transformAmazonProduct(product: AmazonProduct): ProductFormData {
  return {
    name: product.title,
    description: product.description || `High-quality ${product.category.toLowerCase()} for your vehicle`,
    price: Math.round(product.price * 0.85 * 100) / 100, // 15% discount
    image: product.imageUrl,
    category: product.category,
    compatibility: ['Universal Fit'],
    stock: product.stockStatus === 'in_stock' ? 50 : 0
  };
}