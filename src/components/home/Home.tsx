'use client';

import Menu from '@/components/home/sidebar/Menu';
import Topbar from '@/components/home/Topbar';
import SearchField from '@/components/home/SearchField';
import ActiveUser from '@/components/home/ActiveUser';
import ChatList from '@/components/home/chat/ChatList';
import { useAppSelector } from '@/redux/store';
import AllOtherUsers from './AllOtherUsers';
import SearchResult from './SearchResult';

export default function Home() {
  const isMenuOpen = useAppSelector((state) => state.uiReducer.isMenuOpen);

  return (
    <main className='flex h-full flex-row items-center justify-start'>
      {isMenuOpen && <Menu />}
      <div className='hidden lg:block lg:h-full lg:w-3/12 lg:border-r dark:lg:border-r-zinc-950 xl:w-1/5'>
        <Menu />
      </div>
      <div
        className='relative flex h-full w-full flex-col items-center justify-start bg-slate-100
       dark:bg-zinc-800 md:w-2/5 md:border-r dark:md:border-r-zinc-950 lg:w-4/12 xl:w-2/5'
      >
        <AllOtherUsers />
        <SearchResult />
        <Topbar />
        <SearchField />
        <ActiveUser />
        <ChatList />
      </div>
      <div className='mb-20 hidden h-full animate-pulse items-center justify-center text-2xl font-bold md:flex md:w-3/5 lg:w-5/12 xl:w-2/5'>
        Select a chat to start messaging
      </div>
    </main>
  );
}
