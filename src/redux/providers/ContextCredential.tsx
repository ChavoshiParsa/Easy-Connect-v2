'use client';

import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../store';
import { useEffect, useState } from 'react';
import { getInitialContactsData } from '../contacts-slice';
import { setNotification } from '../ui-slice';
import { getInitialAuthData } from '../auth-slice';
import { getInitialUsersData } from '../users-slice';
import { getInitialMessagesData } from '../messages-slice';
import { socket } from '@/socket';

export const ContextCredential: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const userId = useAppSelector((state) => state.authReducer.credentials.id);

  useEffect(() => {
    if (userId !== '') socket.connect();
    function onConnect() {
      socket.emit('join', userId);
    }

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, [userId]);

  const dispatch = useDispatch<AppDispatch>();
  const chatError = useAppSelector((state) => state.contactsReducer.error);

  useEffect(() => {
    dispatch(getInitialContactsData());
    if (chatError)
      dispatch(setNotification({ status: 'Error', message: chatError }));
  }, [chatError, dispatch]);

  const authError = useAppSelector((state) => state.authReducer.error);

  useEffect(() => {
    dispatch(getInitialAuthData());
    if (authError)
      dispatch(setNotification({ status: 'Error', message: authError }));
  }, [authError, dispatch]);

  const usersError = useAppSelector((state) => state.usersReducer.error);

  useEffect(() => {
    dispatch(getInitialUsersData());
    if (usersError)
      dispatch(setNotification({ status: 'Error', message: usersError }));
  }, [usersError, dispatch]);

  const messagesError = useAppSelector((state) => state.messagesReducer.error);
  const contacts = useAppSelector((state) => state.contactsReducer.chats);
  const contactIds = contacts.map((contact) => contact.id);

  useEffect(() => {
    dispatch(getInitialMessagesData(contactIds));
    if (messagesError)
      dispatch(setNotification({ status: 'Error', message: messagesError }));
  }, [messagesError, dispatch, contactIds]);

  return <>{children}</>;
};
