import React from 'react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { useLanguageStore } from '../store/languageStore';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { language } = useLanguageStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const isProductFavorite = isFavorite(product.id);

  const localizedProduct = {
    ...product,
    name: product.translations?.[language]?.name || product.name,
    description: product.translations?.[language]?.description || product.description,
    category: product.translations?.[language]?.category || product.category,
  };

  const handleFavoriteClick = () => {
    if (isProductFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
      >
        {isProductFavorite ? (
          <HeartSolidIcon className="h-6 w-6 text-red-500" />
        ) : (
          <HeartIcon className="h-6 w-6 text-gray-500" />
        )}
      </button>
      <img
        src={product.image}
        alt={localizedProduct.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{localizedProduct.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{localizedProduct.description}</p>
        <div className="mt-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
        </div>
        <button
          onClick={() => addItem(product)}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};