import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import SwitchLang from '@/components/Common/Header/SwitchLang';
import LocalizationProvider from '@/providers/LocalizationProvider';
import { store } from '@/redux/store';

test('[ SwitchLang ]: base test', () => {
  render(
    <Provider store={store}>
      <LocalizationProvider>
        <SwitchLang />
      </LocalizationProvider>
    </Provider>
  );

  expect(screen.getByText('eng')).toBeInTheDocument();
  expect(screen.getByText('English')).toBeInTheDocument();
  expect(screen.getByText('Русский')).toBeInTheDocument();
  expect(screen.getByText('Беларускі')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Русский'));
});
