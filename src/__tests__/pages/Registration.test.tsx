import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Registration from '@/pages/Registration';
import { LocalizationProvider } from '@/provider/LocalizationProvider';
import { testProviderData } from '@/__tests__/data/provider';

test('[ Registration ]: base test', () => {
  render(
    <MemoryRouter initialEntries={['/registration/']}>
      <Provider store={store}>
        <LocalizationProvider value={testProviderData}>
          <Registration />
        </LocalizationProvider>
      </Provider>
    </MemoryRouter>
  );
  expect(screen.getByText('SignUp')).toBeInTheDocument();
});
