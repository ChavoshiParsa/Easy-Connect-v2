import Topbar from '@/components/home/Topbar';
import Menu from '@/components/home/sidebar/Menu';

export default function MessagesPage() {
  return (
    <>
      <Menu />
      <main className='relative flex h-full flex-col items-center justify-start space-y-6 p-3'>
        <Topbar />
      </main>
    </>
  );
}
