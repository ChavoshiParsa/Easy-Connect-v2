'use client';

import Icon from '@/components/ui/Icon';
import Loading from '@/components/ui/Loading';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { setNotification } from '@/redux/ui-slice';
import { gradientColors } from '@/utils/color-theme';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { formatTimeStatus } from './Message';

export default function ContactDetail() {
  return (
    <Suspense fallback={<Loading />}>
      <Modal />
    </Suspense>
  );
}

function Modal() {
  const params = useParams<{ contact: string }>();

  const isDark = useAppSelector((state) => state.uiReducer.isDark);
  const users = useAppSelector((state) => state.usersReducer.usersCredentials);

  const searchParams = useSearchParams();
  const modal = searchParams.get('contact-detail');
  const pathname = usePathname();

  const user = users.find((cred) => cred.id === params.contact);

  if (!user) return;

  const ffl = user.firstName.charAt(0).toUpperCase();
  const lfl = user.lastName.charAt(0).toUpperCase();

  return (
    <>
      {modal && (
        <dialog
          className={`${isDark && 'dark'} z-40 flex h-full w-full items-center justify-center bg-black
          bg-opacity-20 px-6 py-8 backdrop-blur-sm dark:bg-white dark:bg-opacity-20`}
        >
          <div className='flex size-full flex-col items-center justify-start overflow-hidden rounded-xl bg-slate-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100'>
            <div
              className='relative flex h-1/2 w-full items-center justify-center'
              style={{
                backgroundImage: `${user.profileUrl === '' ? gradientColors[user.theme] : ''}`,
              }}
            >
              {user.profileUrl !== '' ? (
                <>
                  <Image
                    style={{ objectFit: 'contain' }}
                    src={user.profileUrl}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    alt={`a portrait of ${user.firstName + ' ' + user.lastName}`}
                    fill
                    priority
                  />
                  <div className='absolute z-20 h-full w-full bg-gradient-to-t from-[#00000076] from-5% via-transparent to-transparent' />
                </>
              ) : (
                <span className='text-5xl text-white'>{ffl + lfl}</span>
              )}
              <span className='absolute bottom-8 left-5 z-20 text-3xl text-white'>
                {user.firstName + ' ' + user.lastName}
              </span>
              {user.isOnline ? (
                <span className='absolute bottom-3 left-5 z-20 text-sm text-emerald-200'>
                  online
                </span>
              ) : (
                <span className='absolute bottom-3 left-5 z-20 text-sm text-slate-300'>
                  {`last seen at ${formatTimeStatus(user.lastSeen)}`}
                </span>
              )}
            </div>
            <div className='flex w-full flex-col items-start justify-start space-y-1 p-4 hover:children:bg-slate-100 hover:children:dark:bg-zinc-800'>
              <InfoComponent
                icon='email'
                info={user.email}
                name='Email'
                size={26}
              />
              <InfoComponent
                icon='username'
                info={user.username}
                name='Username'
                size={26}
              />
              <InfoComponent
                icon='info'
                info={user.biography}
                name='Bio'
                size={26}
              />
            </div>
            <Link
              className='mb-5 mt-auto rounded-lg border-2 border-purlue px-6 py-2 text-xl text-purlue hover:bg-purlue hover:text-white'
              href={pathname}
            >
              Back to chat
            </Link>
          </div>
        </dialog>
      )}
    </>
  );
}

const InfoComponent = ({
  icon,
  info,
  name,
  size,
}: {
  icon: string;
  info: string;
  name: string;
  size: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  if (name === 'Bio' && info === '') return;

  return (
    <div
      className='flex w-full cursor-pointer items-center justify-start space-x-6 rounded-md px-3 py-3'
      onClick={async () => {
        try {
          const permissions = await navigator.permissions.query({
            name: 'persistent-storage',
          });
          await navigator.clipboard.writeText(info);
          dispatch(
            setNotification({
              status: 'Info',
              message: `${name} copied to clipboard`,
            })
          );
        } catch (error) {
          dispatch(
            setNotification({
              status: 'Error',
              message:
                "Can't access the clipboard. Check your browser permissions.",
            })
          );
        }
      }}
    >
      <Icon name={icon} size={size} dark={isDark} />
      <div className='flex flex-col items-start justify-center'>
        <h3
          className='text-lg text-zinc-800 dark:text-slate-100'
          style={{ fontSize: `${name === 'Bio' && '15px'}` }}
        >
          {info}
        </h3>
        <span className='text-sm text-slate-500'>{name}</span>
      </div>
    </div>
  );
};
