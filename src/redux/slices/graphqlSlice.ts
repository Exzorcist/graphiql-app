import { getIntrospectionQuery, IntrospectionQuery, buildClientSchema } from 'graphql';
import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { AsyncStatus } from '@/types/AsyncStatus';
import { setMessage } from './globalMessageSlice';
import { isFetchBaseQueryError, isErrorWithMessage } from '@/utils/type-guards';

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery({ baseUrl: '', method: 'POST' }),
  endpoints: (builder) => ({
    initRequest: builder.mutation<unknown, string>({
      queryFn: async (url, { getState, dispatch }, _extraOptions, fetchWithBQ) => {
        const { graphql } = getState() as RootState;

        if (
          !graphql.introspection.value ||
          graphql.introspection.endpoint !== graphql.endpointValue
        ) {
          dispatch(graphqlApi.endpoints.fetchIntrospection.initiate(url));
        }

        const requestValue = graphql.requestValue.trim();

        const response = await fetchWithBQ({ url, body: { query: requestValue } });

        if (response.error) {
          if (response.error.data) {
            return { data: response.error.data };
          }

          if (isFetchBaseQueryError(response.error)) {
            const errMsg =
              'error' in response.error
                ? response.error.error
                : JSON.stringify(response.error.data);

            dispatch(setMessage({ type: 'error', isShown: true, text: errMsg }));
          } else if (isErrorWithMessage(response.error)) {
            dispatch(setMessage({ type: 'error', isShown: true, text: response.error }));
          }
        }

        return response as QueryReturnValue<string, FetchBaseQueryError, FetchBaseQueryMeta>;
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
    }),
  }),
});

export const { useFetchIntrospectionMutation, useInitRequestMutation } = graphqlApi;

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
