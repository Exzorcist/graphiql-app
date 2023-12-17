import { ILocalizationProvider, Language } from '@/types/Provider';

import EngJSON from '@/json/eng.json';
import RuJSON from '@/json/ru.json';
import ByJSON from '@/json/by.json';

export const testProviderData: ILocalizationProvider = {
  lang: 'eng' as Language,
  setLang: vi.fn(),
  i18nQL: {
    eng: EngJSON,
    ru: RuJSON,
    by: ByJSON,
  },
};
