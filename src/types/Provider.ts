import engJson from '@/json/eng.json';
import ruJson from '@/json/ru.json';
import byJson from '@/json/by.json';

export interface ILocalizationProvider {
  lang: Language;
  setLang: (lang: Language) => void;
  i18nQL: {
    eng: typeof engJson;
    ru: typeof ruJson;
    by: typeof byJson;
  };
}

export type Language = 'eng' | 'ru' | 'by';
