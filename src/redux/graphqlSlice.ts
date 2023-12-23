import {
  getIntrospectionQuery,
  IntrospectionQuery,
  buildClientSchema,
  buildSchema,
  printSchema,
} from 'graphql';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';

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

type SliceState = {
  introspection: IntrospectionQuery | null;
  apiUrl: string;
};

const initialState: SliceState = { introspection: null, apiUrl: '' };

export const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(graphqlApi.endpoints.fetchIntrospection.matchFulfilled),
      (state, action) => {
        return { ...state, introspection: action.payload, apiUrl: action.meta.arg.originalArgs };
      }
    );
  },
  selectors: {
    selectApiUrl: (state) => state.apiUrl,
    selectGraphQLSchema: createSelector(
      (state: SliceState) => state.introspection,
      (introspection) => introspection && buildSchema(printSchema(buildClientSchema(introspection)))
    ),
  },
});

export const { selectGraphQLSchema, selectApiUrl } = graphqlSlice.selectors;
