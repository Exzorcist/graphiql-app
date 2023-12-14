import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Login from '@/pages/Login';
import { LocalizationProvider } from '@/provider/LocalizationProvider';
import { testProviderData } from '@/__tests__/data/provider';

test('[ Registration ]: base test', () => {
  render(
    <MemoryRouter initialEntries={['/login/']}>
      <Provider store={store}>
        <LocalizationProvider value={testProviderData}>
          <Login />
        </LocalizationProvider>
      </Provider>
    </MemoryRouter>
  );
  expect(screen.getByText('SignIn')).toBeInTheDocument();
});
