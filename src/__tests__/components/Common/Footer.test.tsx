import { screen, render } from '@testing-library/react';
import Footer from '@/components/Common/Footer';

test('[ Footer ]: base test', async () => {
  render(<Footer />);

  expect(screen.getByAltText('GraphQL Logo github')).toBeInTheDocument();
  expect(screen.getByAltText('RSSchool Logo')).toBeInTheDocument();
});
