import React from 'react';
import { useOrderStore } from '../store/orderStore';
import { OrderCard } from '../components/orders/OrderCard';
import { useTranslation } from '../hooks/useTranslation';

export const OrdersPage: React.FC = () => {
  const { orders } = useOrderStore();
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('myOrders')}</h1>
      
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center py-8">{t('noOrders')}</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};