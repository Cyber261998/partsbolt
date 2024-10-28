import React from 'react';
import { TrackingInfo, TrackingEvent } from '../../types/tracking';

interface TrackingDisplayProps {
  tracking: TrackingInfo;
}

export const TrackingDisplay: React.FC<TrackingDisplayProps> = ({ tracking }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tracking Details</h2>
        <p className="text-gray-600">
          {tracking.courier} - {tracking.trackingNumber}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Status</span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
            {tracking.status}
          </span>
        </div>
        {tracking.estimatedDelivery && (
          <p className="text-gray-600">
            Estimated Delivery: {tracking.estimatedDelivery}
          </p>
        )}
        {tracking.currentLocation && (
          <p className="text-gray-600">
            Current Location: {tracking.currentLocation}
          </p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
        <div className="space-y-4">
          {tracking.events.map((event: TrackingEvent, index: number) => (
            <div
              key={index}
              className="border-l-2 border-gray-200 pl-4 pb-4 relative"
            >
              <div className="absolute -left-1.5 mt-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              </div>
              <div className="ml-2">
                <p className="text-sm font-semibold text-gray-900">
                  {event.status}
                </p>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-xs text-gray-500">{event.date}</p>
                <p className="text-sm text-gray-700 mt-1">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Last Updated: {new Date(tracking.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
};