import {
  getIntrospectionQuery,
  IntrospectionQuery,
  buildClientSchema,
  buildSchema,
  printSchema,
} from 'graphql';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type RootState } from './store';

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
};

const initialState: SliceState = { introspection: null };

export const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(graphqlApi.endpoints.fetchIntrospection.matchFulfilled),
      (state, action) => {
        return { ...state, introspection: action.payload };
      }
    );
  },
});

export const selectGraphqlSchema = createSelector(
  (state: RootState) => state.graphql.introspection,
  (introspection) => introspection && buildSchema(printSchema(buildClientSchema(introspection)))
);
