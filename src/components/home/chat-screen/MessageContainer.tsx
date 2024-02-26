import { useEffect, useRef } from 'react';
import Message from './Message';

export default function MessageContainer() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  function handleScreen() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    handleScreen();
    window.addEventListener('resize', handleScreen);
    return () => {
      window.removeEventListener('resize', handleScreen);
    };
  }, [scrollRef.current?.scrollHeight]);

  return (
    <div className='z-10 mt-auto w-full overflow-y-scroll' ref={scrollRef}>
      <div className='mt-3 flex h-fit w-full flex-col justify-end space-y-1.5'>
        <Message text='Hello' time='10:02 PM' />
      </div>
    </div>
  );
}
