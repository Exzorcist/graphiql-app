import { screen, render } from '@testing-library/react';
import Footer from '@/components/Common/Footer';

test('[ Footer ]: base test', async () => {
  render(<Footer />);

  expect(screen.getByText('"Just Do It" team')).toBeInTheDocument();
  expect(screen.getByText('2023')).toBeInTheDocument();
  expect(screen.getByLabelText('GraphQL Logo github')).toBeInTheDocument();
  expect(screen.getByLabelText('RSSchool Logo')).toBeInTheDocument();
});
