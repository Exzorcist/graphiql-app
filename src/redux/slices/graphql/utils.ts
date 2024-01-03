import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { locale } from '@/locale/locale';
import { Language } from '@/types/Provider';

export function getFetchErrorMsg(err: FetchBaseQueryError, lang: Language) {
  if (err.status === 'FETCH_ERROR' || !err.data) {
    return locale[lang].globalMessage.error.serverUnreachable;
  }

  return 'error' in err ? err.error : JSON.stringify(err.data);
}

export function getSchemaReloadMsg(lang: Language) {
  return locale[lang].globalMessage.success.schemaReloaded;
}
