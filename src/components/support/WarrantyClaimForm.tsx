import React, { useState } from 'react';
import { useSupportStore } from '../../store/supportStore';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../hooks/useTranslation';

interface WarrantyClaimFormProps {
  orderId: string;
  productId: string;
  onSubmit?: () => void;
}

export const WarrantyClaimForm: React.FC<WarrantyClaimFormProps> = ({
  orderId,
  productId,
  onSubmit
}) => {
  const { t } = useTranslation();
  const { createWarrantyClaim } = useSupportStore();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createWarrantyClaim({
      orderId,
      productId,
      description,
      status: 'pending',
      proofOfPurchase: orderId,
      images
    });

    setDescription('');
    setImages([]);
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('warrantyDescription')}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('uploadImages')} ({t('optional')})
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            // In a real app, you would upload these files to a server
            // Here we're just creating object URLs for demonstration
            const urls = files.map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...urls]);
          }}
          className="mt-1 block w-full"
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, i) => i !== index))}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {t('submitWarrantyClaim')}
      </button>
    </form>
  );
};