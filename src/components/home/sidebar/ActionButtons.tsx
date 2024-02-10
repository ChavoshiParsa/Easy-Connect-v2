import Icon from '@/components/ui/Icon';
import { useContextProvider } from '@/context/store';
import SwitchButton from './SwitchButton';

export default function ActionButtons() {
  const { isDark, setIsMenuOpen } = useContextProvider();
  return (
    <div className='flex items-center justify-between bg-slate-200 p-3.5 dark:bg-zinc-800'>
      <button
        className='lg:hidden'
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <Icon name='close' size={24} dark={isDark} />
      </button>
      <span className='animate-pulse font-bold text-active dark:text-active-dark'>
        Easy Connect
      </span>
      <SwitchButton />
    </div>
  );
}
