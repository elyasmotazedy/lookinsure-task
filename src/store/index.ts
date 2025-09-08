import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import usersReducer from './slices/usersSlice';
export const store = configureStore({
  reducer: {
    users: usersReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
