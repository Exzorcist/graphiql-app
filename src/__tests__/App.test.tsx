import { screen, render } from '@testing-library/react';
import App from '@/App';

test('App', () => {
  render(<App />);
  expect(screen.getByText('Empty base page')).toBeInTheDocument();
});
