import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Registration from '@/pages/Registration';

test('[ Registration ]: base test', () => {
  render(
    <MemoryRouter initialEntries={['/registration/']}>
      <Provider store={store}>
        <Registration />
      </Provider>
    </MemoryRouter>
  );
  expect(screen.getByText('SignUp')).toBeInTheDocument();
});
