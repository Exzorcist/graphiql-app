import { screen } from '@testing-library/react';
import GraphqlEditor from '@/components/GraphqlEditor/GraphqlEditor';
import { customRender as render } from '../test-utils';

test('GraphqlEditor', async () => {
  render(<GraphqlEditor />);

  expect(screen.getByText('Variables')).toBeInTheDocument();
  expect(screen.getByText('Headers')).toBeInTheDocument();
});
