export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  trackingNumber?: string;
  trackingCarrier?: string;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  shippingAddress: Address;
  returnRequest?: ReturnRequest;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  reason: string;
  status: ReturnStatus;
  items: ReturnItem[];
  createdAt: string;
  updatedAt: string;
  returnLabel?: string;
}

export interface ReturnItem {
  productId: string;
  quantity: number;
  reason: string;
  condition: string;
}

export type ReturnStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'completed';