export interface SupportTicket {
  id: string;
  userId: string;
  orderId?: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
}

export type TicketStatus = 
  | 'open'
  | 'in_progress'
  | 'waiting_customer'
  | 'resolved'
  | 'closed';

export type TicketPriority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export type TicketCategory = 
  | 'technical_support'
  | 'installation_help'
  | 'warranty_claim'
  | 'product_inquiry'
  | 'return_request'
  | 'order_issue';

export interface TicketResponse {
  id: string;
  ticketId: string;
  message: string;
  attachments?: string[];
  createdAt: string;
  isStaff: boolean;
}

export interface WarrantyClaim {
  id: string;
  orderId: string;
  productId: string;
  description: string;
  status: WarrantyStatus;
  proofOfPurchase: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export type WarrantyStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'in_process'
  | 'completed';