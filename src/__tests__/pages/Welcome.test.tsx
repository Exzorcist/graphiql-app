import { screen } from '@testing-library/react';
import Welcome from '@/pages/Welcome';
import { customRender as render } from '@/__tests__/test-utils';

test('[ Welcome ]: base test', () => {
  render(<Welcome />);

  expect(screen.getByText('Welcome to the GraphQL sandbox!')).toBeInTheDocument();
});
