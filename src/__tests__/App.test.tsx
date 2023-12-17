import { screen, render } from '@testing-library/react';
import App from '@/App';

test('[ App ]: base test', () => {
  render(<App />);
  expect(screen.getByText('This is a GraphqlEditor page')).toBeInTheDocument();
});
