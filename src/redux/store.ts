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
import userSlice from './userSlice';
import { graphqlApi, graphqlSlice } from './graphqlSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [userSlice.reducerPath],
};

const graphqlSlicePersistConfig = {
  key: graphqlSlice.reducerPath,
  storage,
  blacklist: ['introspectStatus'],
};

const rootReducer = combineReducers({
  [userSlice.reducerPath]: userSlice.reducer,
  [graphqlApi.reducerPath]: graphqlApi.reducer,
  [graphqlSlice.reducerPath]: persistReducer(graphqlSlicePersistConfig, graphqlSlice.reducer),
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
