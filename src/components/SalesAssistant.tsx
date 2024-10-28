import React, { useState, useRef, useEffect } from 'react';
import { useLanguageStore } from '../store/languageStore';
import { useProductStore } from '../store/productStore';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { generateResponse } from '../utils/assistantUtils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const translations = {
  en: {
    placeholder: 'Ask me anything about auto parts...',
    greeting: 'Hello! I can help you find the right auto parts and answer any questions you have.',
    suggestions: ['Find parts by car model', 'Check product compatibility', 'Get shipping info', 'Track my order']
  },
  zh: {
    placeholder: '询问任何关于汽车配件的问题...',
    greeting: '您好！我可以帮您找到合适的汽车配件并回答您的问题。',
    suggestions: ['按车型查找配件', '检查产品兼容性', '获取运输信息', '追踪我的订单']
  },
  ru: {
    placeholder: 'Спросите меня о любых автозапчастях...',
    greeting: 'Здравствуйте! Я помогу вам найти нужные автозапчасти и отвечу на ваши вопросы.',
    suggestions: ['Найти запчасти по модели', 'Проверить совместимость', 'Информация о доставке', 'Отследить заказ']
  },
  ar: {
    placeholder: 'اسألني أي شيء عن قطع غيار السيارات...',
    greeting: 'مرحباً! يمكنني مساعدتك في العثور على قطع غيار السيارات المناسبة والإجابة على أسئلتك.',
    suggestions: ['البحث عن القطع حسب الموديل', 'التحقق من التوافق', 'معلومات الشحن', 'تتبع طلبي']
  },
  fr: {
    placeholder: 'Posez-moi des questions sur les pièces auto...',
    greeting: 'Bonjour! Je peux vous aider à trouver les bonnes pièces auto et répondre à vos questions.',
    suggestions: ['Recherche par modèle', 'Vérifier la compatibilité', 'Infos de livraison', 'Suivre ma commande']
  },
  de: {
    placeholder: 'Fragen Sie mich alles über Autoteile...',
    greeting: 'Hallo! Ich kann Ihnen helfen, die richtigen Autoteile zu finden und Ihre Fragen zu beantworten.',
    suggestions: ['Teile nach Modell finden', 'Kompatibilität prüfen', 'Versandinformationen', 'Bestellung verfolgen']
  }
};

export const SalesAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguageStore();
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: translations[language]?.greeting || translations.en.greeting,
          sender: 'assistant',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(inputText, language, products);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    handleSend();
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[32rem] bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Auto Parts Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {translations[language]?.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={translations[language]?.placeholder || translations.en.placeholder}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};