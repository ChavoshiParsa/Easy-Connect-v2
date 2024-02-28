import Menubar from './Menubar';
import Backdrop from '@/components/ui/Backdrop';

export default function Menu() {
  return (
    <div className='absolute z-30 flex h-full w-full lg:relative'>
      <Menubar />
      <Backdrop />
    </div>
  );
}
