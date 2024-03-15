import ChatItem, { ChatItemType } from './ChatItem';
import Loading from '@/components/ui/Loading';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChatList({}) {
  const chatSlice = useAppSelector((state) => state.contactsReducer);
  const [sortedChats, setSortedChats] = useState<ChatItemType[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sortedChatsCopy = [...chatSlice.chats];

    if (searchParams.get('unread-messages')) {
      setSortedChats(
        sortedChatsCopy.filter((contact) => contact.newMessages !== 0)
      );
      return;
    }

    sortedChatsCopy.sort((a, b) => {
      const dateA = new Date(b.lastMessage.time);
      const dateB = new Date(a.lastMessage.time);
      return dateA.getTime() - dateB.getTime();
    });
    setSortedChats(sortedChatsCopy);
  }, [chatSlice.chats, searchParams]);

  if (chatSlice.loading)
    return (
      <div className='my-8 flex flex-row items-center justify-center space-x-3'>
        <Loading />
      </div>
    );

  if (chatSlice.chats.length === 0) {
    return (
      <Link
        className='mt-20 animate-bounce px-4 text-center text-base md:text-sm'
        href='?all-users=true'
      >
        Ready to chat? Click here to start a conversation with anyone.
      </Link>
    );
  }

  return (
    <div className='flex w-full flex-col items-center justify-start divide-y overflow-y-scroll bg-slate-50 dark:divide-zinc-700 dark:bg-zinc-900'>
      {sortedChats.map((chat) => (
        <ChatItem
          id={chat.id}
          key={chat.id}
          firstName={chat.firstName}
          lastName={chat.lastName}
          src={chat.src}
          newMessages={chat.newMessages}
          lastMessage={{
            text: chat.lastMessage.text,
            time: chat.lastMessage.time,
            status: chat.lastMessage.status,
          }}
          theme={chat.theme}
          isOnline={chat.isOnline}
        />
      ))}

      {sortedChats.length === 0 && searchParams.get('unread-messages') && (
        <span className='px-1 py-3 text-center'>
          No new messages available at the moment.
        </span>
      )}
      {searchParams.get('unread-messages') && (
        <button
          className='mb-4 rounded-md bg-slate-100 px-4 py-0.5 text-slate-900 hover:bg-indigo-400'
          onClick={() => router.push(pathname)}
        >
          back
        </button>
      )}
    </div>
  );
}
