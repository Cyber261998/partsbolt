import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '../hooks/useTranslation';

export const CartSummary: React.FC = () => {
  const { items, removeItem, updateQuantity } = useCartStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">{t('cart')}</h2>
      {items.length === 0 ? (
        <p>{t('emptyCart')}</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center py-4 border-b">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">${item.product.price}</p>
                <div className="flex items-center mt-2">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.product.id, parseInt(e.target.value))
                    }
                    className="border rounded-md p-1"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    {t('remove')}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <div className="flex justify-between text-xl font-bold">
              <span>{t('total')}:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              {t('checkout')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};