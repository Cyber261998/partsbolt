import React from 'react';
import { Link } from 'react-router-dom';
import { usePaymentStore } from '../store/paymentStore';
import { useAuthStore } from '../store/authStore';

export const OrderConfirmationPage: React.FC = () => {
  const { user } = useAuthStore();
  const { receipts } = usePaymentStore();
  const latestReceipt = receipts[receipts.length - 1];

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {latestReceipt && (
          <div className="text-left bg-gray-50 rounded p-4 mb-6">
            <h2 className="font-semibold mb-2">Order Details</h2>
            <p>Order ID: {latestReceipt.orderId}</p>
            <p>Amount: ${latestReceipt.amount.toFixed(2)}</p>
            <p>Payment Method: {latestReceipt.paymentMethod}</p>
          </div>
        )}

        <div className="space-x-4">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};