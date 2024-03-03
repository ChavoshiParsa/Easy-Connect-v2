import Avatar from '../../ui/Avatar';
import { formatTimeMessage } from '../chat-screen/Message';
import Icon from '@/components/ui/Icon';
import { Theme } from '@prisma/client';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { readSomeUnreadMessages } from '@/redux/auth-slice';
import { readUnreadMessages } from '@/redux/contacts-slice';
import { useRouter } from 'next/navigation';

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
  newMessages: number;
  theme: Theme;
  isOnline: boolean;
};

export default function ChatItem({
  id,
  firstName,
  lastName,
  src,
  lastMessage,
  newMessages,
  theme,
  isOnline,
}: ChatItemType) {
  const dispatch = useDispatch<AppDispatch>();
  const chats = useAppSelector((state) => state.contactsReducer.chats);
  const chatNewMessages = chats.find((chat) => chat.id === id)?.newMessages;

  const router = useRouter();

  function goToChatHandler() {
    router.push('/home/' + id);
    if (chatNewMessages) {
      dispatch(readSomeUnreadMessages(chatNewMessages));
      dispatch(readUnreadMessages(id));
    }
  }

  return (
    <div
      className='flex w-full items-center justify-between space-x-4 px-3 py-3 hover:bg-purple-50 dark:hover:bg-zinc-950'
      onClick={goToChatHandler}
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
            <>
              {newMessages !== 0 && (
                <span className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white dark:bg-blue-400'>
                  {newMessages}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
