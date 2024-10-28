import create from 'zustand';
import { PaymentDetails, PaymentResult, Receipt } from '../types/payment';

interface PaymentStore {
  receipts: Receipt[];
  pendingPayment: PaymentDetails | null;
  setPendingPayment: (payment: PaymentDetails | null) => void;
  addReceipt: (receipt: Receipt) => void;
  getReceipts: (customerEmail: string) => Receipt[];
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  receipts: [],
  pendingPayment: null,
  setPendingPayment: (payment) => set({ pendingPayment: payment }),
  addReceipt: (receipt) => set((state) => ({
    receipts: [...state.receipts, receipt]
  })),
  getReceipts: (customerEmail) => {
    const state = get();
    return state.receipts.filter(receipt => receipt.customerEmail === customerEmail);
  }
}));