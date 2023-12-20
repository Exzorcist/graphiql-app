import { screen, fireEvent } from '@testing-library/react';
import SwitchLang from '@/components/Common/Header/SwitchLang';
import { customRender as render } from '@/__tests__/test-utils';

test('[ SwitchLang ]: base test', () => {
  render(<SwitchLang />);

  expect(screen.getByText('eng')).toBeInTheDocument();
  expect(screen.getByText('English')).toBeInTheDocument();
  expect(screen.getByText('Русский')).toBeInTheDocument();
  expect(screen.getByText('Беларускі')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Русский'));
});
