import { TrackingInfo, TrackingEvent, TrackingError } from '../types/tracking';

const CARRIERS = {
  'ups': {
    name: 'UPS',
    pattern: /^1Z[A-Z0-9]{16}$/,
    trackUrl: 'https://www.ups.com/track?tracknum='
  },
  'fedex': {
    name: 'FedEx',
    pattern: /^\d{12,14}$/,
    trackUrl: 'https://www.fedex.com/fedextrack/?trknbr='
  },
  'dhl': {
    name: 'DHL',
    pattern: /^\d{10}$/,
    trackUrl: 'https://www.dhl.com/en/express/tracking.html?AWB='
  },
  'usps': {
    name: 'USPS',
    pattern: /^9\d{15,21}$/,
    trackUrl: 'https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1='
  }
};

function validateTrackingNumber(trackingNumber: string): boolean {
  if (!trackingNumber || trackingNumber.length < 8) {
    throw new TrackingError('Invalid tracking number format');
  }
  return true;
}

function detectCarrier(trackingNumber: string): string {
  for (const [carrier, info] of Object.entries(CARRIERS)) {
    if (info.pattern.test(trackingNumber)) {
      return carrier;
    }
  }
  throw new TrackingError('Unsupported carrier or invalid tracking number');
}

async function fetchTrackingData(trackingNumber: string, carrier: string): Promise<Response> {
  try {
    const response = await fetch(`/api/tracking/${carrier}/${trackingNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new TrackingError(`Failed to fetch tracking data: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    throw new TrackingError('Network error while fetching tracking information');
  }
}

function parseTrackingResponse(data: any, carrier: string): TrackingEvent[] {
  if (!data || !Array.isArray(data.events)) {
    throw new TrackingError('Invalid tracking data format');
  }

  return data.events.map(event => ({
    date: new Date(event.timestamp).toLocaleString(),
    status: event.status || 'Status unavailable',
    location: event.location || 'Location unavailable',
    description: event.description || 'No description available'
  }));
}

export async function trackShipment(trackingNumber: string): Promise<TrackingInfo> {
  try {
    validateTrackingNumber(trackingNumber);
    const carrier = detectCarrier(trackingNumber);
    const response = await fetchTrackingData(trackingNumber, carrier);
    const data = await response.json();
    
    const events = parseTrackingResponse(data, carrier);
    const latestEvent = events[0];

    return {
      trackingNumber,
      courier: CARRIERS[carrier].name,
      status: latestEvent?.status || 'Pending',
      estimatedDelivery: data.estimated_delivery,
      currentLocation: latestEvent?.location,
      events,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    if (error instanceof TrackingError) {
      throw error;
    }
    throw new TrackingError('Unable to track shipment. Please try again later.');
  }
}