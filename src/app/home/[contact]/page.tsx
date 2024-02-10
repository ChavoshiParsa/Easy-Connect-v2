'use client';

import ActiveUser from '@/components/home/ActiveUser';
import SearchField from '@/components/home/SearchField';
import Topbar from '@/components/home/Topbar';
import Header from '@/components/home/chat-screen/Header';
import InputField from '@/components/home/chat-screen/InputField';
import MessageContainer from '@/components/home/chat-screen/MessageContainer';
import ChatList from '@/components/home/chat/ChatList';
import Menu from '@/components/home/sidebar/Menu';
import { useContextProvider } from '@/context/store';

export default function ChatPage() {
  const { isMenuOpen } = useContextProvider();

  return (
    <main className='flex h-full w-full flex-row items-center justify-start bg-slate-100 dark:bg-zinc-800'>
      {isMenuOpen && <Menu />}
      <div className='hidden lg:block lg:h-full lg:w-3/12 lg:border-r dark:lg:border-r-zinc-950 xl:w-1/5'>
        <Menu />
      </div>
      <div
        className='relative hidden h-full flex-col items-center justify-start bg-slate-100 children:px-2.5 
        dark:bg-zinc-800 md:flex md:w-2/5 md:border-r dark:md:border-r-zinc-950 lg:w-4/12 xl:w-2/5'
      >
        <Topbar />
        <SearchField />
        <ActiveUser />
        <ChatList />
      </div>
      <div className='flex h-full flex-col items-center justify-between children:px-3.5 md:w-3/5 lg:w-5/12 xl:w-2/5'>
        <Header />
        <MessageContainer />
        <InputField />
      </div>
    </main>
  );
}
