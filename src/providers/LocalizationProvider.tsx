import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
import { ILocalizationProvider, Language } from '@/types/Provider';

import EngJSON from '@/json/eng.json';
import RuJSON from '@/json/ru.json';
import ByJSON from '@/json/by.json';

const LocalizationContext = createContext<ILocalizationProvider | null>(null);

const translations = {
  eng: EngJSON,
  ru: RuJSON,
  by: ByJSON,
};

function LocalizationProvider({ children }: PropsWithChildren) {
  const [lang, setLang] = useState<Language>('eng');

  const value = useMemo(() => {
    return {
      lang,
      setLang,
      get t() {
        return translations[lang];
      },
    };
  }, [lang]);

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export const useLocalizationContext = () => {
  const value = useContext(LocalizationContext);

  if (!value) {
    throw new Error('Can not "useLocalizationContext" outside of the "LocalizationProvider"');
  }

  return value;
};

export default LocalizationProvider;
