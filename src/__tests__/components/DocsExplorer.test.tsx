import { IntrospectionQuery, buildClientSchema } from 'graphql';
import { screen } from '@testing-library/react';
import introspectionResponse from '../fixtures/introspectionResponse.json';
import { customRender as render } from '../test-utils';
import { initialState } from '@/redux/slices/graphql/graphqlSlice';
import DocsExplorerContainer from '@/components/GraphqlEditor/DocsEplorer/DocsExplorerContainer';

test('DocsEplorer', async () => {
  render(<DocsExplorerContainer />, {
    preloadedState: {
      graphql: {
        ...initialState,
        schema: buildClientSchema(introspectionResponse as unknown as IntrospectionQuery),
        introspection: {
          data: introspectionResponse as unknown as IntrospectionQuery,
          endpoint: 'https://spacex-production.up.railway.app/',
          status: 'fullfilled',
        },
        _persist: {
          version: 1,
          rehydrated: true,
        },
      },
    },
  });

  expect(screen.getByText('Documentation')).toBeInTheDocument();
  expect(document.body).toMatchSnapshot();

  // await waitFor(
  //   () => {
  //     expect(screen.getByText('Query')).toBeInTheDocument();
  //   },
  //   { timeout: 10000 }
  // );

  // await user.click(screen.getByText('Query'));

  // expect(screen.getByText('Fields')).toBeInTheDocument();
  // const capsuleField = screen.getAllByRole('button', { name: /capsule/ })[0];
  // expect(capsuleField).toBeInTheDocument();

  // await user.click(capsuleField);

  // expect(await screen.findByText('Arguments')).toBeInTheDocument();
});
