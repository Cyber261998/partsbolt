import { CartItem } from './index';

export type PaymentMethod = 
  | 'credit_card'
  | 'apple_pay'
  | 'paypal'
  | 'webmoney'
  | 'sepa';

export interface PaymentDetails {
  method: PaymentMethod;
  amount: number;
  currency: string;
  orderId: string;
}

export interface CreditCardInfo {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export interface Receipt {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  customerEmail: string;
  items: CartItem[];
}