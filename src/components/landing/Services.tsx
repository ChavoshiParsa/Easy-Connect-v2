'use client';
import { useAppSelector } from '@/redux/store';
import Icon from '../ui/Icon';

export default function Services() {
  return (
    <section
      className='mb-20 flex w-full flex-col items-center justify-center space-y-16'
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
    <div className='flex w-full max-w-96 justify-center space-x-4 rounded-2xl bg-slate-50 p-5 drop-shadow lg:space-x-6'>
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
