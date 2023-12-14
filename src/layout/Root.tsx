import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LocalizationProvider } from '@/provider/LocalizationProvider';

import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';

import EngJSON from '@/json/eng.json';
import RuJSON from '@/json/ru.json';
import ByJSON from '@/json/by.json';

import { Language } from '@/types/Provider';

function Root() {
  const [lang, setLang] = useState<Language>('eng');
  const i18nQL = {
    eng: EngJSON,
    ru: RuJSON,
    by: ByJSON,
  };

  return (
    <LocalizationProvider
      value={{
        lang,
        setLang,
        i18nQL,
      }}
    >
      <Header />
      <Outlet />
      {/* TODO: remove after testing -> add test route */}
      <div className="flex gap-3">
        <Link to="/login">To login</Link>
        <Link to="/registration">To registrtion</Link>
        <Link to="/welcome">To welcome</Link>
        <Link to="/notfound">To 404</Link>
      </div>
      <Footer />
    </LocalizationProvider>
  );
}

export default Root;
