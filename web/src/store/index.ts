import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// Create the store with all our slices
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// TypeScript types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
