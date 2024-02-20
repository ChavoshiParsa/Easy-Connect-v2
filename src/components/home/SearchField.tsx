import { useAppSelector } from '@/redux/store';
import Icon from '../ui/Icon';

export default function SearchField() {
  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  return (
    <div className='relative mb-4 w-full'>
      <div className='absolute right-5 top-3.5'>
        <Icon name='magnifier' size={20} color='#a1a1aa' dark={isDark} />
      </div>
      <input
        className='w-full rounded-lg bg-slate-200 py-3 pl-5 pr-14 outline-none dark:bg-zinc-700'
        placeholder='Search...'
        type='text'
        name='search-field'
        autoComplete='off'
      />
    </div>
  );
}
