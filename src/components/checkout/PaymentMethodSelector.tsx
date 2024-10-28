import React from 'react';
import { PaymentMethod } from '../../types/payment';
import {
  CreditCardIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelect,
}) => {
  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Credit Card',
      icon: CreditCardIcon,
      description: 'International Credit/Debit Cards',
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      icon: CurrencyDollarIcon,
      description: 'Pay with Apple Pay',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: CurrencyDollarIcon,
      description: 'Pay with PayPal',
    },
    {
      id: 'webmoney',
      name: 'WebMoney',
      icon: CurrencyDollarIcon,
      description: 'Pay with WebMoney',
    },
    {
      id: 'sepa',
      name: 'SEPA',
      icon: CurrencyDollarIcon,
      description: 'European Bank Transfer',
    },
  ] as const;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`relative rounded-lg border p-4 cursor-pointer ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300'
            }`}
            onClick={() => onSelect(method.id as PaymentMethod)}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <method.icon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">
                  {method.name}
                </h4>
                <p className="text-xs text-gray-500">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}