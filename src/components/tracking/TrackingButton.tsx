import React, { useState } from 'react';
import { TrackingModal } from './TrackingModal';
import { useTranslation } from '../../hooks/useTranslation';

interface TrackingButtonProps {
  trackingNumber: string;
  carrier?: string;
}

export const TrackingButton: React.FC<TrackingButtonProps> = ({ 
  trackingNumber, 
  carrier 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-blue-600 hover:text-blue-800"
      >
        {t('trackPackage')}
      </button>

      <TrackingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};