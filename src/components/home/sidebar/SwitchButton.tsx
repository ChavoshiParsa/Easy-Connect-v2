import Icon from '@/components/ui/Icon';
import { useContextProvider } from '@/context/store';
import { useEffect, useState } from 'react';

export default function SwitchButton() {
  const { isDark, setIsDark } = useContextProvider();

  return (
    <button
      className='flex h-[18px] w-9 items-center rounded-full'
      style={{
        justifyContent: `${isDark ? 'flex-end' : 'flex-start'}`,
        backgroundColor: `${isDark ? '#9782ff' : '#9ca3af'}`,
      }}
      onClick={() => setIsDark((prev) => !prev)}
    >
      <span className='z-20 mx-px flex h-4 w-4 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800'>
        {!isDark && <Icon name='sun' size={14} dark={isDark} />}
        {isDark && <Icon name='moon' size={14} dark={isDark} />}
      </span>
    </button>
  );
}
