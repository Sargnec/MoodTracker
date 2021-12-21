import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import historyReducer from './slices/history.slice';

type persistType = {
  key: string;
  version: number;
  storage: any;
};

const persistConfig: persistType = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const combinedReducer = combineReducers({
  history: historyReducer,
});

const rootReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
