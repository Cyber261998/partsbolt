import React from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../types/order';
import { useTranslation } from '../../hooks/useTranslation';
import { TrackingButton } from '../tracking/TrackingButton';
import { ReturnButton } from './ReturnButton';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { t } = useTranslation();
  const canReturn = order.status === 'delivered' && !order.returnRequest;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            {t('orderNumber')}: {order.id}
          </h3>
          <p className="text-sm text-gray-600">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
          order.status === 'returned' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {t(`orderStatus.${order.status}`)}
        </span>
      </div>

      <div className="border-t border-b border-gray-200 py-4 my-4">
        {order.items.map((item) => (
          <div key={item.productId} className="flex justify-between items-center mb-2">
            <div>
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-600 ml-2">x{item.quantity}</span>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">{t('total')}</span>
        <span className="text-lg font-bold">${order.totalAmount.toFixed(2)}</span>
      </div>

      <div className="flex space-x-4">
        {order.trackingNumber && (
          <TrackingButton 
            trackingNumber={order.trackingNumber}
            carrier={order.trackingCarrier}
          />
        )}
        
        {canReturn && (
          <ReturnButton orderId={order.id} />
        )}

        <Link
          to={`/orders/${order.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          {t('viewDetails')}
        </Link>

        <Link
          to={`/reorder/${order.id}`}
          className="text-green-600 hover:text-green-800"
        >
          {t('buyAgain')}
        </Link>
      </div>
    </div>
  );
};