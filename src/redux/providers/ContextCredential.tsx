'use client';

import { getInitialUsersData, setUserOff, setUserOn } from '../users-slice';
import { AppDispatch, useAppSelector } from '../store';
import { getInitialAuthData } from '../auth-slice';
import { setNotification } from '../ui-slice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { socket } from '@/socket';
import {
  getInitialContactsData,
  setContactUserOff,
  setContactUserOn,
} from '../contacts-slice';
import {
  addMessageFromContact,
  getInitialMessagesData,
} from '../messages-slice';

export const ContextCredential: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useAppSelector((state) => state.authReducer.credentials.id);
  const contactList = useAppSelector((state) => state.contactsReducer.chats);

  useEffect(() => {
    if (userId !== '') socket.connect();
    function onConnect() {
      socket.emit('join', userId);
    }
    function online(userId: string) {
      dispatch(setUserOn(userId));
      dispatch(setContactUserOn(userId));
    }
    function offline(userId: string) {
      dispatch(setUserOff(userId));
      dispatch(setContactUserOff(userId));
    }
    function message({
      senderId,
      message,
    }: {
      senderId: string;
      message: string;
    }) {
      dispatch(addMessageFromContact({ senderId, message }));
    }

    socket.on('connect', onConnect);
    socket.on('online', online);
    socket.on('offline', offline);
    socket.on('message', message);

    return () => {
      socket.off('connect', onConnect);
      socket.off('online', online);
      socket.off('offline', offline);
      socket.off('message', message);
    };
  }, [dispatch, userId]);

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
