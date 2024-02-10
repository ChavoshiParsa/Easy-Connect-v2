import { useContextProvider } from '@/context/store';

export default function Backdrop() {
  const { setIsMenuOpen } = useContextProvider();
  return (
    <div
      className='fixed z-20 h-full w-full bg-[#00000060] lg:hidden'
      onClick={() => setIsMenuOpen(false)}
    />
  );
}
