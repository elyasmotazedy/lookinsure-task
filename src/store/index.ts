import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import usersReducer from './slices/usersSlice';
import filtersReducer from './slices/filtersSlice';
export const store = configureStore({
  reducer: {
    users: usersReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
