import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import LocalizationProvider from '@/providers/LocalizationProvider';
import Header from '@/components/Common/Header';
import { store } from '@/redux/store';

test('[ Header ]: base test', () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <LocalizationProvider>
          <Header />
        </LocalizationProvider>
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByText('GQL sandbox')).toBeInTheDocument();
});
