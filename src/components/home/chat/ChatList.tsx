import ChatItem from './ChatItem';

export default function ChatList({}) {
  // prisma first initial get users in chat
  // prisma updating ui with sockets when message send and receive for first time
  return (
    <div className='flex w-full flex-col items-center justify-start divide-y overflow-y-scroll bg-slate-50 dark:divide-zinc-700 dark:bg-zinc-900'></div>
  );
}
