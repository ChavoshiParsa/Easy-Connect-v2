import Link from 'next/link';
import Avatar from '../../ui/Avatar';

export default function ChatItem({
  firstName,
  lastName,
  src,
  lastMessage,
  newMassages,
}: {
  firstName: string;
  lastName: string;
  src: string;
  lastMessage: {
    text: string;
    time: string;
    status?: 'sent' | 'seen' | 'pending';
  };
  newMassages: number;
}) {
  return (
    <Link
      className='flex w-full items-center justify-between space-x-4 px-1.5 py-3 hover:bg-purple-50 dark:hover:bg-zinc-950'
      href='/home/5WpVnLa46flQpf'
    >
      <Avatar firstName={firstName} lastName={lastName} src={src} size={52} />
      <div className='flex w-full flex-col items-center justify-center space-y-1'>
        <div className='flex w-full items-center justify-between'>
          <h3 className='font-bold'>{firstName + ' ' + lastName}</h3>
          <span className='text-xs text-zinc-400'>{lastMessage.time}</span>
        </div>
        <div className='flex w-full justify-between'>
          <span className='text-sm text-zinc-400'>{lastMessage.text}</span>
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white dark:bg-blue-400'>
            {lastMessage.status || newMassages}
          </span>
        </div>
      </div>
    </Link>
  );
}
