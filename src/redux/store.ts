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
import { graphqlApi, graphqlReducer } from './slices/graphql/graphqlSlice';
import globalMessageReducer from './slices/globalMessageSlice';
import localizationReducer from './slices/localizationSlice';
import userReducer from './slices/userSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['graphqlApi', 'message'],
};

const rootReducer = combineReducers({
  localization: localizationReducer,
  message: globalMessageReducer,
  user: userReducer,
  graphqlApi: graphqlApi.reducer,
  graphql: graphqlReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(graphqlApi.middleware),
  });
};

export const store = setupStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
