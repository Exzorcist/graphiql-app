export interface ILocalizationProvider {
  lang: Language;
  setLang: (lang: Language) => void;
  i18nQL: {
    eng: { [key: string]: { [key: string]: { [key: string]: string } } };
    ru: { [key: string]: { [key: string]: { [key: string]: string } } };
    by: { [key: string]: { [key: string]: { [key: string]: string } } };
  };
}

export type Language = 'eng' | 'ru' | 'by';
