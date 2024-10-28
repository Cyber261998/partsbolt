import { create } from 'zustand';
import { SupportTicket, WarrantyClaim } from '../types/support';

interface SupportStore {
  tickets: SupportTicket[];
  warrantyClaims: WarrantyClaim[];
  createTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'responses'>) => void;
  updateTicket: (ticketId: string, updates: Partial<SupportTicket>) => void;
  addTicketResponse: (ticketId: string, message: string, isStaff: boolean) => void;
  createWarrantyClaim: (claim: Omit<WarrantyClaim, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateWarrantyClaim: (claimId: string, updates: Partial<WarrantyClaim>) => void;
}

export const useSupportStore = create<SupportStore>((set) => ({
  tickets: [],
  warrantyClaims: [],

  createTicket: (ticketData) => set((state) => ({
    tickets: [...state.tickets, {
      ...ticketData,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: []
    }]
  })),

  updateTicket: (ticketId, updates) => set((state) => ({
    tickets: state.tickets.map((ticket) =>
      ticket.id === ticketId
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    )
  })),

  addTicketResponse: (ticketId, message, isStaff) => set((state) => ({
    tickets: state.tickets.map((ticket) =>
      ticket.id === ticketId
        ? {
            ...ticket,
            responses: [...ticket.responses, {
              id: Math.random().toString(36).substring(2, 9),
              ticketId,
              message,
              createdAt: new Date().toISOString(),
              isStaff
            }],
            updatedAt: new Date().toISOString()
          }
        : ticket
    )
  })),

  createWarrantyClaim: (claimData) => set((state) => ({
    warrantyClaims: [...state.warrantyClaims, {
      ...claimData,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]
  })),

  updateWarrantyClaim: (claimId, updates) => set((state) => ({
    warrantyClaims: state.warrantyClaims.map((claim) =>
      claim.id === claimId
        ? { ...claim, ...updates, updatedAt: new Date().toISOString() }
        : claim
    )
  }))
}));