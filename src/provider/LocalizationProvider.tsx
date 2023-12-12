import { createContext, useContext } from 'react';
import { ILocalizationProvider } from '@/types/Provider';

const LocalizationContext = createContext<ILocalizationProvider | null>(null);

export const LocalizationProvider = LocalizationContext.Provider;
export const useLocalizationtContext = () => useContext(LocalizationContext);
