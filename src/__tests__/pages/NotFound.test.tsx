import { screen, render } from '@testing-library/react';
import NotFound from '@/pages/NotFound';

test('[ NotFound ]: base test', () => {
  render(<NotFound />);
  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Sorry, page not found!')).toBeInTheDocument();
});
