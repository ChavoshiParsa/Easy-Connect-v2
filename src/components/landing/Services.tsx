'use client';

import { useAppSelector } from '@/redux/store';
import Icon from '../ui/Icon';
import Image from 'next/image';

export default function Services() {
  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  return (
    <section
      className='mb-20 flex w-full flex-col items-center justify-center space-y-16 bg-slate-200 px-3 py-20 dark:bg-zinc-800 xs:px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14'
      id='services'
    >
      <h1 className='w-full text-center text-4xl font-bold md:text-5xl'>
        Features For a Better{' '}
        <span className='inline-block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent '>
          Experience
        </span>
      </h1>
      <div className='flex flex-col items-center justify-center space-y-6 md:flex-row md:space-x-8 md:space-y-0'>
        <ServiceBox
          icon='realtime'
          title='Realtime'
          description='Instant communication with real-time messaging.'
        />
        <ServiceBox
          icon='secure'
          title='Secure'
          description='Robust security measures for peace of mind.'
        />
        <ServiceBox
          icon='open-source'
          title='Open Source'
          description='Empower innovation with open-source platform.'
        />
      </div>
      <div className='relative flex min-h-[480px] w-full items-center justify-center overflow-hidden rounded-3xl'>
        <Image
          className='size-full object-cover'
          src={`/images/coding-${isDark ? 'dark' : 'light'}.jpg`}
          alt={`image of chat app`}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority
        />
        <div className='absolute z-10 size-full bg-[#ffffff79] dark:bg-[#11111181]' />
        <div className='absolute z-20 flex size-full flex-col items-center justify-center space-y-8 px-2 text-center text-zinc-900 dark:text-slate-100 xs:px-8 md:px-36 md:py-24'>
          <h1 className='flex items-center justify-center space-x-3 whitespace-nowrap text-2xl font-bold md:text-4xl'>
            <span className='hidden md:block'>Behind the Chat,</span>
            <span>A Team of Dedication</span>
          </h1>
          <p className='md:text-xl md:leading-loose'>
            The hardworking chat app developers collaborate tirelessly, refining
            features and enhancing user experience with relentless dedication
            and innovation, surpassing expectations in digital communication.
          </p>
        </div>
      </div>
      <Icon name='star' color='#d58a44' size={80} />
    </section>
  );
}

const ServiceBox = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  return (
    <div className='flex w-full max-w-96 justify-center space-x-4 rounded-2xl bg-slate-50 p-5 drop-shadow dark:bg-zinc-950 lg:space-x-6'>
      <div className='self-start'>
        <Icon name={icon} size={32} dark={isDark} />
      </div>
      <div className='flex flex-col items-start justify-between space-y-2'>
        <span className='text-lg font-bold lg:text-xl'>{title}</span>
        <p className='text-xs text-zinc-400 lg:text-sm'>{description}</p>
      </div>
    </div>
  );
};
