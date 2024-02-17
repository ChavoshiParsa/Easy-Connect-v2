'use client';

import { register, validateUsername } from '@/lib/actions';
import { useContextProvider } from '@/context/store';
import { useRouter, useSearchParams } from 'next/navigation';
import ProfileInput from '../login/ProfileInput';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { SubmitButton } from '../login/SubmitButton';
import Link from 'next/link';

export default function Modal({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const searchParams = useSearchParams();
  const nextStep = searchParams.get('complete-profile');
  const router = useRouter();

  const { isDark, setNotification } = useContextProvider();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const photoRef = useRef<HTMLTextAreaElement>(null);

  const [firstNameError, setFirstNameError] = useState('');
  const [username, setUsername] = useState<{
    username: string;
    message: string;
    isValid: boolean;
  }>({ username: '', message: 'Please fill out this field.', isValid: false });
  const [usernameLoading, setUsernameLoading] = useState(false);

  const [validate, setValidate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function validate(username: string) {
      const result = await validateUsername(username);
      setUsername((prev) => ({
        ...prev,
        message: result.message,
        isValid: result.isValid,
      }));
    }

    setUsernameLoading(true);
    const timer = setTimeout(() => {
      validate(username.username).then(() => setUsernameLoading(false));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [username.username]);

  if (!nextStep || !email || !password) return;

  async function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const firstName = firstNameRef.current?.value as string;
    const lastName = lastNameRef.current?.value as string;
    const username = usernameRef.current?.value as string;
    const bio = bioRef.current?.value as string;
    const photoUrl = photoRef.current?.value as string;

    setLoading(true);
    const message = await register({
      email,
      password,
      firstName,
      lastName,
      username,
      bio,
      photoUrl,
    });
    setLoading(false);

    if (message) {
      setNotification({ status: 'Error', message });
      return;
    } else {
      setNotification({
        status: 'Success',
        message: `Welcome, ${firstName}! Let's start chatting!`,
      });
      router.push('/home');
    }
  }

  return (
    <dialog
      className={`${isDark && 'dark'} z-40 flex h-full w-full
       items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm`}
    >
      <form
        className='flex w-[640px] flex-col items-center justify-center space-y-8
        rounded-xl bg-white p-6 text-zinc-700 dark:bg-black dark:text-zinc-100'
        onSubmit={formSubmitHandler}
      >
        <div className='flex w-full flex-col items-start justify-center space-y-2'>
          <h3 className='text-4xl font-bold'>One more step</h3>
          <p className='text-lg'>
            Complete your profile to make a memorable impression on others.
          </p>
        </div>

        <div className='flex w-full flex-col items-center justify-center'>
          <div className='mb-5 flex w-full flex-row items-center justify-center space-x-4'>
            <div className='flex w-1/2 items-center justify-start space-x-4'>
              <div className='flex h-32 w-32 items-center justify-center self-center overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800'>
                Profile
              </div>
              <button
                className='text-sm text-sky-600 hover:text-sky-400'
                type='button'
              >
                Choose a Photo
              </button>
            </div>
            <textarea
              className='h-full min-h-[120px] w-1/2 resize-none rounded border border-slate-200 bg-slate-50 px-3 py-1.5 outline-none dark:border-slate-700 dark:bg-zinc-800'
              placeholder='Write about your self... (optional)'
              name='biography'
              autoComplete='off'
              ref={bioRef}
              maxLength={72}
            />
          </div>

          <div className='mb-5 flex w-full flex-row items-center justify-between space-x-4'>
            <ProfileInput
              name='first name'
              validate={validate}
              error={firstNameError}
              ref={firstNameRef}
              onChange={() => {
                setFirstNameError(
                  firstNameRef.current?.validationMessage || ''
                );
              }}
              type='essential'
            />
            <ProfileInput
              name='last name'
              validate={false}
              error=''
              ref={lastNameRef}
              onChange={() => {}}
              type='optional'
            />
          </div>
          <div className='mb-10 flex w-full flex-row items-center justify-between space-x-4'>
            <div className='w-1/2'>
              <ProfileInput
                name='username'
                validate={false}
                error=''
                ref={usernameRef}
                onChange={(e) =>
                  setUsername((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                type='essential'
              />
            </div>
            <p
              className='w-1/2 text-sm leading-4'
              style={{
                color: `${usernameLoading ? '' : username.isValid ? 'green' : 'red'}`,
              }}
            >
              {username.username !== ''
                ? usernameLoading
                  ? 'Checking...'
                  : username?.message
                : ''}
            </p>
          </div>
          <div className='flex w-1/2 flex-row items-center justify-center space-x-3 self-end'>
            <Link
              className='relative w-full rounded-lg border-2 border-purlue py-2 text-center text-xl text-purlue transition hover:bg-purlue hover:text-slate-100'
              href='/sign-up'
            >
              Cancel
            </Link>
            <SubmitButton
              onClick={() => {
                setValidate(true);
                setFirstNameError(
                  firstNameRef.current?.validationMessage || ''
                );
              }}
              disabled={!!firstNameError || !username.isValid}
              validate={validate}
              name='Submit'
              pending={loading}
            />
          </div>
        </div>
      </form>
    </dialog>
  );
}
