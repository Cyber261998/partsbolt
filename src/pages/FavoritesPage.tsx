import React from 'react';
import { useFavoriteStore } from '../store/favoriteStore';
import { ProductCard } from '../components/ProductCard';
import { useTranslation } from '../hooks/useTranslation';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavoriteStore();
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">{t('favorites')}</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600 text-center py-8">{t('noFavorites')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};