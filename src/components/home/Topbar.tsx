'use client';
import Icon from '../ui/Icon';
import { setIsMenuOpen } from '@/redux/ui-slice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  const router = useRouter();
  return (
    <div className='flex w-full items-center justify-between py-3'>
      <button
        className='lg:hidden'
        onClick={() => dispatch(setIsMenuOpen(true))}
      >
        <Icon name='hamburger-menu' size={30} dark={isDark} />
      </button>
      <h3 className='text-xl font-semibold'>Messages</h3>
      <button onClick={() => router.push('?all-users=true')}>
        <Icon
          name='new-chat'
          size={28}
          color={!isDark ? '#6a4dff' : '#9782ff'}
        />
      </button>
    </div>
  );
}
