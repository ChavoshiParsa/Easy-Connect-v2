'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import Image from 'next/image';
import { useContextProvider } from '@/context/store';
import SwitchButton from '@/components/home/sidebar/SwitchButton';
import Icon from '@/components/ui/Icon';
import { useRef, useState } from 'react';

export default function SignInPage() {
  const { isDark } = useContextProvider();

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [validate, setValidate] = useState(false);
  return (
    <form
      action={dispatch}
      className='relative flex h-full w-full items-center justify-center overflow-scroll p-3 md:p-4'
      noValidate
    >
      <div className='relative hidden h-full w-1/2 overflow-hidden rounded-3xl md:block'>
        <Image
          className='object-cover'
          src={
            isDark ? '/images/sign-in-dark.jpg' : '/images/sign-in-light.jpg'
          }
          alt='beautiful picture'
          fill
        />
      </div>

      <div className='flex h-full w-full flex-col items-center justify-start md:w-1/2 md:pl-4'>
        <div className='flex w-full items-center justify-between'>
          <span className='animate-pulse text-xl font-bold text-purlue dark:text-purlue-dark'>
            Easy Connect
          </span>
          <SwitchButton />
        </div>

        <h1 className='my-20 text-center text-[44px] leading-snug md:my-24 lg:text-6xl'>
          Welcome Back!
        </h1>

        <div className='mb-32 flex w-full flex-col items-center justify-center space-y-8 sm:w-4/5'>
          <div className='relative w-full'>
            <div className='absolute left-3 top-3'>
              <Icon name='email' size={24} color='#94a3b8' dark={isDark} />
            </div>
            <input
              className='mb-1 w-full rounded-lg border border-slate-200 bg-slate-100 px-12 py-3 outline-none dark:border-slate-700 dark:bg-zinc-800'
              placeholder='Email'
              type='email'
              name='email'
              autoComplete='off'
              ref={emailRef}
              onChange={() =>
                setEmailError(emailRef.current?.validationMessage || '')
              }
              required
            />
            {emailError && validate && (
              <p className='absolute w-full text-left text-xs text-rose-600 dark:text-rose-400 '>
                {emailError}
              </p>
            )}
          </div>

          <div className='relative w-full'>
            <div className='absolute left-3 top-3'>
              <Icon name='password' size={24} color='#94a3b8' dark={isDark} />
            </div>
            <input
              className='mb-1 w-full rounded-lg border border-slate-200 bg-slate-100 px-12 py-3 outline-none dark:border-slate-700 dark:bg-zinc-800'
              placeholder='password'
              type='password'
              name='password'
              autoComplete='off'
              ref={passwordRef}
              onChange={() =>
                setPasswordError(passwordRef.current?.validationMessage || '')
              }
              required
              minLength={6}
            />
            {passwordError && validate && (
              <p className='absolute w-full text-left text-xs text-rose-600 dark:text-rose-400 '>
                {passwordError}
              </p>
            )}
          </div>
        </div>

        <button
          className='w-full rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-500 py-2 text-xl text-slate-100 disabled:text-rose-500 sm:w-4/5'
          onClick={() => {
            setValidate(true);
            setEmailError(emailRef.current?.validationMessage || '');
            setPasswordError(passwordRef.current?.validationMessage || '');
          }}
          disabled={validate && (!!emailError || !!passwordError || pending)}
        >
          Login
        </button>
        {pending && <p>wait...</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </form>
  );
}
