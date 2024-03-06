'use client';

import { Suspense, useEffect, useState } from 'react';
import Loading from '../ui/Loading';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import SearchField from './SearchField';
import UserItem from './UserItem';
import Link from 'next/link';
import Icon from '../ui/Icon';
import { AuthState } from '@/redux/auth-slice';

export default function SearchResult() {
  return (
    <Suspense fallback={<Loading />}>
      <Modal />
    </Suspense>
  );
}

function Modal() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams.get('search-result');
  const isDark = useAppSelector((state) => state.uiReducer.isDark);
  const credentials = useAppSelector((state) => state.usersReducer);

  const [result, setResult] = useState<AuthState['credentials'][]>([]);
  const [inputSearch, setInputSearch] = useState<string>();

  useEffect(() => {
    if (!inputSearch) {
      setResult([...credentials.usersCredentials]);
    } else if (inputSearch.startsWith('@')) {
      const searchedResult = credentials.usersCredentials.filter((credential) =>
        credential.username
          .toLowerCase()
          .includes(inputSearch.split('@')[1].toLowerCase())
      );
      setResult(searchedResult);
    } else {
      const searchedResult = credentials.usersCredentials.filter((credential) =>
        credential.firstName.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setResult(searchedResult);
    }
  }, [credentials.usersCredentials, inputSearch]);
  return (
    <>
      {modal && (
        <dialog
          className={`${isDark && 'dark'} z-40 flex h-full w-full items-center justify-center bg-black 
          bg-opacity-20 px-6 py-24 backdrop-blur-sm dark:bg-white dark:bg-opacity-20`}
        >
          <div className='flex h-full w-full flex-col items-center justify-start rounded-xl bg-slate-100 p-2 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100'>
            <div className='flex w-full items-center justify-between'>
              <Link className='' href={pathname}>
                <Icon name='back' size={26} dark={isDark} />
              </Link>
              <span className='ml-5 mr-auto text-xl text-zinc-900 dark:text-slate-100'>
                Search Box
              </span>
            </div>
            <div className='mb-4 mt-3 h-0.5 w-full rounded-lg bg-gradient-to-l from-pink-500 via-emerald-500 to-yellow-500' />
            <SearchField setInputSearch={setInputSearch} />
            <div className='flex w-full flex-col items-center justify-start overflow-y-scroll'>
              {credentials.loading ? (
                <div className='my-8 flex flex-row items-center justify-center space-x-3'>
                  <Loading />
                </div>
              ) : (
                <>
                  {result.map((user) => (
                    <UserItem key={user.id} {...user} />
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
