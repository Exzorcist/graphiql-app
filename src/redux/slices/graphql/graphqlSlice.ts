import { buildClientSchema, GraphQLSchema } from 'graphql';
import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { emptySchema } from '@/utils/emptyGraphqlSchema';
import { CustomBaseQueryMeta } from './customBaseQuery';
import { AsyncStatus } from '@/types/AsyncStatus';
import { graphqlApi } from './graphqlApi';
import { IntrospectionState } from './types';

export type GraphqlSliceState = {
  request: { value: string; status: AsyncStatus };
  hasRequestEditorLintErrors: boolean;
  introspection: IntrospectionState;
  schema: GraphQLSchema;
  response: {
    data: unknown;
    statusCode?: number;
    responseTime?: number;
  } | null;
  endpointValue: string;
  variablesValue: object;
};

export const initialState: GraphqlSliceState = {
  introspection: { data: null, endpoint: '', status: 'idle' },
  request: { value: '', status: 'idle' },
  hasRequestEditorLintErrors: false,
  variablesValue: {},
  endpointValue: '',
  response: null,
  schema: emptySchema,
};

export const graphqlSlice = createSlice({
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
    setGraphqlSchema(state, action: PayloadAction<GraphQLSchema>) {
      return { ...state, schema: action.payload };
    },
    setIntrospection(state, action: PayloadAction<Partial<IntrospectionState>>) {
      state.introspection = {
        ...state.introspection,
        ...action.payload,
      } as Draft<IntrospectionState>;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(REHYDRATE, (state, _action) => {
        const action = _action as PayloadAction<GraphqlSliceState | undefined> & { key: string };

        if (action.key === 'graphql' && action.payload?.introspection.data) {
          try {
            const schema = buildClientSchema(action.payload.introspection.data);
            return { ...state, schema };
          } catch (error) {
            return {
              ...state,
              introspection: initialState.introspection as Draft<IntrospectionState>,
            };
          }
        }

        return state;
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
    selectGraphQLSchema: (state) => state.schema,
    selectGraphQLDocsSchema: (state) => (state.schema === emptySchema ? null : state.schema),
    selectRequestValue: (state) => state.request.value,
    selectEndpointValue: (state) => state.endpointValue,
    selectRequestStatus: (state) => state.request.status,
    selectResponseValue: (state) => state.response?.data,
    selectVariablesValue: (state) => state.variablesValue,
    selectIntrospectStatus: (state) => state.introspection.status,
    selectIntrospectEndpoint: (state) => state.introspection.endpoint,
    selectHasRequestEditorLintErrors: (state) => state.hasRequestEditorLintErrors,
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
  selectGraphQLDocsSchema,
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
