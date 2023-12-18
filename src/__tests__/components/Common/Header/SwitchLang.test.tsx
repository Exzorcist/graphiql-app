import { render, screen, fireEvent } from '@testing-library/react';
import SwitchLang from '@/components/Common/Header/SwitchLang';
import LocalizationProvider from '@/providers/LocalizationProvider';

test('[ SwitchLang ]: base test', () => {
  render(
    <LocalizationProvider>
      <SwitchLang />
    </LocalizationProvider>
  );

  expect(screen.getByText('eng')).toBeInTheDocument();
  expect(screen.getByText('English')).toBeInTheDocument();
  expect(screen.getByText('Русский')).toBeInTheDocument();
  expect(screen.getByText('Беларускі')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Русский'));
});
