import { PaymentDetails, PaymentResult, CreditCardInfo } from '../types/payment';

export const processPayment = async (
  paymentDetails: PaymentDetails,
  paymentInfo?: CreditCardInfo
): Promise<PaymentResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate successful payment
  return {
    success: true,
    transactionId: Math.random().toString(36).substring(2, 9)
  };
};