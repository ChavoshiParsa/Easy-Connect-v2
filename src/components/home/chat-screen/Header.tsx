import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';
import Loading from '@/components/ui/Loading';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function Header() {
  const isDark = useAppSelector((state) => state.uiReducer.isDark);
  const params = useParams<{ contact: string }>();
  const router = useRouter();
  const users = useAppSelector((state) => state.usersReducer.usersCredentials);

  const user = users.find((cred) => cred.id === params.contact);

  return (
    <div className='z-20 flex w-full flex-row items-center justify-between bg-slate-50 py-2 shadow-lg dark:bg-zinc-900'>
      <Link className='mr-4 rounded-full ' href='/home'>
        <Icon name='back' size={28} dark={isDark} />
      </Link>
      {!user ? (
        <Loading size={48} />
      ) : (
        <div className='mr-auto flex items-center justify-start space-x-3'>
          <Avatar
            firstName={user.firstName}
            lastName={user.lastName}
            src={user.profileUrl}
            online={false}
            theme={user.theme}
            size={46}
          />
          <div
            className='flex w-full flex-col items-start justify-between'
            onClick={() => {}}
          >
            <h3 className='text-lg font-bold'>
              {user.firstName + ' ' + user.lastName}
            </h3>
            {user.isOnline ? (
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
