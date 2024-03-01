import Link from 'next/link';
import Avatar from '../../ui/Avatar';
import { formatTimeMessage } from '../chat-screen/Message';
import Icon from '@/components/ui/Icon';
import { Theme } from '@prisma/client';

export type ChatItemType = {
  id: string;
  firstName: string;
  lastName: string;
  src: string;
  lastMessage: {
    text: string;
    time: string;
    status?: 'sent' | 'seen' | 'pending';
  };
  newMassages: number;
  theme: Theme;
  isOnline: boolean;
};

export default function ChatItem({
  id,
  firstName,
  lastName,
  src,
  lastMessage,
  newMassages,
  theme,
  isOnline,
}: ChatItemType) {
  return (
    <Link
      className='flex w-full items-center justify-between space-x-4 px-3 py-3 hover:bg-purple-50 dark:hover:bg-zinc-950'
      href={`/home/${id}`}
    >
      <Avatar
        firstName={firstName}
        lastName={lastName}
        src={src}
        theme={theme}
        size={52}
        online={isOnline}
      />
      <div className='flex w-full flex-col items-center justify-center space-y-1'>
        <div className='flex w-full items-center justify-between'>
          <h3 className='font-bold'>{firstName + ' ' + lastName}</h3>
          <span className='text-xs text-zinc-400'>
            {formatTimeMessage(new Date(lastMessage.time))}
          </span>
        </div>
        <div className='flex w-full justify-between'>
          <span className='text-sm text-zinc-400'>{lastMessage.text}</span>
          {lastMessage.status ? (
            <Icon name={lastMessage.status} size={22} color='#FFFFFF' />
          ) : (
            <span className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white dark:bg-blue-400'>
              {newMassages}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
