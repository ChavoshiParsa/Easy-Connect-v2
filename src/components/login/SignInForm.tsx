'use client';

import { FormEvent, useRef, useState } from 'react';
import { SubmitButton } from '@/components/login/SubmitButton';
import Header from '@/components/login/Header';
import Input from '@/components/login/Input';
import MainImage from '@/components/login/MainImage';
import RedirectLink from '@/components/login/RedirectLink';
import { useContextProvider } from '@/context/store';
import { authenticate } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [validate, setValidate] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setNotification } = useContextProvider();

  const router = useRouter();

  async function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    setLoading(true);
    const message = await authenticate({ email, password });
    setLoading(false);

    if (message) setNotification({ status: 'Error', message });
    else {
      setNotification({
        status: 'Success',
        message: "Welcome back, [Name]! You're logged in successfully.",
      });
      router.push('/home');
    }
  }
  return (
    <form
      className='relative flex h-full w-full items-center justify-center overflow-scroll bg-slate-50 p-1 dark:bg-zinc-900 md:p-3'
      onSubmit={formSubmitHandler}
      noValidate
    >
      <div className='relative hidden h-full w-1/2 overflow-hidden rounded-3xl md:block'>
        <MainImage page='in' alt='beautiful picture - sign in page' />
      </div>
      <div className='flex h-full w-full flex-col items-center justify-start space-y-14 px-2.5 pb-28 pt-16 xs:w-11/12 xs:px-2 sm:w-2/3 sm:px-4 md:w-1/2 md:justify-between md:px-6 lg:px-10 xl:px-16'>
        <Header />
        <h1 className='text-4xl xs:text-5xl lg:text-6xl xl:text-7xl'>
          Welcome Back!
        </h1>
        <div className='flex w-full flex-col items-center justify-center space-y-8'>
          <Input
            name='email'
            ref={emailRef}
            onChange={() =>
              setEmailError(emailRef.current?.validationMessage || '')
            }
            error={emailError}
            validate={validate}
          />
          <Input
            name='password'
            ref={passwordRef}
            onChange={() =>
              setPasswordError(passwordRef.current?.validationMessage || '')
            }
            error={passwordError}
            validate={validate}
          />
        </div>
        <SubmitButton
          onClick={() => {
            setValidate(true);
            setEmailError(emailRef.current?.validationMessage || '');
            setPasswordError(passwordRef.current?.validationMessage || '');
          }}
          disabled={!!emailError || !!passwordError}
          validate={validate}
          name='Login'
          pending={loading}
        />
        <RedirectLink page='up' text="Don't have an account? " />
        {/* <Link href='?modal=true'>
      <button type='button' className='bg-blue-500 p-2 text-white'>
        Open Modal
      </button>
    </Link> */}
      </div>
    </form>
  );
}