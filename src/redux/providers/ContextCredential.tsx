'use client';

import { getInitialUsersData, setUserOff, setUserOn } from '../users-slice';
import { AppDispatch, useAppSelector } from '../store';
import { getInitialAuthData, incrementNewMessages } from '../auth-slice';
import { setNotification } from '../ui-slice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { socket } from '@/socket';
import {
  addContact,
  getInitialContactsData,
  incrementNewMessagesContact,
  setContactUserOff,
  setContactUserOn,
  updateLastMessage,
} from '../contacts-slice';
import {
  addMessageFromContact,
  getInitialMessagesData,
} from '../messages-slice';
import { useParams } from 'next/navigation';

export const ContextCredential: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ contact: string }>();
  const userId = useAppSelector((state) => state.authReducer.credentials.id);
  const contacts = useAppSelector((state) => state.contactsReducer.chats);
  const userList = useAppSelector(
    (state) => state.usersReducer.usersCredentials
  );

  useEffect(() => {
    if (userId !== '') socket.connect();
    function onConnect() {
      socket.emit('join', userId);
    }

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, [dispatch, userId]);

  useEffect(() => {
    function online(userId: string) {
      dispatch(setUserOn(userId));
      dispatch(setContactUserOn(userId));
    }
    function offline(userId: string) {
      dispatch(setUserOff(userId));
      dispatch(setContactUserOff(userId));
    }

    socket.on('online', online);
    socket.on('offline', offline);

    return () => {
      socket.off('online', online);
      socket.off('offline', offline);
    };
  }, [dispatch, userId]);

  useEffect(() => {
    function message({
      senderId,
      message,
    }: {
      senderId: string;
      message: string;
    }) {
      const index = contacts.findIndex((contact) => contact.id === senderId);
      if (index === -1) {
        const contact = userList.find((user) => user.id === senderId);
        if (contact)
          dispatch(
            addContact({
              id: senderId,
              firstName: contact.firstName,
              lastName: contact.lastName,
              isOnline: contact.isOnline,
              newMessages: 0,
              src: contact.profileUrl,
              theme: contact.theme,
              lastMessage: {
                text: message,
                time: new Date().toString(),
              },
            })
          );
      } else {
        dispatch(
          updateLastMessage({
            id: senderId,
            lastMessage: {
              text: message,
              time: new Date().toString(),
            },
          })
        );
      }
      if (params.contact !== senderId) {
        dispatch(incrementNewMessages());
        dispatch(incrementNewMessagesContact(senderId));
      }
      dispatch(addMessageFromContact({ senderId, message }));
    }

    socket.on('message', message);

    return () => {
      socket.off('message', message);
    };
  }, [contacts, dispatch, params.contact, userList]);

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

  const id = useAppSelector((state) => state.authReducer.credentials.id);
  const messagesError = useAppSelector((state) => state.messagesReducer.error);
  const contactIds = contacts.map((contact) => contact.id);

  useEffect(() => {
    dispatch(getInitialMessagesData(contactIds));
    if (messagesError)
      dispatch(setNotification({ status: 'Error', message: messagesError }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, messagesError, id]);

  return <>{children}</>;
};
