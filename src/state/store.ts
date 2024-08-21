import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import contactInfoDetailReducer from './contactsInfoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contacts: contactInfoDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
