import Icon from '@/components/ui/Icon';
import SwitchButton from './SwitchButton';
import { toggleMenu } from '@/redux/ui-slice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

export default function ActionButtons() {
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useAppSelector((state) => state.uiReducer.isDark);
  return (
    <div className='flex items-center justify-between bg-slate-200 p-3.5 dark:bg-zinc-800'>
      <button className='lg:hidden' onClick={() => dispatch(toggleMenu())}>
        <Icon name='close' size={24} dark={isDark} />
      </button>
      <span className='animate-pulse font-bold text-active dark:text-active-dark'>
        Easy Connect
      </span>
      <SwitchButton />
    </div>
  );
}
