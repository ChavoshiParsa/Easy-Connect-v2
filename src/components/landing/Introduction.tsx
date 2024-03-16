'use client';

import Image from 'next/image';
import Icon from '../ui/Icon';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { getLengths } from '@/actions/info-action';
import Loading from '../ui/Loading';

export default function Introduction() {
  const isDark = useAppSelector((state) => state.uiReducer.isDark);
  const [info, setInfo] = useState<{
    chatLength: number;
    messageLength: number;
    userLength: number;
  } | null>(null);

  useEffect(() => {
    async function getInfo() {
      const { chatLength, messageLength, userLength } = await getLengths();
      setInfo({ chatLength, messageLength, userLength });
    }
    getInfo();
  }, []);

  return (
    <section
      className='mb-16 flex h-[700px] w-full flex-col items-center justify-center md:h-[600px] md:flex-row md:space-x-10'
      id='hero'
    >
      <div className='mb-8 flex flex-col items-center justify-center space-y-8 md:mb-12 md:space-y-16'>
        <h1
          className='w-full text-center text-4xl font-bold sm:text-5xl md:text-left lg:text-6xl '
          style={{ lineHeight: 1.375 }}
        >
          Let&apos;s Connect with Your{' '}
          <span className='inline-block bg-gradient-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent '>
            Friends
          </span>{' '}
          in <span className='animate-pulse text-fire'>Realtime</span>
        </h1>
        <div className='flex w-full items-center justify-center divide-x md:justify-start'>
          <div className='flex flex-col items-center justify-center space-y-0.5 px-2 md:space-y-1 md:px-6'>
            <Icon name='user-intro' size={32} dark={isDark} />
            <span className='text-xl font-bold md:text-3xl'>
              {info ? info.userLength : <Loading size={28} />}
            </span>
            <span className='text-sm text-zinc-500'>Users</span>
          </div>
          <div className='flex flex-col items-center justify-center space-y-0.5 px-2 md:space-y-1 md:px-6'>
            <Icon name='chat-intro' size={32} dark={isDark} />
            <span className='text-xl font-bold md:text-3xl'>
              {info ? info.chatLength : <Loading size={28} />}
            </span>
            <span className='text-sm text-zinc-500'>Connections</span>
          </div>
          <div className='flex flex-col items-center justify-center space-y-0.5 px-2 md:space-y-1 md:px-6'>
            <Icon name='message-intro' size={32} dark={isDark} />
            <span className='text-xl font-bold md:text-3xl'>
              {info ? info.messageLength : <Loading size={28} />}
            </span>
            <span className='text-sm text-zinc-500'>Messages</span>
          </div>
        </div>
      </div>
      <div className='flex h-5/6 w-full space-x-2 md:space-x-6'>
        <ChattingPerson person='boy' message='Hello, Emma' />
        <ChattingPerson person='girl' message='Max, Can we meet today?' />
      </div>
    </section>
  );
}

const ChattingPerson = ({
  person,
  message,
}: {
  person: 'boy' | 'girl';
  message: string;
}) => {
  return (
    <div
      className='flex h-full w-full'
      style={{
        flexDirection: `${person === 'boy' ? 'column' : 'column-reverse'}`,
        alignSelf: `${person === 'boy' ? 'flex-start' : 'flex-end'}`,
      }}
    >
      <div
        className='flex items-center'
        style={{
          flexDirection: `${person === 'boy' ? 'row' : 'row-reverse'}`,
        }}
      >
        <div className='relative flex size-8 items-center overflow-hidden rounded-full xs:size-12'>
          <Image
            className='size-8 object-cover xs:size-12'
            src={`/images/${person}-chatting.jpg`}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            alt={`image of chatting ${person}`}
            fill
            priority
          />
        </div>
        <div
          className='mx-1 my-3 max-w-max bg-pink-200 px-2 py-1 text-xs dark:bg-pink-800 xs:mx-3 xs:my-5 xs:px-4 xs:py-2 xs:text-sm'
          style={{
            borderRadius: `14px 14px ${person === 'boy' ? '14px 0' : '0 14px'}`,
          }}
        >
          {message}
        </div>
      </div>
      <div className='relative min-h-72 overflow-hidden rounded-2xl xs:min-h-80 md:w-full'>
        <Image
          className='object-cover'
          src={`/images/${person}-chatting.jpg`}
          alt={`image of chatting ${person}`}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority
        />
      </div>
    </div>
  );
};
