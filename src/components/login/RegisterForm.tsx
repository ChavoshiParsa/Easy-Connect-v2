'use client';

import { register, validateUsername } from '@/actions/auth-action';
import { useRouter, useSearchParams } from 'next/navigation';
import ProfileInput from './ProfileInput';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { SubmitButton } from './SubmitButton';
import Link from 'next/link';
import Image from 'next/image';
import CustomUploader from './CustomUploader';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/redux/ui-slice';
import { deletePhoto } from '@/actions/photo-action';

const SIZE = 1024;

export default function RegisterForm({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  const searchParams = useSearchParams();
  const nextStep = searchParams.get('complete-profile');
  const router = useRouter();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);

  const [firstNameError, setFirstNameError] = useState('');
  const [username, setUsername] = useState<{
    username: string;
    message: string;
    isValid: boolean;
  }>({ username: '', message: 'Please fill out this field.', isValid: false });
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

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

    setLoading(true);
    const message = await register({
      email,
      password,
      firstName,
      lastName,
      username,
      bio,
      photoUrl: profilePhotoUrl,
    });
    setLoading(false);

    if (message) {
      dispatch(setNotification({ status: 'Error', message }));
      return;
    } else {
      dispatch(
        setNotification({
          status: 'Success',
          message: `Welcome, ${firstName}! Let's start chatting!`,
        })
      );
      router.push('/home');
    }
  }

  return (
    <dialog
      className={`${isDark && 'dark'} z-40 flex h-full w-full items-center justify-center
       bg-black bg-opacity-40 backdrop-blur-sm dark:bg-white dark:bg-opacity-40`}
    >
      <form
        className='mx-2 flex w-[640px] flex-col items-center justify-center space-y-4
        rounded-xl bg-slate-100 p-3 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 md:space-y-8 md:p-6'
        onSubmit={formSubmitHandler}
      >
        <div className='flex w-full flex-col items-start justify-center space-y-1 md:space-y-2 '>
          <h3 className='text-2xl font-bold md:text-4xl'>One more step</h3>
          <p className='text-sm md:text-lg'>
            Complete your profile to make a memorable impression on others.
          </p>
        </div>

        <div className='flex w-full flex-col items-center justify-center'>
          <div className='mb-3 flex w-full flex-col items-center justify-center space-y-4 md:mb-5 md:flex-row md:space-x-4 md:space-y-0'>
            <div className='flex w-full flex-col items-center justify-center space-y-2 md:w-1/2 md:flex-row md:justify-center md:space-x-4 md:space-y-0'>
              <div className='relative flex h-28 w-28 items-center justify-center self-center overflow-hidden rounded-full bg-slate-200 text-base dark:bg-zinc-800 md:h-32 md:w-32'>
                {!profilePhotoUrl && <span>Profile</span>}
                {profilePhotoUrl && (
                  <Image
                    src={profilePhotoUrl}
                    alt='photo of user'
                    width={SIZE}
                    height={SIZE}
                  />
                )}
              </div>
              <CustomUploader
                email={email}
                profilePhotoUrl={profilePhotoUrl}
                setProfilePhotoUrl={setProfilePhotoUrl}
              />
            </div>
            <textarea
              className='h-full min-h-[70px] w-full resize-none rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm outline-none dark:border-slate-700 dark:bg-zinc-800 md:min-h-[120px] md:w-1/2 md:text-base'
              placeholder='Write about your self... (optional)'
              name='biography'
              autoComplete='off'
              ref={bioRef}
              maxLength={72}
            />
          </div>

          <div className='mb-4 flex w-full flex-row items-center justify-between space-x-3 text-sm md:mb-5 md:space-x-4 md:text-base'>
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
          <div className='mb-6 flex w-full flex-row items-center justify-between space-x-3 text-sm md:mb-10 md:space-x-4 md:text-base'>
            <div className='w-1/2'>
              <ProfileInput
                name='username'
                validate={validate && username.username === ''}
                error={'Please fill out this field.'}
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
              className='w-1/2 text-xs leading-4 md:text-sm'
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
          <div className='flex w-full flex-row items-center justify-center space-x-3 self-end md:w-1/2'>
            <Link
              className='relative w-full rounded-lg border-2 border-purlue py-1.5 text-center text-base text-purlue transition hover:bg-purlue hover:text-slate-100 md:py-2 md:text-xl'
              href='/sign-up'
              onClick={async () => {
                setValidate(false);
                if (profilePhotoUrl === '') return;
                const key = profilePhotoUrl.split('/')[4];
                await deletePhoto(key);
                setProfilePhotoUrl('');
              }}
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
