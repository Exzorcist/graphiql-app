import { Outlet } from 'react-router-dom';

import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';

import ThemeProvider from '@/providers/ThemeProvider';
import LocalizationProvider from '@/providers/LocalizationProvider';
import Unsubscribe from '@/components/Common/Unsubscribe/Unsubscribe';

function Root() {
  return (
    <ThemeProvider>
      <LocalizationProvider>
        <Unsubscribe />
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
