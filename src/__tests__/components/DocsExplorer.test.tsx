import { IntrospectionQuery } from 'graphql';
import { screen } from '@testing-library/react';
import DocsExplorer from '@/components/GraphqlEditor/DocsEplorer/DocsExplorer';
import introspectionResponse from '../fixtures/introspectionResponse.json';
import { customRender as render, user } from '../test-utils';

test('DocsEplorer', async () => {
  render(<DocsExplorer />, {
    preloadedState: {
      graphql: {
        introspection: introspectionResponse as unknown as IntrospectionQuery,
        introspectStatus: 'fullfilled',
        apiUrl: 'https://spacex-production.up.railway.app/',
        _persist: { version: -1, rehydrated: true },
      },
    },
  });

  expect(screen.getByText('Documentation')).toBeInTheDocument();
  expect(document.body).toMatchSnapshot();

  await user.click(screen.getByText('Query'));

  expect(screen.getByText('Fields')).toBeInTheDocument();
  const capsuleField = screen.getAllByRole('button', { name: /capsule/ })[0];
  expect(capsuleField).toBeInTheDocument();

  await user.click(capsuleField);

  expect(await screen.findByText('Arguments')).toBeInTheDocument();
});
