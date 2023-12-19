import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import LocalizationProvider from '@/providers/LocalizationProvider';
import NotFound from '@/pages/NotFound';
import { store } from '@/redux/store';

test('[ NotFound ]: base test', () => {
  render(
    <Provider store={store}>
      <LocalizationProvider>
        <NotFound />
      </LocalizationProvider>
    </Provider>
  );

  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Sorry, page not found!')).toBeInTheDocument();
});
