import Link from 'next/link';
import Avatar from '../ui/Avatar';
import { useAppSelector } from '@/redux/store';

export default function ActiveUser() {
  const users = useAppSelector((state) => state.usersReducer.usersCredentials);
  const onlineUsers = users.filter((user) => user.isOnline === true);

  return (
    <div className='z-10 flex w-full flex-col items-center justify-center space-y-1 px-2.5 pb-3 pt-2 shadow'>
      <div className='flex w-full items-center justify-between text-lg'>
        <h3 className=''>Online now</h3>
        <h3 className='text-purlue dark:text-purlue-dark'>All</h3>
      </div>
      {onlineUsers.length === 0 ? (
        <span className='self-start py-4 text-sm text-rose-500'>
          There is no online user at this moment.
        </span>
      ) : (
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
                  online={true}
                  theme={user.theme}
                  size={54}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
