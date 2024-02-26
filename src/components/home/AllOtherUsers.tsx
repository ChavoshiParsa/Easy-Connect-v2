import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { setNotification } from '@/redux/ui-slice';
import { getInitialUsersData } from '@/redux/users-slice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Icon from '../ui/Icon';
import Link from 'next/link';
import Avatar from '../ui/Avatar';

export default function AllOtherUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const credentials = useAppSelector(
    (state) => state.usersReducer.usersCredentials
  );
  const error = useAppSelector((state) => state.usersReducer.error);
  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  const [sortType, setSortType] = useState<'name' | 'time'>('name');

  const searchParams = useSearchParams();
  const nextStep = searchParams.get('all-users');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    dispatch(getInitialUsersData());
    if (error) dispatch(setNotification({ status: 'Error', message: error }));
  }, [dispatch, error]);

  if (!nextStep) return;

  return (
    <dialog
      className={`${isDark && 'dark'} z-40 flex h-full w-full items-center justify-center bg-black
       bg-opacity-20 px-4 py-16 backdrop-blur-sm  dark:bg-white dark:bg-opacity-20 xs:px-8`}
    >
      <div className='flex h-full w-full flex-col items-center justify-start rounded-xl bg-slate-100 p-4 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100'>
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
          {credentials.map((user) => (
            <Link
              className='flex w-full flex-row items-center justify-start space-x-4 rounded-xl p-3 hover:bg-indigo-100 dark:hover:bg-indigo-950'
              href={'/home/' + user.id}
              key={user.id}
            >
              <Avatar
                firstName={user.firstName}
                lastName={user.lastName}
                src={user.profileUrl}
                size={46}
              />
              <div className='flex flex-col items-start justify-center'>
                <h3 className='font-bold'>
                  {user.firstName + ' ' + user.lastName}
                </h3>
                {user.isOnline ? (
                  <span className='text-sm text-emerald-400'>Online</span>
                ) : (
                  <span className='text-sm text-slate-400'>
                    last seen recently
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </dialog>
  );
}
