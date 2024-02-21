import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';

export default function Header() {
  const isDark = useAppSelector((state) => state.uiReducer.isDark);
  return (
    <div className='z-20 flex w-full flex-row items-center justify-between bg-slate-50 py-2 shadow-lg dark:bg-zinc-900'>
      <Link className='mr-4 rounded-full ' href='/home'>
        <Icon name='back' size={28} dark={isDark} />
      </Link>
      <div className='flex items-center justify-start space-x-3'>
        {/* <Avatar name='Parsa-Chavoshi' size={50} online={false} /> */}
        <div className='flex w-full flex-col items-start justify-between'>
          <h3 className='text-lg font-bold'>Parsa Chavoshi</h3>
          <span className='text-sm text-zinc-400'>Last seen recently</span>
        </div>
      </div>
      <button className='ml-auto' onClick={() => {}}>
        <Icon name='more' size={24} dark={isDark} />
      </button>
    </div>
  );
}
