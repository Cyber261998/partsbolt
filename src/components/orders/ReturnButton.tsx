import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useOrderStore } from '../../store/orderStore';
import { ReturnRequest, ReturnItem } from '../../types/order';
import { useTranslation } from '../../hooks/useTranslation';

interface ReturnButtonProps {
  orderId: string;
}

export const ReturnButton: React.FC<ReturnButtonProps> = ({ orderId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<ReturnItem[]>([]);
  const [reason, setReason] = useState('');
  const { getOrderById, createReturnRequest } = useOrderStore();
  const { t } = useTranslation();
  const order = getOrderById(orderId);

  const handleSubmit = () => {
    if (!order || !reason || selectedItems.length === 0) return;

    const returnRequest: ReturnRequest = {
      id: Math.random().toString(36).substr(2, 9),
      orderId,
      reason,
      status: 'pending',
      items: selectedItems,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    createReturnRequest(orderId, returnRequest);
    setIsOpen(false);
  };

  if (!order) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-red-600 hover:text-red-800"
      >
        {t('returnItems')}
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <Dialog.Title className="text-lg font-bold mb-4">
              {t('returnRequest')}
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">{t('selectItems')}</h4>
                {order.items.map((item) => (
                  <label key={item.productId} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, {
                            productId: item.productId,
                            quantity: item.quantity,
                            reason: '',
                            condition: 'unused'
                          }]);
                        } else {
                          setSelectedItems(selectedItems.filter(
                            i => i.productId !== item.productId
                          ));
                        }
                      }}
                    />
                    <span>{item.name} (x{item.quantity})</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block font-medium mb-2">
                  {t('returnReason')}
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!reason || selectedItems.length === 0}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                >
                  {t('submitReturn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};