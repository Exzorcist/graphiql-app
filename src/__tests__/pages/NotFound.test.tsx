import { screen, render } from '@testing-library/react';
import LocalizationProvider from '@/providers/LocalizationProvider';
import NotFound from '@/pages/NotFound';

test('[ NotFound ]: base test', () => {
  render(
    <LocalizationProvider>
      <NotFound />
    </LocalizationProvider>
  );

  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Sorry, page not found!')).toBeInTheDocument();
});
