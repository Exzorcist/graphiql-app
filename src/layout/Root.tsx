import { Outlet } from 'react-router-dom';

import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';

import ThemeProvider from '@/providers/ThemeProvider';
import LocalizationProvider from '@/providers/LocalizationProvider';

function Root() {
  return (
    <ThemeProvider>
      <LocalizationProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow grid">
            <Outlet />
          </div>
          <Footer />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default Root;
