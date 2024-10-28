import { create } from 'zustand';
import { Product } from '../types';

interface FavoriteStore {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  addFavorite: (product) => 
    set((state) => ({
      favorites: [...state.favorites, product]
    })),
  removeFavorite: (productId) =>
    set((state) => ({
      favorites: state.favorites.filter((product) => product.id !== productId)
    })),
  isFavorite: (productId) =>
    get().favorites.some((product) => product.id === productId)
}));