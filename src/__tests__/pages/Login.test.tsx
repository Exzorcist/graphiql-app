import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Login from '@/pages/Login';

test('[ Registration ]: base test', () => {
  render(
    <MemoryRouter initialEntries={['/login/']}>
      <Provider store={store}>
        <Login />
      </Provider>
    </MemoryRouter>
  );
  expect(screen.getByText('SignIn')).toBeInTheDocument();
});
