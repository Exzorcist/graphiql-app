import { Outlet } from 'react-router-dom';

import { Suspense } from 'react-lazy-no-flicker';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import GlobalMessage from '@/components/ui/GlobalMessage';

import ThemeProvider from '@/providers/ThemeProvider';
import LocalizationProvider from '@/providers/LocalizationProvider';
import Unsubscribe from '@/components/Common/Unsubscribe/Unsubscribe';
import GlobalSpinner from '@/components/ui/GlobalSpinner';

function Root() {
  return (
    <ThemeProvider>
      <LocalizationProvider>
        <Unsubscribe />
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow grid relative">
            <Suspense fallback={<GlobalSpinner svgClassName="fill-main" />}>
              <Outlet />
            </Suspense>
          </div>
          <Footer />
        </div>

        <GlobalMessage />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default Root;
