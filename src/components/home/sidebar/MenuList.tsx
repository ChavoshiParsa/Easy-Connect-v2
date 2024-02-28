'use client';

import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { FormEvent, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/actions/auth-action';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { setIsMenuOpen, setNotification } from '@/redux/ui-slice';
import { clearCredentials } from '@/redux/auth-slice';

const SIZE = 20;

export default function MenuList() {
  const path = usePathname();
  const [isSettingOpen, setIsSettingOpen] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const isDark = useAppSelector((state) => state.uiReducer.isDark);
  const unreadMessages = useAppSelector(
    (state) => state.authReducer.credentials.unreadMessages
  );
  const firstName = useAppSelector(
    (state) => state.authReducer.credentials.firstName
  );

  const router = useRouter();

  async function logoutSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await logout();
    dispatch(
      setNotification({
        status: 'Success',
        message: `Logout successful! See you later, ${firstName}.`,
      })
    );
    dispatch(clearCredentials());
    router.push('/sign-in');
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-start text-base children:py-3 children:pl-8'>
      <Link
        className='flex w-full items-center justify-start space-x-6 hover:bg-indigo-100 dark:hover:bg-indigo-950'
        style={{
          background: `${path === '/home' && '#e9e5ffaa'}`,
          borderRight: `${path === '/home' && '#6A4DFF solid 3px'}`,
        }}
        href='/home'
        onClick={() => dispatch(setIsMenuOpen(false))}
      >
        <Icon
          name='home'
          size={SIZE}
          color={`${path === '/home' ? '#6A4DFF' : ''}`}
          dark={isDark}
        />
        <span style={{ color: `${path === '/home' && '#6A4DFF'}` }}>
          Home Page
        </span>
      </Link>
      <Link
        className='flex w-full items-center justify-start space-x-6 hover:bg-indigo-100 dark:hover:bg-indigo-950'
        style={{
          background: `${path === '/home/messages' && '#e9e5ffaa'}`,
          borderRight: `${path === '/home/messages' && '#6A4DFF solid 3px'}`,
        }}
        href='/home/messages'
        onClick={() => setIsMenuOpen(false)}
      >
        <Icon
          name='messages'
          size={SIZE}
          color={`${path === '/home/messages' ? '#6A4DFF' : ''}`}
          dark={isDark}
        />
        <span style={{ color: `${path === '/home/messages' && '#6A4DFF'}` }}>
          Unread Messages
        </span>
        {unreadMessages !== 0 && (
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-purlue text-xs text-white '>
            {unreadMessages}
          </span>
        )}
      </Link>
      <div
        className='w-full space-y-4 hover:bg-indigo-100 dark:hover:bg-indigo-950'
        style={{
          background: `${path.includes('/home/settings') && '#e9e5ffaa'}`,
          borderRight: `${path.includes('/home/settings') && '#6A4DFF solid 3px'}`,
        }}
      >
        <button
          className='flex w-full items-center justify-start space-x-6'
          onClick={() => setIsSettingOpen((prev) => !prev)}
        >
          <Icon
            name='settings'
            size={SIZE}
            color={`${path.includes('/home/settings') ? '#6A4DFF' : ''}`}
            dark={isDark}
          />
          <div className='flex items-center justify-center space-x-1'>
            <span
              style={{
                color: `${path.includes('/home/settings') && '#6A4DFF'}`,
              }}
            >
              Settings
            </span>
            {!isSettingOpen && (
              <Icon
                name='up'
                size={16}
                color={`${path.includes('/home/settings') ? '#6A4DFF' : '#94a3b8'}`}
              />
            )}
            {isSettingOpen && (
              <Icon
                name='down'
                size={16}
                color={`${path.includes('/home/settings') ? '#6A4DFF' : '#94a3b8'}`}
              />
            )}
          </div>
        </button>
        {isSettingOpen && (
          <div className='flex w-full flex-col items-start justify-center text-sm text-zinc-500 children:w-full children:p-2 children:pl-12 dark:text-zinc-200'>
            <Link
              style={{
                color: `${path === '/home/settings/profile' && '#5b636e'}`,
                background: `${path === '/home/settings/profile' && '#dfd9ff'}`,
              }}
              href='/home/settings/profile'
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              style={{
                color: `${path === '/home/settings/account' && '#5b636e'}`,
                background: `${path === '/home/settings/account' && '#dfd9ff'}`,
              }}
              href='/home/settings/account'
              onClick={() => setIsMenuOpen(false)}
            >
              Account
            </Link>
            <Link
              style={{
                color: `${path === '/home/settings/safety' && '#5b636e'}`,
                background: `${path === '/home/settings/safety' && '#dfd9ff'}`,
              }}
              href='/home/settings/safety'
              onClick={() => setIsMenuOpen(false)}
            >
              Safety
            </Link>
          </div>
        )}
      </div>
      <form
        className='mb-8 mt-auto flex w-full items-center justify-start hover:bg-rose-200 dark:hover:bg-rose-950'
        onSubmit={logoutSubmitHandler}
      >
        <button className='flex w-full items-center justify-start space-x-6'>
          <Icon name='logout' size={SIZE} color='#E45758' />
          <span className='text-lg text-fire '>Log out</span>
        </button>
      </form>
    </div>
  );
}
