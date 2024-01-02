import { getIntrospectionQuery, IntrospectionQuery, buildClientSchema } from 'graphql';
import { createApi } from '@reduxjs/toolkit/query/react';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { isFetchBaseQueryError, isErrorWithMessage } from '@/utils/type-guards';
import { emptySchema } from '@/utils/emptyGraphqlSchema';
import { AsyncStatus } from '@/types/AsyncStatus';
import { setMessage } from '../globalMessageSlice';
import { type RootState } from '../../store';
import { CustomBaseQueryMeta, customBaseQuery } from './customBaseQuery';
import { getFetchErrorMsg } from './getFetchErrorMsg';

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    initRequest: builder.mutation<unknown, string>({
      queryFn: async (url, { getState, dispatch }, _extraOptions, fetchWithBQ) => {
        const { graphql, localization } = getState() as RootState;

        if (
          !graphql.introspection.data ||
          graphql.introspection.endpoint !== graphql.endpointValue
        ) {
          dispatch(graphqlApi.endpoints.fetchIntrospection.initiate(url));
        }

        const response = await fetchWithBQ({
          url,
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
    }),
  }),
});

export const { useFetchIntrospectionMutation, useInitRequestMutation } = graphqlApi;

export type GraphqlSliceState = {
  introspection: { data: IntrospectionQuery | null; endpoint: string; status: AsyncStatus };
  response: {
    data: unknown;
    statusCode?: number;
    responseTime?: number;
  } | null;
  request: { value: string; status: AsyncStatus };
  endpointValue: string;
  variablesValue: object;
  hasRequestEditorLintErrors: boolean;
};

const initialState: GraphqlSliceState = {
  introspection: { data: null, endpoint: '', status: 'idle' },
  request: { value: '', status: 'idle' },
  hasRequestEditorLintErrors: false,
  variablesValue: {},
  endpointValue: '',
  response: null,
};

const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {
    changeRequestValue(state, action: PayloadAction<string>) {
      state.request.value = action.payload;
    },
    changeEndpointValue(state, action: PayloadAction<string>) {
      state.endpointValue = action.payload;
    },
    changeVariablesValue(state, action: PayloadAction<object>) {
      state.variablesValue = action.payload;
    },
    setHasRequestEditorLintErrors(state, action: PayloadAction<boolean>) {
      state.hasRequestEditorLintErrors = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addMatcher(graphqlApi.endpoints.fetchIntrospection.matchPending, (state) => {
        state.introspection.status = 'pending';
      })
      .addMatcher(graphqlApi.endpoints.fetchIntrospection.matchFulfilled, (state, action) => {
        return {
          ...state,
          introspection: {
            data: action.payload,
            endpoint: action.meta.arg.originalArgs,
            status: 'fullfilled',
          },
        };
      })
      .addMatcher(graphqlApi.endpoints.fetchIntrospection.matchRejected, (state) => {
        state.introspection = { data: null, endpoint: '', status: 'rejected' };
      })
      .addMatcher(graphqlApi.endpoints.initRequest.matchFulfilled, (state, action) => {
        const meta = action.meta.baseQueryMeta as CustomBaseQueryMeta | undefined;
        const responseTime = meta?.responseTime;
        const statusCode = meta?.response?.status;

        state.request.status = 'fullfilled';
        state.response = { data: action.payload, statusCode, responseTime };
      })
      .addMatcher(graphqlApi.endpoints.initRequest.matchPending, (state) => {
        state.request.status = 'pending';
      })
      .addMatcher(graphqlApi.endpoints.initRequest.matchRejected, (state) => {
        state.request.status = 'rejected';
      });
  },

  selectors: {
    selectResponse: (state) => state.response,
    selectRequestStatus: (state) => state.request.status,
    selectRequestValue: (state) => state.request.value,
    selectEndpointValue: (state) => state.endpointValue,
    selectResponseValue: (state) => state.response?.data,
    selectVariablesValue: (state) => state.variablesValue,
    selectIntrospectStatus: (state) => state.introspection.status,
    selectIntrospectEndpoint: (state) => state.introspection.endpoint,
    selectHasRequestEditorLintErrors: (state) => state.hasRequestEditorLintErrors,
    selectGraphQLSchema: createSelector(
      (state: GraphqlSliceState) => state.introspection.data,
      (introspection) => (introspection ? buildClientSchema(introspection) : emptySchema)
    ),
  },
});

export const graphqlReducer = graphqlSlice.reducer;

export const {
  changeRequestValue,
  changeEndpointValue,
  changeVariablesValue,
  setHasRequestEditorLintErrors,
} = graphqlSlice.actions;

export const {
  selectHasRequestEditorLintErrors,
  selectGraphQLSchema,
  selectRequestStatus,
  selectEndpointValue,
  selectRequestValue,
  selectResponse,
  selectResponseValue,
  selectVariablesValue,
  selectIntrospectStatus,
  selectIntrospectEndpoint,
} = graphqlSlice.selectors;
