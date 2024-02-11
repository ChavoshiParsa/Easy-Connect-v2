import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useContextProvider } from '@/context/store';
import { logout } from '@/lib/actions';

export default function MenuList() {
  const path = usePathname();
  const [isSettingOpen, setIsSettingOpen] = useState(true);
  const { isDark, setIsMenuOpen } = useContextProvider();

  const size = 20;

  return (
    <div className='flex h-full w-full flex-col items-center justify-start text-base children:py-3 children:pl-8'>
      <Link
        className='flex w-full items-center justify-start space-x-6 hover:bg-indigo-100 dark:hover:bg-indigo-950'
        style={{
          background: `${path === '/home' && '#e9e5ffaa'}`,
          borderRight: `${path === '/home' && '#6A4DFF solid 3px'}`,
        }}
        href='/home'
        onClick={() => setIsMenuOpen(false)}
      >
        <Icon
          name='home'
          size={size}
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
          size={size}
          color={`${path === '/home/messages' ? '#6A4DFF' : ''}`}
          dark={isDark}
        />
        <span style={{ color: `${path === '/home/messages' && '#6A4DFF'}` }}>
          Messages
        </span>
        <span className='flex h-5 w-5 items-center justify-center rounded-full bg-purlue text-xs text-white dark:bg-purlue-dark'>
          2
        </span>
      </Link>
      <Link
        className='flex w-full items-center justify-start space-x-6 hover:bg-indigo-100 dark:hover:bg-indigo-950'
        style={{
          background: `${path === '/about-us' && '#e9e5ffaa'}`,
          borderRight: `${path === '/about-us' && '#6A4DFF solid 3px'}`,
        }}
        href='/about-us'
        onClick={() => setIsMenuOpen(false)}
      >
        <Icon
          name='about-us'
          size={size}
          color={`${path === '/about-us' ? '#6A4DFF' : ''}`}
          dark={isDark}
        />
        <span style={{ color: `${path === '/about-us' && '#6A4DFF'}` }}>
          About Us
        </span>
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
            size={size}
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
        action={logout}
      >
        <button className='flex w-full items-center justify-start space-x-6'>
          <Icon name='logout' size={size} color='#E45758' />
          <span className='text-lg text-fire '>Log out</span>
        </button>
      </form>
    </div>
  );
}
