'use client';
import { useContextProvider } from '@/context/store';
import Icon from './Icon';

export default function Alert() {
  const { notification, setNotification, isDark } = useContextProvider();

  if (!notification) return;
  let borderColor = 'red';
  if (notification.status === 'Success') borderColor = 'green';
  else if (notification.status === 'Info') borderColor = 'skyblue';
  else if (notification.status === 'Warning') borderColor = 'yellow';
  return (
    <div className='flex w-full items-center justify-center'>
      <div
        className='fixed top-4 z-50 flex w-[260px] flex-row items-center justify-between rounded border-l-4 bg-zinc-100 px-7 py-1.5 shadow-lg dark:bg-zinc-800 md:w-[360px]'
        style={{ borderLeftColor: borderColor }}
      >
        <div className='flex flex-col items-start justify-between'>
          <h3 className='text-xl font-bold'>{notification.status}</h3>
          <p className='text-slate-500'>{notification.message}</p>
        </div>
        <button className='' onClick={() => setNotification(null)}>
          <Icon name='close' size={14} dark={isDark} />
        </button>
      </div>
    </div>
  );
}
