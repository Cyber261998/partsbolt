import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon, TruckIcon, UserIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';
import { useAuthStore } from '../store/authStore';
import { TrackingModal } from './tracking/TrackingModal';

export const Header: React.FC = () => {
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const favorites = useFavoriteStore((state) => state.favorites);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-800">AutoParts Global</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/categories" className="text-gray-600 hover:text-gray-900">
              {t('categories')}
            </Link>
            <Link to="/brands" className="text-gray-600 hover:text-gray-900">
              {t('brands')}
            </Link>
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <TruckIcon className="h-6 w-6" />
              <span>Track</span>
            </button>
            <LanguageSelector />
            {user?.isAuthenticated ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                    Admin
                  </Link>
                )}
                <Link 
                  to="/my-account" 
                  className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                >
                  <UserIcon className="h-6 w-6" />
                  <span>{t('myAccount')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link to="/register" className="text-gray-600 hover:text-gray-900">
                  Register
                </Link>
              </>
            )}
            <Link to="/favorites" className="relative">
              <HeartIcon className="h-6 w-6 text-gray-600" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <TrackingModal 
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />
    </header>
  );
};