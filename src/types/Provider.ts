import { Locale } from '@/locale/locale';

export interface ILocalizationProvider {
  lang: Language;
  setLang: (lang: Language) => void;
  get t(): Locale;
}

export type Language = 'eng' | 'ru' | 'by';
