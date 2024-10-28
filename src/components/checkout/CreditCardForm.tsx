import React, { useState } from 'react';
import { CreditCardInfo } from '../../types/payment';

interface CreditCardFormProps {
  onSubmit: (cardInfo: CreditCardInfo) => void;
}

export const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit }) => {
  const [cardInfo, setCardInfo] = useState<CreditCardInfo>({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cardInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          maxLength={19}
          value={cardInfo.number}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
            setCardInfo({ ...cardInfo, number: formatted });
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="text"
            maxLength={5}
            value={cardInfo.expiry}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              const formatted = value.replace(/(\d{2})(\d{2})/, '$1/$2');
              setCardInfo({ ...cardInfo, expiry: formatted });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="MM/YY"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">CVC</label>
          <input
            type="text"
            maxLength={3}
            value={cardInfo.cvc}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setCardInfo({ ...cardInfo, cvc: value });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="123"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cardholder Name
        </label>
        <input
          type="text"
          value={cardInfo.name}
          onChange={(e) =>
            setCardInfo({ ...cardInfo, name: e.target.value.toUpperCase() })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="JOHN DOE"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Pay Now
      </button>
    </form>
  );
};