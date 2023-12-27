import { getIntrospectionQuery, IntrospectionQuery, buildClientSchema } from 'graphql';
import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { type RootState } from '../store';
import { AsyncStatus } from '@/types/AsyncStatus';

const introspectionQuery = getIntrospectionQuery();

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery({ baseUrl: '', method: 'POST' }),
  endpoints: (builder) => ({
    initRequest: builder.mutation<string, string>({
      queryFn: async (url, { getState, dispatch }, _extraOptions, fetchWithBQ) => {
        const { graphql } = getState() as RootState;

        if (
          !graphql.introspection.value ||
          graphql.introspection.endpoint !== graphql.endpointValue
        ) {
          dispatch(graphqlApi.endpoints.fetchIntrospection.initiate(url, { forceRefetch: true }));
        }

        const requestValue = graphql.requestValue.trim();

        const response = await fetchWithBQ({ url, body: { query: requestValue } });
        return response as QueryReturnValue<string, FetchBaseQueryError, FetchBaseQueryMeta>;
      },
    }),

    fetchIntrospection: builder.query<IntrospectionQuery, string>({
      query: (url) => ({
        url,
        body: { query: introspectionQuery },
      }),
      transformResponse: (res: { data: IntrospectionQuery }) => {
        return res.data;
      },
    }),
  }),
});

export const { useLazyFetchIntrospectionQuery, useInitRequestMutation } = graphqlApi;

export type GraphqlSliceState = {
  introspectStatus: AsyncStatus;
  introspection: { value: IntrospectionQuery | null; endpoint: string };
  requestValue: string;
  endpointValue: string;
};

const initialState: GraphqlSliceState = {
  introspectStatus: 'idle',
  introspection: { value: null, endpoint: '' },
  requestValue: '',
  endpointValue: '',
};

const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {
    changeRequestValue(state, action: PayloadAction<string>) {
      return { ...state, requestValue: action.payload };
    },
    changeEndpointValue(state, action: PayloadAction<string>) {
      return { ...state, endpointValue: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(graphqlApi.endpoints.fetchIntrospection.matchPending, (state) => {
        return { ...state, introspectStatus: 'pending' };
      })
      .addMatcher(graphqlApi.endpoints.fetchIntrospection.matchFulfilled, (state, action) => {
        return {
          ...state,
          introspectStatus: 'fullfilled',
          introspection: { value: action.payload, endpoint: action.meta.arg.originalArgs },
        };
      })
      .addMatcher(graphqlApi.endpoints.fetchIntrospection.matchRejected, (state) => {
        return {
          ...state,
          introspectStatus: 'rejected',
          introspection: { value: null, endpoint: '' },
        };
      });
  },
  selectors: {
    selectApiUrl: (state) => state.introspection.endpoint,
    selectIntrospectStatus: (state) => state.introspectStatus,
    selectRequestValue: (state) => state.requestValue,
    selectGraphQLSchema: createSelector(
      (state: GraphqlSliceState) => state.introspection.value,
      (introspection) => (introspection ? buildClientSchema(introspection) : undefined)
    ),
  },
});

export const graphqlReducer = graphqlSlice.reducer;
export const { changeRequestValue, changeEndpointValue } = graphqlSlice.actions;
export const { selectGraphQLSchema, selectApiUrl, selectRequestValue, selectIntrospectStatus } =
  graphqlSlice.selectors;
