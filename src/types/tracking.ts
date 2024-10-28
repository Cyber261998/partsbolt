export interface TrackingInfo {
  trackingNumber: string;
  courier: string;
  status: string;
  estimatedDelivery?: string;
  currentLocation?: string;
  events: TrackingEvent[];
  lastUpdated: string;
}

export interface TrackingEvent {
  date: string;
  status: string;
  location: string;
  description: string;
}

export class TrackingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TrackingError';
  }
}

export interface CarrierInfo {
  name: string;
  pattern: RegExp;
  trackUrl: string;
}