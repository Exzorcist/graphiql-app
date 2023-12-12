import { Outlet } from 'react-router-dom';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
