import React from 'react';
import { CartSummary } from '../components/CartSummary';

export const CartPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <CartSummary />
    </div>
  );
};