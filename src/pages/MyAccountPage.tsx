import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { OrdersPage } from './OrdersPage';
import { CreateTicketForm } from '../components/support/CreateTicketForm';
import { WarrantyClaimForm } from '../components/support/WarrantyClaimForm';
import { ProfileSettings } from '../components/account/ProfileSettings';
import { UserIcon, ShoppingBagIcon, WrenchIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export const MyAccountPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const tabs = [
    { 
      path: '', 
      label: t('profile'),
      icon: UserIcon 
    },
    { 
      path: 'orders', 
      label: t('myOrders'),
      icon: ShoppingBagIcon 
    },
    { 
      path: 'support', 
      label: t('support'),
      icon: WrenchIcon 
    },
    { 
      path: 'warranty', 
      label: t('warranty'),
      icon: ShieldCheckIcon 
    },
    { 
      path: 'returns', 
      label: t('returns'),
      icon: ArrowPathIcon 
    }
  ];

  return (
    <div className="flex gap-6">
      {/* Sidebar Navigation */}
      <div className="w-64 shrink-0">
        <nav className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-bold mb-6">{t('myAccount')}</h2>
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.path}
                  to={`/my-account/${tab.path}`}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    location.pathname === `/my-account/${tab.path}`
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
        <Routes>
          <Route index element={<ProfileSettings />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="support" element={<CreateTicketForm />} />
          <Route 
            path="warranty" 
            element={
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('fileWarrantyClaim')}</h2>
                <WarrantyClaimForm orderId="" productId="" />
              </div>
            } 
          />
          <Route 
            path="returns" 
            element={
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('returnRequest')}</h2>
                <p className="text-gray-600 mb-4">{t('selectOrderForReturn')}</p>
                <OrdersPage />
              </div>
            } 
          />
        </Routes>
      </div>
    </div>
  );
};