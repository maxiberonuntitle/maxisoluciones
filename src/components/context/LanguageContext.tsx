import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Locale = 'es' | 'en' | 'fr' | 'ca';

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: (key: string, options?: any) => string | string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const { i18n, t } = useTranslation();
  
  const setLanguage = (lang: Locale) => {
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{
      language: i18n.language as Locale,
      setLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};