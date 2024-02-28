import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui-slice';
import authReducer from './auth-slice';
import usersReducer from './users-slice';
import contactsReducer from './contacts-slice';
import messagesReducer from './messages-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    uiReducer,
    authReducer,
    usersReducer,
    contactsReducer,
    messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
