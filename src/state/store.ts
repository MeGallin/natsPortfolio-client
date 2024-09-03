import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import contactInfoDetailReducer from './contactsInfoSlice';
import hitCounterReducer from './hitCounterSlice';
import contactFormReducer from './contactFormSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contacts: contactInfoDetailReducer,
    hitCounter: hitCounterReducer,
    contactForm: contactFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
