'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import Image from 'next/image';
import { useContextProvider } from '@/context/store';
import SwitchButton from '@/components/home/sidebar/SwitchButton';
import Icon from '@/components/ui/Icon';
import { MouseEventHandler, useRef, useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const { isDark } = useContextProvider();

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [validate, setValidate] = useState(false);

  return (
    <form
      // action={dispatch}
      className='relative flex h-full w-full items-center justify-center overflow-scroll bg-slate-50 p-1 dark:bg-zinc-900 md:p-3'
      noValidate
    >
      <div className='xs:w-11/12 xs:px-2 flex h-full w-full flex-col items-center justify-between px-2.5 pb-28 pt-16 sm:w-2/3 sm:px-4 md:w-1/2 md:px-6 lg:px-10 xl:px-16'>
        <div className='flex w-full items-center justify-between'>
          <span className='animate-pulse text-xl font-bold text-purlue dark:text-purlue-dark'>
            Easy Connect
          </span>
          <SwitchButton />
        </div>

        <h1 className='xs:text-4xl text-3xl lg:text-5xl xl:text-6xl'>
          Create your account
        </h1>

        <div className='flex w-full flex-col items-center justify-center space-y-8'>
          <div className='relative w-full'>
            <div className='absolute left-3 top-3'>
              <Icon name='email' size={24} color='#94a3b8' dark={isDark} />
            </div>
            <input
              className='w-full rounded-lg border border-slate-200 bg-slate-100 py-3 pl-12 pr-4 outline-none dark:border-slate-700 dark:bg-zinc-800'
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
              className='w-full rounded-lg border border-slate-200 bg-slate-100 py-3 pl-12 pr-4 outline-none dark:border-slate-700 dark:bg-zinc-800'
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
        <Button
          onClick={() => {
            setValidate(true);
            setEmailError(emailRef.current?.validationMessage || '');
            setPasswordError(passwordRef.current?.validationMessage || '');
          }}
          disabled={!!emailError || !!passwordError}
          validate={validate}
        />
        <Link className='self-start' href='/sign-in'>
          Already have an account?{' '}
          <span className='font-bold text-purlue dark:text-purlue-dark'>
            Sign in
          </span>
        </Link>
      </div>

      <div className='relative hidden h-full w-1/2 overflow-hidden rounded-3xl md:block'>
        <Image
          className='object-cover object-center'
          src={
            isDark ? '/images/sign-up-dark.jpg' : '/images/sign-up-light.jpg'
          }
          alt='beautiful picture'
          fill
        />
      </div>
    </form>
  );
}

const Button = ({
  onClick,
  disabled,
  validate,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  validate: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      className='w-full rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-500 py-2.5 text-xl text-slate-100'
      onClick={onClick}
      disabled={validate && (disabled || pending)}
    >
      {!pending ? 'Register' : 'Submitting...'}
    </button>
  );
};
