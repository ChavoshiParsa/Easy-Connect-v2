'use client';

import Image from 'next/image';
import Icon from '../ui/Icon';
import { useAppSelector } from '@/redux/store';

export default function Introduction({
  userLength,
  chatLength,
  messageLength,
}: {
  userLength: number;
  chatLength: number;
  messageLength: number;
}) {
  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  return (
    <section
      className='flex h-full w-full flex-col items-center justify-center md:flex-row md:space-x-16'
      id='hero'
    >
      <div className='mb-12 flex w-full flex-col items-center justify-center space-y-8 md:space-y-16'>
        <h1
          className='w-full text-center text-3xl font-bold xs:text-4xl md:text-left md:text-5xl lg:text-6xl'
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
            <span className='text-xl font-bold md:text-3xl'>{userLength}</span>
            <span className='text-sm text-zinc-500'>Users</span>
          </div>
          <div className='flex flex-col items-center justify-center space-y-0.5 px-2 md:space-y-1 md:px-6'>
            <Icon name='chat-intro' size={32} dark={isDark} />
            <span className='text-xl font-bold md:text-3xl'>{chatLength}</span>
            <span className='text-sm text-zinc-500'>Connections</span>
          </div>
          <div className='flex flex-col items-center justify-center space-y-0.5 px-2 md:space-y-1 md:px-6'>
            <Icon name='message-intro' size={32} dark={isDark} />
            <span className='text-xl font-bold md:text-3xl'>
              {messageLength}
            </span>
            <span className='text-sm text-zinc-500'>Messages</span>
          </div>
        </div>
      </div>
      <div className='flex h-full w-full space-x-2 md:space-x-6'>
        <ChattingPerson person='boy' message='Hello, Emma' />
        <ChattingPerson person='girl' message='Hi max, Can we meet today?' />
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
      className='flex h-5/6 w-full'
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
        <div className='relative flex size-12 items-center overflow-hidden rounded-full'>
          <Image
            style={{
              objectFit: 'cover',
              objectPosition: `${person === 'boy' ? 'center' : 'top'}`,
            }}
            src={`/images/${person}-chatting.jpg`}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            alt={`image of chatting ${person}`}
            fill
            priority
          />
        </div>
        <div
          className='mx-1 my-3 bg-pink-200 px-2 py-1 text-xs dark:bg-pink-800 xs:mx-3 xs:my-5 xs:px-4 xs:py-2 xs:text-sm'
          style={{
            borderRadius: `14px 14px ${person === 'boy' ? '14px 0' : '0 14px'}`,
          }}
        >
          {message}
        </div>
      </div>
      <div className='relative min-h-72 overflow-hidden rounded-2xl xs:min-h-80 md:w-full'>
        <Image
          className='object-cover object-center'
          style={{
            objectPosition: `${person === 'boy' ? 'center' : 'top'}`,
          }}
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
