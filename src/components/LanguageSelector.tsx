import React from 'react';
import { Menu } from '@headlessui/react';
import { Language } from '../types';
import { useLanguageStore } from '../store/languageStore';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();
  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900">
        <span>{currentLanguage?.flag}</span>
        <span>{currentLanguage?.name}</span>
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {languages.map((lang) => (
            <Menu.Item key={lang.code}>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } w-full text-left px-4 py-2 text-sm text-gray-700`}
                  onClick={() => setLanguage(lang.code)}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};