import Link from 'next/link';
import Avatar from '../../ui/Avatar';

export default function ChatItem() {
  return (
    <Link
      className='flex w-full items-center justify-between space-x-4 px-1.5 py-3 hover:bg-purple-50 dark:hover:bg-zinc-950'
      href='/home/5WpVnLa46flQpf'
    >
      <Avatar name='Parsa-Chavoshi' size={52} online={false} />
      <div className='flex w-full flex-col items-center justify-center space-y-1'>
        <div className='flex w-full items-center justify-between'>
          <h3 className='font-bold'>Parsa Chavoshi</h3>
          <span className='text-xs text-zinc-400'>4:51 PM</span>
        </div>
        <div className='flex w-full justify-between'>
          {/* last message or Typing... */}
          <span className='text-sm text-zinc-400'>I don&apos;t know!</span>
          {/* status:new message - seen - sent - pending - get */}
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white dark:bg-blue-400'>
            4
          </span>
        </div>
      </div>
    </Link>
  );
}
