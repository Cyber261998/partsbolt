import React, { useState } from 'react';
import { useSupportStore } from '../../store/supportStore';
import { TicketCategory, TicketPriority } from '../../types/support';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../hooks/useTranslation';

export const CreateTicketForm: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { createTicket } = useSupportStore();
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'product_inquiry' as TicketCategory,
    priority: 'medium' as TicketPriority,
    orderId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    createTicket({
      ...formData,
      userId: user.id,
      status: 'open'
    });

    setFormData({
      subject: '',
      description: '',
      category: 'product_inquiry',
      priority: 'medium',
      orderId: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('subject')}
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('category')}
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as TicketCategory })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="product_inquiry">{t('productInquiry')}</option>
          <option value="technical_support">{t('technicalSupport')}</option>
          <option value="installation_help">{t('installationHelp')}</option>
          <option value="warranty_claim">{t('warrantyClaim')}</option>
          <option value="return_request">{t('returnRequest')}</option>
          <option value="order_issue">{t('orderIssue')}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('priority')}
        </label>
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as TicketPriority })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="low">{t('low')}</option>
          <option value="medium">{t('medium')}</option>
          <option value="high">{t('high')}</option>
          <option value="urgent">{t('urgent')}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('orderNumber')} ({t('optional')})
        </label>
        <input
          type="text"
          value={formData.orderId}
          onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('description')}
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {t('submitTicket')}
      </button>
    </form>
  );
};