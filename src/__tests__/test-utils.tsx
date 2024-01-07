import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from '@/providers/ThemeProvider';
import LocalizationProvider from '@/providers/LocalizationProvider';
import { RootState, setupStore } from '@/redux/store';

export const user = userEvent.setup();

interface ExtendedRenderOptions extends RenderOptions {
  initialEntries?: string[];
  preloadedState?: Partial<RootState>;
}

export const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    initialEntries,
    ...renderOptions
  }: Omit<ExtendedRenderOptions, 'wrapper'> = {}
) => {
  const store = setupStore(preloadedState);

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <LocalizationProvider>
            <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
