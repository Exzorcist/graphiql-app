import { IntrospectionQuery, buildClientSchema, getIntrospectionQuery } from 'graphql';
import { createApi } from '@reduxjs/toolkit/query/react';
import { setGraphqlSchema, setIntrospection } from './commonActions';
import { handleFetchErrorThunk } from './handleRequestErrorThunk';
import { emptySchema } from '@/utils/emptyGraphqlSchema';
import { customBaseQuery } from './customBaseQuery';
import { setMessage } from '../globalMessageSlice';
import { getSchemaReloadMsg } from './utils';
import { RootState } from '@/redux/store';

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    initRequest: builder.mutation<unknown, string | void>({
      queryFn: async (operationName, { getState, dispatch }, _extraOptions, fetchWithBQ) => {
        const state = getState() as RootState;
        const { graphql } = state;

        const response = await fetchWithBQ({
          url: graphql.endpointValue,
          body: { query: graphql.request.value, variables: graphql.variablesValue, operationName },
        });

        const err = response.error;

        if (err) {
          if (err.data) {
            return { ...response, data: err.data, error: undefined };
          }

          dispatch(handleFetchErrorThunk(err));
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
        } catch (err) {
          dispatch(setGraphqlSchema(emptySchema));
          dispatch(setIntrospection({ data: null, endpoint: '', status: 'rejected' }));

          if (err && typeof err === 'object' && 'error' in err) {
            dispatch(handleFetchErrorThunk(err.error));
          }
        }
      },
    }),
  }),
});

export const { useFetchIntrospectionMutation, useInitRequestMutation } = graphqlApi;
