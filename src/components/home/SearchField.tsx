import { AppDispatch, useAppSelector } from '@/redux/store';
import Icon from '../ui/Icon';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/redux/ui-slice';

export default function SearchField({
  setInputSearch,
}: {
  setInputSearch?: Dispatch<SetStateAction<string | undefined>>;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useAppSelector((state) => state.uiReducer.isDark);
  const router = useRouter();

  return (
    <div
      className='relative mb-4 w-full px-2.5'
      onClick={() => {
        dispatch(
          setNotification({
            status: 'Info',
            message:
              'Start with an @ symbol to search for users by their username.',
          })
        );
        router.push('?search-result=true');
      }}
    >
      <div className='absolute right-5 top-3.5'>
        <Icon name='magnifier' size={20} color='#a1a1aa' dark={isDark} />
      </div>
      <input
        className='w-full rounded-lg bg-slate-200 py-3 pl-5 pr-14 outline-none dark:bg-zinc-700'
        placeholder='Search...'
        type='text'
        name='search-field'
        autoComplete='off'
        onChange={(e) => {
          if (setInputSearch) setInputSearch(e.target.value);
        }}
      />
    </div>
  );
}
