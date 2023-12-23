import { getIntrospectionQuery, IntrospectionQuery, buildClientSchema } from 'graphql';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector, createSlice } from '@reduxjs/toolkit';

const introspectionQuery = getIntrospectionQuery();

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery({ baseUrl: '', method: 'POST' }),
  endpoints: (builder) => ({
    fetchIntrospection: builder.query<IntrospectionQuery, string>({
      query: (url) => ({
        url,
        body: { query: introspectionQuery },
      }),
      transformResponse: (res: { data: IntrospectionQuery }) => res.data,
    }),
  }),
});

export const { useLazyFetchIntrospectionQuery } = graphqlApi;

export type GraphqlSliceState = {
  introspectStatus: 'idle' | 'pending' | 'fullfilled' | 'rejected';
  introspection: IntrospectionQuery | null;
  apiUrl: string;
};

const initialState: GraphqlSliceState = {
  introspectStatus: 'idle',
  introspection: null,
  apiUrl: '',
};

export const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(graphqlApi.endpoints.fetchIntrospection.matchPending, (state) => {
        return { ...state, introspectStatus: 'pending' };
      })
      .addMatcher(graphqlApi.endpoints.fetchIntrospection.matchFulfilled, (state, action) => {
        return {
          ...state,
          introspectStatus: 'fullfilled',
          introspection: action.payload,
          apiUrl: action.meta.arg.originalArgs,
        };
      })
      .addMatcher(graphqlApi.endpoints.fetchIntrospection.matchRejected, (state) => {
        return { ...state, introspectStatus: 'rejected', introspection: null };
      });
  },
  selectors: {
    selectApiUrl: (state) => state.apiUrl,
    selectIntrospectStatus: (state) => state.introspectStatus,
    selectGraphQLSchema: createSelector(
      (state: GraphqlSliceState) => state.introspection,
      (introspection) => introspection && buildClientSchema(introspection)
    ),
  },
});

export const { selectGraphQLSchema, selectApiUrl, selectIntrospectStatus } = graphqlSlice.selectors;
