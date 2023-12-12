import { createContext, useContext } from 'react';
import { ILocalizationProvider } from '@/types/Provider';

const LocalizationContext = createContext<ILocalizationProvider | null>(null);
export const LocalizationProvider = LocalizationContext.Provider;

export const useLocalizationtContext = () => {
  const data = useContext(LocalizationContext);

  if (!data) {
    throw new Error('Can not "useLocalizationtContext" outside of the "LocalizationProvider"');
  } else {
    return data;
  }
};
