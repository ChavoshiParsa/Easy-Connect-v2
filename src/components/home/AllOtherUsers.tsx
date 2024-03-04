'use client';

import { Suspense, useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { usePathname, useSearchParams } from 'next/navigation';
import Icon from '../ui/Icon';
import Link from 'next/link';
import Avatar from '../ui/Avatar';
import Loading from '../ui/Loading';
import { formatTimeStatus } from './chat-screen/Message';
import { AuthState } from '@/redux/auth-slice';

export default function AllOtherUsers() {
  return (
    <Suspense fallback={<Loading />}>
      <Modal />
    </Suspense>
  );
}

function Modal() {
  const credentials = useAppSelector((state) => state.usersReducer);
  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  const [sortType, setSortType] = useState<'name' | 'time'>('name');
  const [sortedChats, setSortedChats] = useState<AuthState['credentials'][]>(
    []
  );

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams.get('all-users');

  useEffect(() => {
    const sortedChatsCopy = [...credentials.usersCredentials];

    if (sortType === 'time') {
      sortedChatsCopy.sort((a, b) => {
        const dateA = new Date(Number(a.lastSeen));
        const dateB = new Date(Number(b.lastSeen));
        return dateB.getTime() - dateA.getTime();
      });
      setSortedChats(sortedChatsCopy);
    } else if (sortType === 'name') {
      sortedChatsCopy.sort((a, b) => {
        const firstNameA = a.firstName.toLowerCase();
        const firstNameB = b.firstName.toLowerCase();
        if (firstNameA < firstNameB) {
          return -1;
        }
        if (firstNameA > firstNameB) {
          return 1;
        }
        return 0;
      });
      setSortedChats(sortedChatsCopy);
    }
  }, [credentials.usersCredentials, sortType]);

  return (
    <>
      {modal && (
        <dialog
          className={`${isDark && 'dark'} z-40 flex h-full w-full items-center justify-center bg-black 
          bg-opacity-20 px-4 py-16 backdrop-blur-sm dark:bg-white dark:bg-opacity-20`}
        >
          <div className='flex h-full w-full flex-col items-center justify-start rounded-xl bg-slate-100 p-2 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100'>
            <div className='flex w-full items-center justify-between'>
              <Link className='' href={pathname}>
                <Icon name='back' size={26} dark={isDark} />
              </Link>
              <span className='ml-5 mr-auto text-xl text-zinc-900 dark:text-slate-100'>
                New Message
              </span>
              <div
                className=''
                onClick={() =>
                  setSortType((prev) => (prev === 'name' ? 'time' : 'name'))
                }
              >
                <Icon name={`sort-${sortType}`} size={24} dark={isDark} />
              </div>
            </div>
            <div className='my-3 h-0.5 w-full rounded-lg bg-gradient-to-l from-pink-500 via-emerald-500 to-yellow-500' />
            <div className='flex w-full flex-col items-center justify-start overflow-y-scroll'>
              {credentials.loading ? (
                <div className='my-8 flex flex-row items-center justify-center space-x-3'>
                  <Loading />
                </div>
              ) : (
                <>
                  {sortedChats.map((user) => (
                    <Link
                      className='flex w-full flex-row items-center justify-start space-x-4 rounded-xl p-3 hover:bg-indigo-100 dark:hover:bg-indigo-950'
                      href={'/home/' + user.id}
                      key={user.id}
                    >
                      <Avatar
                        firstName={user.firstName}
                        lastName={user.lastName}
                        src={user.profileUrl}
                        theme={user.theme}
                        size={46}
                      />
                      <div className='flex flex-col items-start justify-center'>
                        <h3 className='font-bold'>
                          {user.firstName + ' ' + user.lastName}
                        </h3>
                        {user.isOnline ? (
                          <span className='text-sm text-emerald-400'>
                            online
                          </span>
                        ) : (
                          <span className='text-sm text-slate-400'>
                            {formatTimeStatus(user.lastSeen)}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
