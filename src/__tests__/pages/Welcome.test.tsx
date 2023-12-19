import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import LocalizationProvider from '@/providers/LocalizationProvider';
import Welcome from '@/pages/Welcome';
import { store } from '@/redux/store';

test('[ Welcome ]: base test', () => {
  render(
    <Provider store={store}>
      <LocalizationProvider>
        <Welcome />
      </LocalizationProvider>
    </Provider>
  );

  expect(screen.getByText('Welcome to the GraphQL sandbox!')).toBeInTheDocument();
});
