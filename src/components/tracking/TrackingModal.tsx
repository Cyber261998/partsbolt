import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { trackShipment, TrackingInfo } from '../../services/aftership';
import { useLanguageStore } from '../../store/languageStore';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const translations = {
  en: {
    title: 'Track Your Order',
    placeholder: 'Enter tracking number',
    track: 'Track',
    status: 'Status',
    location: 'Current Location',
    delivery: 'Estimated Delivery',
    events: 'Tracking Events',
    error: 'Unable to track shipment. Please verify the tracking number.',
    loading: 'Loading tracking information...'
  },
  zh: {
    title: '追踪您的订单',
    placeholder: '输入追踪号码',
    track: '追踪',
    status: '状态',
    location: '当前位置',
    delivery: '预计送达',
    events: '追踪事件',
    error: '无法追踪货件。请验证追踪号码。',
    loading: '正在加载追踪信息...'
  },
  ru: {
    title: 'Отследить заказ',
    placeholder: 'Введите номер отслеживания',
    track: 'Отследить',
    status: 'Статус',
    location: 'Текущее местоположение',
    delivery: 'Ожидаемая доставка',
    events: 'События отслеживания',
    error: 'Не удалось отследить отправление. Проверьте номер отслеживания.',
    loading: 'Загрузка информации об отслеживании...'
  },
  ar: {
    title: 'تتبع طلبك',
    placeholder: 'أدخل رقم التتبع',
    track: 'تتبع',
    status: 'الحالة',
    location: 'الموقع الحالي',
    delivery: 'التسليم المتوقع',
    events: 'أحداث التتبع',
    error: 'تعذر تتبع الشحنة. يرجى التحقق من رقم التتبع.',
    loading: 'جاري تحميل معلومات التتبع...'
  },
  fr: {
    title: 'Suivre votre commande',
    placeholder: 'Entrez le numéro de suivi',
    track: 'Suivre',
    status: 'Statut',
    location: 'Localisation actuelle',
    delivery: 'Livraison estimée',
    events: 'Événements de suivi',
    error: 'Impossible de suivre l\'envoi. Veuillez vérifier le numéro de suivi.',
    loading: 'Chargement des informations de suivi...'
  },
  de: {
    title: 'Sendung verfolgen',
    placeholder: 'Tracking-Nummer eingeben',
    track: 'Verfolgen',
    status: 'Status',
    location: 'Aktueller Standort',
    delivery: 'Voraussichtliche Lieferung',
    events: 'Tracking-Ereignisse',
    error: 'Sendung kann nicht verfolgt werden. Bitte überprüfen Sie die Tracking-Nummer.',
    loading: 'Tracking-Informationen werden geladen...'
  }
};

export const TrackingModal: React.FC<TrackingModalProps> = ({ isOpen, onClose }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguageStore();
  const t = translations[language as keyof typeof translations] || translations.en;

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;

    setLoading(true);
    setError('');
    try {
      const info = await trackShipment(trackingNumber);
      setTrackingInfo(info);
    } catch (err) {
      setError(t.error);
      setTrackingInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-xl font-semibold">{t.title}</Dialog.Title>
            <button onClick={onClose}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex space-x-4 mb-6">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 border rounded-lg px-4 py-2"
              />
              <button
                onClick={handleTrack}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {t.track}
              </button>
            </div>

            {loading && (
              <div className="text-center py-8 text-gray-600">
                {t.loading}
              </div>
            )}

            {error && (
              <div className="text-red-600 text-center py-4">
                {error}
              </div>
            )}

            {trackingInfo && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">{t.status}</h3>
                    <p className="mt-1 text-lg">{trackingInfo.status}</p>
                  </div>
                  {trackingInfo.currentLocation && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">{t.location}</h3>
                      <p className="mt-1 text-lg">{trackingInfo.currentLocation}</p>
                    </div>
                  )}
                  {trackingInfo.estimatedDelivery && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">{t.delivery}</h3>
                      <p className="mt-1 text-lg">{new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">{t.events}</h3>
                  <div className="space-y-4">
                    {trackingInfo.events.map((event, index) => (
                      <div key={index} className="border-l-2 border-blue-600 pl-4">
                        <div className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleString()}
                        </div>
                        <div className="font-medium">{event.status}</div>
                        <div className="text-gray-600">{event.location}</div>
                        <div className="text-sm">{event.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};