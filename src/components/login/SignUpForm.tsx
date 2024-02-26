'use client';

import { validateEmailPass } from '@/lib/auth-action';
import { FormEvent, useRef, useState } from 'react';
import { SubmitButton } from '@/components/login/SubmitButton';
import Header from '@/components/login/Header';
import Input from '@/components/login/Input';
import MainImage from '@/components/login/MainImage';
import RedirectLink from '@/components/login/RedirectLink';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setNotification } from '@/redux/ui-slice';
import RegisterForm from './RegisterForm';

export default function SignUpForm() {
  const dispatch = useDispatch<AppDispatch>();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [validate, setValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);
  const router = useRouter();

  async function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    setLoading(true);
    const message = await validateEmailPass({ email, password });
    setLoading(false);

    if (message) {
      dispatch(setNotification({ status: 'Error', message }));
      return;
    }

    setCredentials((prev) => ({ email, password }));
    router.push('sign-up?complete-profile=true');
  }

  return (
    <>
      {credentials && (
        <RegisterForm
          email={credentials.email}
          password={credentials.password}
        />
      )}
      <form
        className='flex h-full w-full items-center justify-center overflow-scroll bg-slate-50 p-1 dark:bg-zinc-900 md:p-3'
        onSubmit={formSubmitHandler}
        noValidate
      >
        <div className='flex h-full w-full flex-col items-center justify-start space-y-14 px-2.5 pb-28 pt-16 xs:w-11/12 xs:px-2 sm:w-2/3 sm:px-4 md:w-1/2 md:px-6 lg:px-10 xl:px-16'>
          <Header />
          <h1 className='text-2xl xs:text-4xl md:text-3xl lg:text-4xl xl:text-5xl'>
            Create Your Account
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
            name='Register'
            pending={loading}
          />
          <RedirectLink page='in' text='Already have an account? ' />
        </div>
        <div className='relative hidden h-full w-1/2 overflow-hidden rounded-3xl md:block'>
          <MainImage page='up' alt='beautiful picture - sign up page' />
        </div>
      </form>
    </>
  );
}
