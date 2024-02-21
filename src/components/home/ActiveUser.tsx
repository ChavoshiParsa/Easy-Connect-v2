import Link from 'next/link';
import Avatar from '../ui/Avatar';
import { AuthState } from '@/redux/auth-slice';
import { useEffect, useState } from 'react';
import { getOtherUsers } from '@/lib/users-action';

export default function ActiveUser() {
  const [onlineUsers, setOnlineUsers] = useState<AuthState[]>([]);
  useEffect(() => {
    const getUser = async () => {
      const users = await getOtherUsers();
      if (!users) return;
      setOnlineUsers(users);
    };
    getUser();
  }, []);

  return (
    <div className='z-10 flex w-full flex-col items-center justify-center space-y-1 pb-3 pt-2 shadow'>
      <div className='flex w-full items-center justify-between text-lg'>
        <h3 className=''>Online now</h3>
        <h3 className='text-purlue dark:text-purlue-dark'>All</h3>
      </div>
      <div className='w-full overflow-x-scroll'>
        <div className='flex items-center justify-start space-x-2'>
          {onlineUsers.map((user) => (
            <Link
              className='rounded-full p-0.5 hover:bg-purlue'
              href={`/home/${user.id}`}
              key={user.id}
            >
              <Avatar
                firstName={user.firstName}
                lastName={user.lastName}
                src={user.profileUrl}
                size={54}
                online={true}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
