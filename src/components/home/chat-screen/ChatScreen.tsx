'use client';

import ActiveUser from '@/components/home/ActiveUser';
import SearchField from '@/components/home/SearchField';
import Topbar from '@/components/home/Topbar';
import Header from '@/components/home/chat-screen/Header';
import InputField from '@/components/home/chat-screen/InputField';
import MessageContainer from '@/components/home/chat-screen/MessageContainer';
import ChatList from '@/components/home/chat/ChatList';
import Menu from '@/components/home/sidebar/Menu';
import AllOtherUsers from '../AllOtherUsers';
import ContactDetail from './ContactDetail';
import { openNewMessages, seenMessagesAction } from '@/actions/contact-action';
import { useAppSelector } from '@/redux/store';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { socket } from '@/socket';
import SearchResult from '../SearchResult';

export default function ChatScreen() {
  const isMenuOpen = useAppSelector((state) => state.uiReducer.isMenuOpen);
  const messages = useAppSelector(
    (state) => state.messagesReducer.messagesContact
  );
  const params = useParams<{ contact: string }>();

  useEffect(() => {
    async function seenMessageHandler() {
      await openNewMessages(params.contact);
      await seenMessagesAction(params.contact);
    }
    seenMessageHandler();
    socket.emit('seen', params.contact);
  }, [params.contact, messages]);

  return (
    <main className='flex h-full w-full flex-row items-center justify-start bg-slate-50 dark:bg-zinc-900'>
      {isMenuOpen && <Menu />}
      <div className='hidden lg:block lg:h-full lg:w-3/12 lg:border-r dark:lg:border-r-zinc-950 xl:w-1/5'>
        <Menu />
      </div>
      <div
        className='relative hidden h-full flex-col items-center justify-start bg-slate-100 
      dark:bg-zinc-800 md:flex md:w-2/5 md:border-r dark:md:border-r-zinc-950 lg:w-4/12 xl:w-2/5'
      >
        <AllOtherUsers />
        <SearchResult />
        <Topbar />
        <SearchField />
        <ActiveUser />
        <ChatList />
      </div>
      <div className='relative flex h-full w-full flex-col items-center justify-between children:px-3.5 md:w-3/5 lg:w-5/12 xl:w-2/5'>
        <ContactDetail />
        <Header />
        <MessageContainer />
        <InputField />
      </div>
    </main>
  );
}
