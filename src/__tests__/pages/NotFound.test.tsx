import { screen, render } from '@testing-library/react';
import { LocalizationProvider } from '@/providers/LocalizationProvider';
import { testProviderData } from '@/__tests__/data/provider';
import NotFound from '@/pages/NotFound';

test('[ NotFound ]: base test', () => {
  render(
    <LocalizationProvider value={testProviderData}>
      <NotFound />
    </LocalizationProvider>
  );
  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Sorry, page not found!')).toBeInTheDocument();
});
