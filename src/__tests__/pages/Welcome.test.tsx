import { screen, render } from '@testing-library/react';
import LocalizationProvider from '@/providers/LocalizationProvider';
import Welcome from '@/pages/Welcome';

test('[ Welcome ]: base test', () => {
  render(
    <LocalizationProvider>
      <Welcome />
    </LocalizationProvider>
  );

  expect(screen.getByText('Welcome to the GraphQL sandbox!')).toBeInTheDocument();
});
