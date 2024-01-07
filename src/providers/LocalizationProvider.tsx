import { useSelector } from 'react-redux';
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
import { ILocalizationProvider, Language } from '@/types/Provider';
import { selectLocalization } from '@/redux/slices/localizationSlice';
import { locale } from '@/locale/locale';

const LocalizationContext = createContext<ILocalizationProvider | null>(null);

function LocalizationProvider({ children }: PropsWithChildren) {
  const [lang, setLang] = useState<Language>(useSelector(selectLocalization));

  const value = useMemo(() => {
    return {
      lang,
      setLang,
      get t() {
        return locale[lang];
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
