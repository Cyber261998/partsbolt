import React, { useState } from 'react';
import { trackShipment } from '../../services/aftership';
import { TrackingError } from '../../types/tracking';

interface TrackingFormProps {
  onTrackingResult: (result: any) => void;
  onError: (error: string) => void;
}

export const TrackingForm: React.FC<TrackingFormProps> = ({ 
  onTrackingResult, 
  onError 
}) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await trackShipment(trackingNumber);
      onTrackingResult(result);
    } catch (error) {
      if (error instanceof TrackingError) {
        onError(error.message);
      } else {
        onError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="tracking-number" 
          className="block text-sm font-medium text-gray-700"
        >
          Tracking Number
        </label>
        <input
          id="tracking-number"
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value.trim())}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter your tracking number"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Tracking...' : 'Track Package'}
      </button>
    </form>
  );
};