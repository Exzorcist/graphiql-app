import { screen } from '@testing-library/react';
import Header from '@/components/Common/Header';
import { customRender as render } from '@/__tests__/test-utils';

test('[ Header ]: base test', () => {
  render(<Header />);

  expect(screen.getByText('GQL sandbox')).toBeInTheDocument();
});
