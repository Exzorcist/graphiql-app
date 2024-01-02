import { getIntrospectionQuery, IntrospectionQuery, buildClientSchema } from 'graphql';
import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { isFetchBaseQueryError, isErrorWithMessage } from '@/utils/type-guards';
import { emptySchema } from '@/utils/emptyGraphqlSchema';
import { AsyncStatus } from '@/types/AsyncStatus';
import { setMessage } from './globalMessageSlice';
import { Language } from '@/types/Provider';
import { locale } from '@/locale/locale';
import { type RootState } from '../store';

function getFetchErrorMsg(err: FetchBaseQueryError, lang: Language) {
  if (err.status === 'FETCH_ERROR' || !err.data) {
    return locale[lang].globalMessage.error.serverUnreachable;
  }

  return 'error' in err ? err.error : JSON.stringify(err.data);
}

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery({ baseUrl: '', method: 'POST' }),
  endpoints: (builder) => ({
    initRequest: builder.mutation<unknown, string>({
      queryFn: async (url, { getState, dispatch }, _extraOptions, fetchWithBQ) => {
        const { graphql, localization } = getState() as RootState;

        if (
          !graphql.introspection.value ||
          graphql.introspection.endpoint !== graphql.endpointValue
        ) {
          dispatch(graphqlApi.endpoints.fetchIntrospection.initiate(url));
        }

        const response = await fetchWithBQ({
          url,
          body: { query: graphql.requestValue, variables: graphql.variablesValue },
        });

        const err = response.error;

        if (err) {
          if (err.data) {
            return { data: err.data };
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

        return response as QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>;
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
  responseValue: unknown;
  variablesValue: object;
  hasRequestEditorLintErrors: boolean;
};

const initialState: GraphqlSliceState = {
  introspectStatus: 'idle',
  introspection: { value: null, endpoint: '' },
  requestValue: '',
  endpointValue: '',
  responseValue: '',
  variablesValue: {},
  hasRequestEditorLintErrors: false,
};

const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {
    changeRequestValue(state, action: PayloadAction<string>) {
      state.requestValue = action.payload;
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
        state.introspectStatus = 'pending';
      })
      .addMatcher(graphqlApi.endpoints.fetchIntrospection.matchFulfilled, (state, action) => {
        return {
          ...state,
          introspectStatus: 'fullfilled',
          introspection: { value: action.payload, endpoint: action.meta.arg.originalArgs },
        };
      })
      .addMatcher(graphqlApi.endpoints.fetchIntrospection.matchRejected, (state) => {
        state.introspectStatus = 'rejected';
        state.introspection = { value: null, endpoint: '' };
      })
      .addMatcher(graphqlApi.endpoints.initRequest.matchFulfilled, (state, action) => {
        state.responseValue = action.payload;
      });
  },

  selectors: {
    selectRequestValue: (state) => state.requestValue,
    selectEndpointValue: (state) => state.endpointValue,
    selectResponseValue: (state) => state.responseValue,
    selectVariablesValue: (state) => state.variablesValue,
    selectHasRequestEditorLintErrors: (state) => state.hasRequestEditorLintErrors,
    selectIntrospectStatus: (state) => state.introspectStatus,
    selectIntrospectEndpoint: (state) => state.introspection.endpoint,
    selectGraphQLSchema: createSelector(
      (state: GraphqlSliceState) => state.introspection.value,
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
  selectEndpointValue,
  selectRequestValue,
  selectResponseValue,
  selectVariablesValue,
  selectIntrospectStatus,
  selectIntrospectEndpoint,
} = graphqlSlice.selectors;
