import SwitchButton from '../home/sidebar/SwitchButton';

export default function Header() {
  return (
    <div className='flex w-full items-center justify-between'>
      <span className='animate-pulse text-xl font-bold text-purlue dark:text-purlue-dark'>
        Easy Connect
      </span>
      <SwitchButton />
    </div>
  );
}
