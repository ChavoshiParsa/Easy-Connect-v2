import { AppDispatch } from '@/redux/store';
import { setIsMenuOpen } from '@/redux/ui-slice';
import { useDispatch } from 'react-redux';

export default function Backdrop() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      className='fixed z-20 h-full w-full bg-[#00000060] lg:hidden'
      onClick={() => dispatch(setIsMenuOpen(false))}
    />
  );
}
