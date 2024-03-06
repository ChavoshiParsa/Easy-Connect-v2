import { AuthState } from '@/redux/auth-slice';
import Avatar from '../ui/Avatar';
import { formatTimeStatus } from './chat-screen/Message';
import Link from 'next/link';

export default function UserItem(user: AuthState['credentials']) {
  return (
    <Link
      className='flex w-full flex-row items-center justify-start space-x-4 rounded-xl p-1.5 hover:bg-indigo-100 dark:hover:bg-indigo-950'
      href={'/home/' + user.id}
      key={user.id}
    >
      <Avatar
        firstName={user.firstName}
        lastName={user.lastName}
        src={user.profileUrl}
        theme={user.theme}
        size={46}
      />
      <div className='flex flex-col items-start justify-center'>
        <h3 className='font-bold'>{user.firstName + ' ' + user.lastName}</h3>
        {user.isOnline ? (
          <span className='text-xs text-emerald-400'>online</span>
        ) : (
          <span className='text-xs text-slate-400'>
            {formatTimeStatus(user.lastSeen)}
          </span>
        )}
      </div>
    </Link>
  );
}
