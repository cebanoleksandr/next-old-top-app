import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './menuSlice';
import sortSlice from './sortSlice';

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    sort: sortSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
