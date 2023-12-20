import { screen } from '@testing-library/react';
import NotFound from '@/pages/NotFound';
import { customRender as render } from '@/__tests__/test-utils';

test('[ NotFound ]: base test', () => {
  render(<NotFound />);

  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Sorry, page not found!')).toBeInTheDocument();
});
