import { useLanguageStore } from '../store/languageStore';
import { translations } from '../translations';

export const useTranslation = () => {
  const { language } = useLanguageStore();

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return { t };
};