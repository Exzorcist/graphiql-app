import { fireEvent, screen, waitFor } from '@testing-library/react';
import GraphqlEditor from '@/components/GraphqlEditor/GraphqlEditor';
import { customRender as render } from '../test-utils';

test('Error Messages with no entering url are rendered', async () => {
  render(<GraphqlEditor />);

  expect(screen.getByPlaceholderText('Enter URL')).toBeInTheDocument();
  expect(screen.getAllByRole('button')[1]).toBeInTheDocument();

  waitFor(() => {
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(
      screen.getByText('GraphQL Error: Document does not contain any operations')
    ).toBeInTheDocument();
    expect(screen.getByText('Unable to reach the serverq')).toBeInTheDocument();
  });
});
