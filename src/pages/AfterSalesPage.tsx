import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { CreateTicketForm } from '../components/support/CreateTicketForm';
import { WarrantyClaimForm } from '../components/support/WarrantyClaimForm';
import { OrdersPage } from './OrdersPage';

export const AfterSalesPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const tabs = [
    { path: '', label: t('myOrders') },
    { path: 'support', label: t('support') },
    { path: 'warranty', label: t('warranty') },
    { path: 'returns', label: t('returns') }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('afterSalesService')}</h1>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={`/after-sales/${tab.path}`}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                location.pathname === `/after-sales/${tab.path}`
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content Routes */}
      <Routes>
        <Route index element={<OrdersPage />} />
        <Route path="support" element={<CreateTicketForm />} />
        <Route 
          path="warranty" 
          element={
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">{t('fileWarrantyClaim')}</h2>
              <WarrantyClaimForm orderId="" productId="" />
            </div>
          } 
        />
        <Route 
          path="returns" 
          element={
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">{t('returnRequest')}</h2>
              <p className="text-gray-600 mb-4">{t('selectOrderForReturn')}</p>
              <OrdersPage />
            </div>
          } 
        />
      </Routes>
    </div>
  );
};