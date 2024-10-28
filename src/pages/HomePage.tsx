import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { useTranslation } from '../hooks/useTranslation';
import { useProductStore } from '../store/productStore';
import { SalesAssistant } from '../components/SalesAssistant';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const products = useProductStore((state) => state.products);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">{t('featured')}</h1>
      {products.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No products available. Please add some products from the admin panel.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <SalesAssistant />
    </div>
  );
};