import { screen } from '@testing-library/react';
import { customRender as render } from '@/__tests__/test-utils';
import GraphqlEditorPage from '@/pages/GraphqlEditorPage';

test('GraphqlEditorPage rendered', () => {
  render(<GraphqlEditorPage />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
