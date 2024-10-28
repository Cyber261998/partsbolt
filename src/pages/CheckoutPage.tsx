import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { usePaymentStore } from '../store/paymentStore';
import { PaymentMethodSelector } from '../components/checkout/PaymentMethodSelector';
import { CreditCardForm } from '../components/checkout/CreditCardForm';
import { PaymentMethod, CreditCardInfo } from '../types/payment';
import { processPayment } from '../services/paymentService';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { addReceipt } = usePaymentStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = async (cardInfo?: CreditCardInfo) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setProcessing(true);
    setError(null);

    const orderId = Math.random().toString(36).substr(2, 9);
    const paymentDetails = {
      method: paymentMethod,
      amount: total,
      currency: 'USD',
      orderId,
    };

    try {
      const result = await processPayment(paymentDetails, cardInfo);

      if (result.success) {
        addReceipt({
          id: result.transactionId!,
          orderId,
          amount: total,
          currency: 'USD',
          paymentMethod,
          date: new Date().toISOString(),
          status: 'completed',
          customerEmail: user.email,
          items,
        });

        clearCart();
        navigate('/order-confirmation');
      } else {
        setError(result.error || 'Payment failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between items-center py-2"
          >
            <div>
              <span className="font-medium">{item.product.name}</span>
              <span className="text-gray-600"> × {item.quantity}</span>
            </div>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <PaymentMethodSelector
          selectedMethod={paymentMethod}
          onSelect={setPaymentMethod}
        />

        {paymentMethod === 'credit_card' && (
          <div className="mt-6">
            <CreditCardForm onSubmit={handlePayment} />
          </div>
        )}

        {paymentMethod !== 'credit_card' && (
          <button
            onClick={() => handlePayment()}
            disabled={processing}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {processing ? 'Processing...' : 'Continue to Payment'}
          </button>
        )}

        {error && (
          <div className="mt-4 text-red-600 text-sm text-center">{error}</div>
        )}
      </div>
    </div>
  );
};