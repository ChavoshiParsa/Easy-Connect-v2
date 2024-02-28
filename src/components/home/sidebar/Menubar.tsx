import ActionButtons from './ActionButtons';
import MenuList from './MenuList';
import Profile from './Profile';

export default function Menubar() {
  return (
    <div className='z-40 flex h-full w-11/12 flex-col bg-slate-50 shadow-2xl shadow-slate-700 dark:bg-zinc-900 xs:w-7/12 sm:w-5/12 lg:w-full lg:shadow-none'>
      <ActionButtons />
      <Profile />
      <MenuList />
    </div>
  );
}
