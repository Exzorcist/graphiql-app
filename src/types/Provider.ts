import engJson from '@/json/eng.json';
import ruJson from '@/json/ru.json';
import byJson from '@/json/by.json';

export interface ILocalizationProvider {
  lang: Language;
  setLang: (lang: Language) => void;
  get t(): typeof engJson | typeof ruJson | typeof byJson;
}

export type Language = 'eng' | 'ru' | 'by';
