import { useEffect, useRef } from 'react';
import Message from './Message';
import { useParams } from 'next/navigation';
import Loading from '@/components/ui/Loading';
import { useAppSelector } from '@/redux/store';

export default function MessageContainer() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const params = useParams<{ contact: string }>();
  const loading = useAppSelector((state) => state.messagesReducer.loading);
  const messagesContacts = useAppSelector(
    (state) => state.messagesReducer.messagesContact
  );

  const messagesContact = messagesContacts?.find(
    (cred) => cred.contactId === params.contact
  );

  const messages = messagesContact?.messages;

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
  }, [scrollRef.current?.scrollHeight, loading, messages]);

  if (loading)
    return (
      <div className='my-8 flex flex-row items-center justify-center space-x-3'>
        <Loading />
      </div>
    );

  if (!messages)
    return (
      <span className='text-center text-lg'>
        Send any message to start communication.
      </span>
    );

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
