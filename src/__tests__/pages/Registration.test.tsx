import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Registration from '@/pages/Registration';
import LocalizationProvider from '@/providers/LocalizationProvider';

test('[ Registration ]: base test', () => {
  render(
    <MemoryRouter initialEntries={['/registration/']}>
      <Provider store={store}>
        <LocalizationProvider>
          <Registration />
        </LocalizationProvider>
      </Provider>
    </MemoryRouter>
  );
  expect(screen.getByText('SignUp')).toBeInTheDocument();
  expect(screen.getByLabelText('buttonLink')).toBeInTheDocument();
  expect(screen.getAllByLabelText('buttonEye')[0]).toBeInTheDocument();
  expect(screen.getByLabelText('emailIput')).toBeInTheDocument();
  expect(screen.getByLabelText('passwordIput')).toBeInTheDocument();
  expect(screen.getByLabelText('form')).toBeInTheDocument();
  waitFor(() => {
    const mockLogin = vi.fn();
    fireEvent.submit(screen.getByLabelText('form'));
    expect(mockLogin).not.toHaveBeenCalled();
    expect(screen.getByText('This is a GraphqlEditor page')).toBeInTheDocument();
  });
  waitFor(() => {
    fireEvent.change(screen.getByLabelText('emailIput'), { target: { value: '23' } });
    expect(screen.getByLabelText('emailIput')).toHaveValue('23');
  });
  waitFor(() => {
    fireEvent.change(screen.getByLabelText('passwordIput'), { target: { value: '23' } });
    expect(screen.getByLabelText('passwordIput')).toHaveValue('23');
  });
  waitFor(() => {
    fireEvent.click(screen.getByLabelText('emailIput'));
    expect(screen.getByLabelText('passwordIput')).toHaveValue();
  });
  waitFor(() => {
    fireEvent.click(screen.getByLabelText('buttonLink'));
    expect(screen.getByText('This is a GraphqlEditor page')).toBeInTheDocument();
  });
  waitFor(() => {
    fireEvent.click(screen.getAllByLabelText('buttonEye')[0]);
    expect(screen.getAllByLabelText('buttonEyeSlash')[0]).toBeInTheDocument();
    fireEvent.click(screen.getAllByLabelText('buttonEyeSlash')[0]);
    expect(screen.getAllByLabelText('buttonEye')[0]).toBeInTheDocument();
  });
  waitFor(() => {
    fireEvent.click(screen.getAllByLabelText('buttonEye')[1]);
    expect(screen.getAllByLabelText('buttonEyeSlash')[1]).toBeInTheDocument();
    fireEvent.click(screen.getAllByLabelText('buttonEyeSlash')[1]);
    expect(screen.getAllByLabelText('buttonEye')[1]).toBeInTheDocument();
  });
});
