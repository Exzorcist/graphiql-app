import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LocalizationProvider } from '@/providers/LocalizationProvider';

import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';

import EngJSON from '@/json/eng.json';
import RuJSON from '@/json/ru.json';
import ByJSON from '@/json/by.json';

import { Language } from '@/types/Provider';
import ThemeProvider from '@/providers/ThemeProvider';

function Root() {
  const [lang, setLang] = useState<Language>('eng');
  const i18nQL = {
    eng: EngJSON,
    ru: RuJSON,
    by: ByJSON,
  };

  return (
    <ThemeProvider>
      <LocalizationProvider
        value={{
          lang,
          setLang,
          i18nQL,
        }}
      >
        <div className="h-screen flex flex-col">
          <Header />
          <div className="flex-grow">
            <Outlet />
          </div>
          <Footer />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default Root;
