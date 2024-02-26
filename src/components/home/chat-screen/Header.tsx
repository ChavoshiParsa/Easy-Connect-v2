import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';
import Loading from '@/components/ui/Loading';
import { getSingleUser } from '@/lib/users-action';
import { AuthState } from '@/redux/auth-slice';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const isDark = useAppSelector((state) => state.uiReducer.isDark);
  const params = useParams<{ contact: string }>();
  const [contact, setContact] = useState<AuthState['credentials'] | null>(null);
  const router = useRouter();

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

  return (
    <div className='z-20 flex w-full flex-row items-center justify-between bg-slate-50 py-2 shadow-lg dark:bg-zinc-900'>
      <Link className='mr-4 rounded-full ' href='/home'>
        <Icon name='back' size={28} dark={isDark} />
      </Link>
      {!contact ? (
        <Loading size={48} />
      ) : (
        <div className='mr-auto flex items-center justify-start space-x-3'>
          <Avatar
            firstName={contact.firstName}
            lastName={contact.lastName}
            src={contact.profileUrl}
            size={46}
            online={false}
          />
          <div
            className='flex w-full flex-col items-start justify-between'
            onClick={() => {}}
          >
            <h3 className='text-lg font-bold'>
              {contact.firstName + ' ' + contact.lastName}
            </h3>
            {contact.isOnline ? (
              <span className='text-sm text-emerald-400'>Online</span>
            ) : (
              <span className='text-sm text-slate-400'>last seen recently</span>
            )}
          </div>
        </div>
      )}
      <button className='' onClick={() => router.push('?contact-detail=true')}>
        <Icon name='more' size={24} dark={isDark} />
      </button>
    </div>
  );
}
