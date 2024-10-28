import { create } from 'zustand';
import { Order, ReturnRequest } from '../types/order';

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  createReturnRequest: (orderId: string, returnRequest: ReturnRequest) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  
  addOrder: (order) => 
    set((state) => ({
      orders: [...state.orders, order]
    })),
  
  updateOrder: (orderId, updates) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, ...updates } : order
      )
    })),
  
  createReturnRequest: (orderId, returnRequest) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? { ...order, returnRequest, status: 'returned' }
          : order
      )
    })),
  
  getOrderById: (orderId) =>
    get().orders.find((order) => order.id === orderId)
}));