'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Language } from '@/lib/i18n';
import { useSession } from 'next-auth/react';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    if (session?.user?.language) {
      setLanguageState(session.user.language as Language);
    }
  }, [session]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}\n