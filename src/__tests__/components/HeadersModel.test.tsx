import { screen } from '@testing-library/react';
import { customRender as render, user } from '../test-utils';
import HeadersModel from '@/components/GraphqlEditor/GraphqlTools/HeadersModel';

test('GraphqlEditor', async () => {
  render(<HeadersModel />);

  expect(screen.getByText('Add new header')).toBeInTheDocument();
  await user.click(screen.getByText('Add new header'));

  expect(await screen.findByPlaceholderText('header key')).toBeInTheDocument();
  expect(await screen.findByPlaceholderText('value')).toBeInTheDocument();
  expect(await screen.findByTestId('delete-header-button')).toBeInTheDocument();

  await user.click(screen.getByTestId('delete-header-button'));

  expect(screen.queryByPlaceholderText('header key')).toBeNull();
  expect(screen.queryByPlaceholderText('value')).toBeNull();
});
