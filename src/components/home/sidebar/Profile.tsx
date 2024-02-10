import Avatar from '@/components/ui/Avatar';

export default function Profile() {
  return (
    <div className='my-6 flex flex-row items-center justify-start space-x-3 pl-5'>
      <Avatar name='Parsa-Chavoshi' size={54} online={true} />
      <div className='flex flex-col items-start justify-between space-y-1'>
        <h3 className='font-bold'>Parsa Chavoshi</h3>
        <h4 className='text-sm text-zinc-400'>@PaChav</h4>
      </div>
    </div>
  );
}
