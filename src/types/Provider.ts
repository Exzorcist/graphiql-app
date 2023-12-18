import engJson from '@/json/eng.json';
import ruJson from '@/json/ru.json';
import byJson from '@/json/by.json';

export type Localization = typeof engJson | typeof ruJson | typeof byJson;

export interface ILocalizationProvider {
  lang: Language;
  setLang: (lang: Language) => void;
  get t(): Localization;
}

export type Language = 'eng' | 'ru' | 'by';
