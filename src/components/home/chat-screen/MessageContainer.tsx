import { useEffect, useRef, useState } from 'react';
import Message, { MessageType } from './Message';
import getMessages from '@/lib/connect-action';
import { useAppSelector } from '@/redux/store';
import { useParams } from 'next/navigation';

export default function MessageContainer() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const userId = useAppSelector((state) => state.authReducer.credentials.id);
  const loading = useAppSelector((state) => state.authReducer.loading);
  const params = useParams<{ contact: string }>();
  // messages state and select with
  const [messages, setMessages] = useState<MessageType[]>([]);

  function handleScreen() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    handleScreen();
    window.addEventListener('resize', handleScreen);
    return () => {
      window.removeEventListener('resize', handleScreen);
    };
  }, [scrollRef.current?.scrollHeight]);

  useEffect(() => {
    async function fetchContact() {
      if (loading) return;
      try {
        const messages = await getMessages(userId, params.contact);
        setMessages(messages);
      } catch (error) {
        setMessages([]);
      }
    }

    fetchContact();
  }, [params.contact, userId, loading]);

  // get message from message slice
  // updating ui when message send with sockets
  // first initial with prisma
  // get realtime messages with sockets

  return (
    <div className='z-10 mt-auto w-full overflow-y-scroll' ref={scrollRef}>
      <div className='mt-3 flex h-fit w-full flex-col justify-end space-y-1.5'>
        {messages.map((message) => (
          <Message
            id={message.id}
            key={message.id}
            text={message.text}
            time={message.time}
            status={message.status}
          />
        ))}
      </div>
    </div>
  );
}
