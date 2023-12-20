import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Footer from '@/components/Common/Footer';
import { store } from '@/redux/store';
import LocalizationProvider from '@/providers/LocalizationProvider';

test('[ Footer ]: base test', async () => {
  render(
    <Provider store={store}>
      <LocalizationProvider>
        <Footer />
      </LocalizationProvider>
    </Provider>
  );

  expect(screen.getByText('"Just Do It" team')).toBeInTheDocument();
  expect(screen.getByText('2023')).toBeInTheDocument();
  expect(screen.getByLabelText('GraphQL Logo github')).toBeInTheDocument();
  expect(screen.getByLabelText('RSSchool Logo')).toBeInTheDocument();
});
