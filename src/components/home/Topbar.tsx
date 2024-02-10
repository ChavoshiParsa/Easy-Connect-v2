'use client';
import { useContextProvider } from '@/context/store';
import Icon from '../ui/Icon';

export default function Topbar() {
  const { isDark, setIsMenuOpen } = useContextProvider();
  return (
    <div className='flex w-full items-center justify-between py-3'>
      <button className='lg:hidden' onClick={() => setIsMenuOpen(true)}>
        <Icon name='hamburger-menu' size={30} dark={isDark} />
      </button>
      <h3 className='text-xl font-semibold'>Messages</h3>
      <button onClick={() => {}}>
        <Icon
          name='new-chat'
          size={28}
          color={!isDark ? '#6a4dff' : '#9782ff'}
        />
      </button>
    </div>
  );
}
