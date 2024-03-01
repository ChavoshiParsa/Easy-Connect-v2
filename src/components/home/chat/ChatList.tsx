import ChatItem from './ChatItem';
import Loading from '@/components/ui/Loading';
import { useAppSelector } from '@/redux/store';

export default function ChatList({}) {
  const chatSlice = useAppSelector((state) => state.contactsReducer);

  if (chatSlice.loading)
    return (
      <div className='my-8 flex flex-row items-center justify-center space-x-3'>
        <Loading />
      </div>
    );

  return (
    <div className='flex w-full flex-col items-center justify-start divide-y overflow-y-scroll bg-slate-50 dark:divide-zinc-700 dark:bg-zinc-900'>
      {chatSlice.chats.map((chat) => (
        <ChatItem
          id={chat.id}
          key={chat.id}
          firstName={chat.firstName}
          lastName={chat.lastName}
          src={chat.src}
          newMassages={chat.newMassages}
          lastMessage={{
            text: chat.lastMessage.text,
            time: chat.lastMessage.time,
            status: chat.lastMessage.status,
          }}
          theme={chat.theme}
          isOnline={chat.isOnline}
        />
      ))}
    </div>
  );
}
