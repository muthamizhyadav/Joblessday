import { configureStore } from '@reduxjs/toolkit';
import { Appapi } from '../api/api';
import appReducer from './slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [Appapi.reducerPath]
};

const persistedAppReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: {
    [Appapi.reducerPath]: Appapi.reducer,
    app: persistedAppReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER
        ],
      },
    }).concat(Appapi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
