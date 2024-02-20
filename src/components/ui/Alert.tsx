'use client';

import { AppDispatch, useAppSelector } from '@/redux/store';
import Icon from './Icon';
import { setNotification } from '@/redux/ui-slice';
import { useDispatch } from 'react-redux';

export default function Alert() {
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useAppSelector((state) => state.uiReducer.isDark);
  const notification = useAppSelector((state) => state.uiReducer.notification);

  if (!notification) return;

  let borderColor = '#ff5b4f';
  if (notification.status === 'Success') borderColor = '#4fff5e';
  else if (notification.status === 'Info') borderColor = '#4f84ff';
  else if (notification.status === 'Warning') borderColor = '#ffc74f';

  return (
    <div className='relative flex w-full items-center justify-center'>
      <div
        className='fixed top-0 z-50 flex w-64 animate-alertBody flex-col items-center justify-between
          overflow-hidden rounded border-l-4 border-zinc-200 bg-zinc-100 shadow-lg transition delay-1000 dark:bg-zinc-800 md:w-[420px]'
        style={{ borderLeftColor: borderColor }}
      >
        <div className='flex w-11/12 flex-row items-center justify-between space-x-2 py-2'>
          <div className='flex flex-col items-start justify-between space-y-1'>
            <h3 className='text-lg font-bold'>{notification.status}</h3>
            <p className='text-sm text-zinc-400'>{notification.message}</p>
          </div>
          <button className='' onClick={() => dispatch(setNotification(null))}>
            <Icon name='close' size={16} dark={isDark} />
          </button>
        </div>
        <div className='bottom-0 z-50 h-0.5 w-full origin-left animate-alertTimerScale rounded-full bg-gradient-to-r from-emerald-300 to-purlue' />
      </div>
    </div>
  );
}
