import { IntrospectionQuery, buildClientSchema, getIntrospectionQuery } from 'graphql';
import { createApi } from '@reduxjs/toolkit/query/react';
import { isFetchBaseQueryError, isErrorWithMessage } from '@/utils/type-guards';
import { setGraphqlSchema, setIntrospection } from './commonActions';
import { emptySchema } from '@/utils/emptyGraphqlSchema';
import { customBaseQuery } from './customBaseQuery';
import { setMessage } from '../globalMessageSlice';
import { getFetchErrorMsg, getSchemaReloadMsg } from './utils';
import { RootState } from '@/redux/store';
import { selectHeaderMap } from './headersAdapter';

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    initRequest: builder.mutation<unknown, string>({
      queryFn: async (url, { getState, dispatch }, _extraOptions, fetchWithBQ) => {
        const state = getState() as RootState;
        const { graphql, localization } = state;

        const response = await fetchWithBQ({
          url,
          headers: selectHeaderMap(state),
          body: { query: graphql.request.value, variables: graphql.variablesValue },
        });

        const err = response.error;

        if (err) {
          if (err.data) {
            return { ...response, data: err.data, error: undefined };
          }

          if (isFetchBaseQueryError(err as unknown)) {
            dispatch(
              setMessage({
                type: 'error',
                isShown: true,
                text: getFetchErrorMsg(err, localization),
              })
            );
          } else if (isErrorWithMessage(err)) {
            dispatch(setMessage({ type: 'error', isShown: true, text: err.message }));
          }
        }

        return response;
      },
    }),

    fetchIntrospection: builder.mutation<IntrospectionQuery, string>({
      query: (url) => ({
        url,
        body: { query: getIntrospectionQuery() },
      }),
      transformResponse: (res: { data: IntrospectionQuery }) => {
        return res.data;
      },
      onQueryStarted: async (arg, { getState, queryFulfilled, dispatch }) => {
        dispatch(setIntrospection({ status: 'pending' }));
        const { localization } = getState() as RootState;

        try {
          const resp = await queryFulfilled;
          dispatch(setGraphqlSchema(buildClientSchema(resp.data)));
          dispatch(setIntrospection({ data: resp.data, endpoint: arg, status: 'fullfilled' }));
          dispatch(
            setMessage({ text: getSchemaReloadMsg(localization), isShown: true, type: 'success' })
          );
        } catch (error) {
          dispatch(setGraphqlSchema(emptySchema));
          dispatch(setIntrospection({ data: null, endpoint: '', status: 'rejected' }));
        }
      },
    }),
  }),
});

export const { useFetchIntrospectionMutation, useInitRequestMutation } = graphqlApi;
