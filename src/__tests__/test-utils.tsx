import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from '@/providers/ThemeProvider';
import LocalizationProvider from '@/providers/LocalizationProvider';
import { store } from '@/redux/store';

export const user = userEvent.setup();

interface ExtendedRenderOptions extends RenderOptions {
  initialEntries?: string[];
}

export const customRender = (
  ui: ReactElement,
  options?: Omit<ExtendedRenderOptions, 'wrapper'>
) => {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <LocalizationProvider>
            <MemoryRouter initialEntries={options?.initialEntries ?? ['/']}>
              {children}
            </MemoryRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
};
