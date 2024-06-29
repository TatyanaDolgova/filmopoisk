import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import movieApi from '../../../shared/api/api';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
