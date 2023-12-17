import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LocalizationProvider } from '@/providers/LocalizationProvider';
import { testProviderData } from '@/__tests__/data/provider';
import Header from '@/components/Common/Header';

test('[ Header ]: base test', () => {
  render(
    <MemoryRouter>
      <LocalizationProvider value={testProviderData}>
        <Header />
      </LocalizationProvider>
    </MemoryRouter>
  );

  expect(screen.getByText('GQL sandbox')).toBeInTheDocument();
});
