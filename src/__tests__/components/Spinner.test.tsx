import { IntrospectionQuery, buildClientSchema } from 'graphql';
// import { screen } from '@testing-library/react';
import DocsExplorer from '@/components/GraphqlEditor/DocsEplorer/DocsExplorer';
import introspectionResponse from '../fixtures/introspectionResponse.json';
import { customRender as render } from '../test-utils';
import { initialState } from '@/redux/slices/graphql/graphqlSlice';
import Spinner from '@/components/ui/Spinner';

test('Spinner test', async () => {
  render(<DocsExplorer />, {
    preloadedState: {
      graphql: {
        ...initialState,
        schema: buildClientSchema(introspectionResponse as unknown as IntrospectionQuery),
        introspection: {
          data: introspectionResponse as unknown as IntrospectionQuery,
          endpoint: 'https://spacex-production.up.railway.app/',
          status: 'pending',
        },
        _persist: {
          version: 1,
          rehydrated: true,
        },
      },
    },
  });

  expect(await (<Spinner />));
});
