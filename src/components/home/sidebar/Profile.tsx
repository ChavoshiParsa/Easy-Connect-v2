import Avatar from '@/components/ui/Avatar';
import Loading from '@/components/ui/Loading';
import { useAppSelector } from '@/redux/store';

export default function Profile() {
  const credentials = useAppSelector((state) => state.authReducer);
  if (credentials.id === '')
    return (
      <div className='my-8 flex flex-row items-center justify-center space-x-3'>
        <Loading />
      </div>
    );

  return (
    <div className='my-6 flex flex-row items-center justify-start space-x-3 pl-5'>
      <Avatar
        firstName={credentials.firstName}
        lastName={credentials.lastName}
        src={credentials.profileUrl}
        size={60}
        online={false}
      />
      <div className='flex flex-col items-start justify-between space-y-1'>
        <h3 className='font-bold'>
          {credentials.firstName + ' ' + credentials.lastName}
        </h3>
        <h4 className='text-sm text-zinc-400'>{'@' + credentials.username}</h4>
      </div>
    </div>
  );
}
