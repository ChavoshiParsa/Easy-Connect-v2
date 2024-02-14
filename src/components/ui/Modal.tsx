'use client';

import { useContextProvider } from '@/context/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProfileInput from '../login/ProfileInput';
import { useRef, useState } from 'react';
import { SubmitButton } from '../login/SubmitButton';

export default function Modal({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const searchParams = useSearchParams();
  const nextStep = searchParams.get('complete-profile');

  const { isDark } = useContextProvider();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLInputElement>(null);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [username, setUsername] = useState<{
    message: string;
    isOk: boolean;
  } | null>(null);
  const [bioError, setBioError] = useState('');

  const [validate, setValidate] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!nextStep || !email || !password) return;

  return (
    <dialog
      className={`${isDark && 'dark'} fixed left-0 top-0 z-50 flex h-full w-full
       items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm`}
    >
      <form
        className='flex w-[600px] flex-col items-start justify-between space-y-4 
        rounded-xl bg-white p-8 text-zinc-700 dark:bg-black dark:text-zinc-100'
        onSubmit={() => {}}
      >
        <h3 className='text-4xl font-bold'>One more step</h3>
        <p className='text-lg'>
          Complete your profile to make a memorable impression on others.
        </p>

        <div className='flex h-36 w-36 items-center justify-center self-center overflow-hidden rounded-full bg-slate-100'>
          <input type='file' name='profile photo' hidden />
        </div>

        <div className='flex w-full flex-row items-center justify-between space-x-4'>
          <ProfileInput
            name='first name'
            validate={validate}
            error={firstNameError}
            ref={firstNameRef}
            onChange={() => {
              setFirstNameError(firstNameRef.current?.validationMessage || '');
            }}
            type='essential'
          />
          <ProfileInput
            name='last name'
            validate={validate}
            error={lastNameError}
            ref={lastNameRef}
            onChange={() => {
              setLastNameError(lastNameRef.current?.validationMessage || '');
            }}
            type='optional'
          />
        </div>
        <div className='flex w-full flex-row items-center justify-between space-x-4'>
          <div className='w-1/2'>
            <ProfileInput
              name='username'
              validate={false}
              error=''
              ref={usernameRef}
              onChange={() => {}}
              type='essential'
            />
          </div>
          <p className='w-1/2' style={{}}>
            {username?.message}
          </p>
        </div>
        <ProfileInput
          name='biography'
          validate={validate}
          error={bioError}
          ref={bioRef}
          onChange={() => {
            setBioError(bioRef.current?.validationMessage || '');
          }}
          type='optional'
        />
        <SubmitButton
          onClick={() => {
            setValidate(true);
            setFirstNameError(firstNameRef.current?.validationMessage || '');
            setLastNameError(lastNameRef.current?.validationMessage || '');
            setBioError(bioRef.current?.validationMessage || '');
          }}
          disabled={
            !!firstNameError || !!lastNameError || !username?.isOk || !!bioError
          }
          validate={validate}
          name='Register'
          pending={loading}
        />
      </form>
    </dialog>
  );
}
