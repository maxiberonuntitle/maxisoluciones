import React, { useState, createContext, useContext, ReactNode } from 'react';
import { translations, Locale, TranslationKey } from '../utils/translations';
interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: (key: TranslationKey) => string;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export const LanguageProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [language, setLanguage] = useState<Locale>('es');
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations['es'][key] || key;
  };
  return <LanguageContext.Provider value={{
    language,
    setLanguage,
    t
  }}>
      {children}
    </LanguageContext.Provider>;
};
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};