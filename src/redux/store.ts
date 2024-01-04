import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { graphqlReducer } from './slices/graphql/graphqlSlice';
import { graphqlApi } from './slices/graphql/graphqlApi';
import globalMessageReducer from './slices/globalMessageSlice';
import localizationReducer from './slices/localizationSlice';
import userReducer from './slices/userSlice';
import headersReducer from './slices/headersSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['graphqlApi', 'graphql', 'message'],
};

const graphqlPersistConfig = {
  key: 'graphql',
  storage,
  blacklist: ['schema'],
};

const rootReducer = combineReducers({
  localization: localizationReducer,
  message: globalMessageReducer,
  user: userReducer,
  graphqlApi: graphqlApi.reducer,
  graphql: persistReducer(graphqlPersistConfig, graphqlReducer),
  headers: headersReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            'graphql/setGraphqlSchema',
          ],
          ignoredPaths: ['graphql.schema'],
        },
        immutableCheck: {
          ignoredPaths: ['graphql.schema', 'graphql.introspection.data'],
        },
      }).concat(graphqlApi.middleware),
  });
};

export const store = setupStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
