'use client';

import Menu from '@/components/home/sidebar/Menu';
import Topbar from '@/components/home/Topbar';
import SearchField from '@/components/home/SearchField';
import ActiveUser from '@/components/home/ActiveUser';
import ChatList from '@/components/home/chat/ChatList';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { AuthState, setCredentials } from '@/redux/auth-slice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function Home({ credentials }: { credentials: AuthState }) {
  const dispatch = useDispatch<AppDispatch>();
  const isMenuOpen = useAppSelector((state) => state.uiReducer.isMenuOpen);

  useEffect(() => {
    dispatch(setCredentials(credentials));
  }, [dispatch, credentials]);

  return (
    <main className='flex h-full flex-row items-center justify-start'>
      {isMenuOpen && <Menu />}
      <div className='hidden lg:block lg:h-full lg:w-3/12 lg:border-r dark:lg:border-r-zinc-950 xl:w-1/5'>
        <Menu />
      </div>
      <div
        className='relative flex h-full w-full flex-col items-center justify-start bg-slate-100 children:px-2.5 
    dark:bg-zinc-800 md:w-2/5 md:border-r dark:md:border-r-zinc-950 lg:w-4/12 xl:w-2/5'
      >
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
