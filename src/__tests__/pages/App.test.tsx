import { screen, render } from '@testing-library/react';
import App from '@/App';
import { user } from '../test-utils';

test('Render App', async () => {
  render(<App />);
  expect(screen.getByText('GQL sandbox')).toBeInTheDocument();
  await user.click(screen.getByText('eng'));
  expect(screen.getByText('English')).toBeInTheDocument();
});
