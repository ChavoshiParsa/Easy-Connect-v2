import { gradientColors, grn } from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';
import { getSingleUser } from '@/lib/users-action';
import { AuthState } from '@/redux/auth-slice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { setNotification } from '@/redux/ui-slice';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ContactDetail() {
  const [contact, setContact] = useState<AuthState['credentials'] | null>(null);

  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  const searchParams = useSearchParams();
  const nextStep = searchParams.get('contact-detail');
  const params = useParams<{ contact: string }>();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchContact() {
      try {
        const user = await getSingleUser(params.contact);
        setContact(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        setContact(null);
      }
    }

    fetchContact();
  }, [params.contact]);

  if (!nextStep || !contact) return;

  const ffl = contact.firstName.charAt(0).toUpperCase();
  const lfl = contact.lastName.charAt(0).toUpperCase();

  return (
    <dialog
      className={`${isDark && 'dark'} z-40 flex h-full w-full items-center justify-center bg-black
       bg-opacity-20 px-2 py-20  backdrop-blur-sm dark:bg-white dark:bg-opacity-20 xs:px-12 xs:py-3 sm:px-28 sm:py-4 md:px-12 md:py-8`}
    >
      <div className='flex size-full flex-col items-center justify-start overflow-hidden rounded-xl bg-slate-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100'>
        <div
          className='relative flex h-1/2 w-full items-center justify-center'
          style={{
            backgroundImage: `${contact.profileUrl === '' ? gradientColors[grn(0, gradientColors.length)] : ''}`,
          }}
        >
          {contact.profileUrl !== '' ? (
            <>
              <Image
                className='object-cover object-center'
                src={contact.profileUrl}
                alt={`a portrait of ${contact.firstName + ' ' + contact.lastName}`}
                fill
                priority
              />
              <div className='absolute z-20 h-full w-full bg-gradient-to-t from-[#0000008e] from-10% via-transparent to-transparent' />
            </>
          ) : (
            <span className='text-5xl text-white'>{ffl + lfl}</span>
          )}
          <span className='absolute bottom-7 left-5 z-20 text-2xl text-white'>
            {contact.firstName + ' ' + contact.lastName}
          </span>
          {contact.isOnline ? (
            <span className='absolute bottom-3 left-5 z-20 text-xs text-emerald-300'>
              Online
            </span>
          ) : (
            <span className='absolute bottom-3 left-5 z-20 text-xs text-slate-300'>
              last seen recently
            </span>
          )}
        </div>
        <div className='flex w-full flex-col items-start justify-start space-y-1 p-4 hover:children:bg-slate-100 hover:children:dark:bg-zinc-800'>
          <InfoComponent
            icon='email'
            info={contact.email}
            name='Email'
            size={30}
          />
          <InfoComponent
            icon='username'
            info={contact.username}
            name='Username'
            size={30}
          />
          <InfoComponent
            icon='info'
            info={contact.biography}
            name='Bio'
            size={30}
          />
        </div>
        <Link
          className='mb-5 mt-auto rounded-lg border-2 border-purlue px-6 py-2 text-xl text-purlue hover:bg-purlue hover:text-white'
          href={pathname}
        >
          Back to chat
        </Link>
      </div>
    </dialog>
  );
}

const InfoComponent = ({
  icon,
  info,
  name,
  size,
}: {
  icon: string;
  info: string;
  name: string;
  size: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  if (name === 'Bio' && info === '') return;

  return (
    <div
      className='flex w-full cursor-pointer items-center justify-start space-x-6 rounded-md px-3 py-3'
      onClick={async () => {
        try {
          const permissions = await navigator.permissions.query({
            name: 'persistent-storage',
          });
          await navigator.clipboard.writeText(info);
          dispatch(
            setNotification({
              status: 'Info',
              message: `${name} copied to clipboard`,
            })
          );
        } catch (error) {
          dispatch(
            setNotification({
              status: 'Error',
              message:
                "Can't access the clipboard. Check your browser permissions.",
            })
          );
        }
      }}
    >
      <Icon name={icon} size={size} dark={isDark} />
      <div className='flex flex-col items-start justify-center'>
        <h3
          className='text-xl text-zinc-800 dark:text-slate-100'
          style={{ fontSize: `${name === 'Bio' && '15px'}` }}
        >
          {info}
        </h3>
        <span className='text-sm text-slate-500'>{name}</span>
      </div>
    </div>
  );
};
