import Introduction from '@/components/landing/Introduction';
import Navbar from '@/components/landing/Navbar';
import Services from '@/components/landing/Services';

export default async function LandingPage() {
  return (
    <main className='flex w-full flex-col items-center justify-start overflow-y-scroll bg-slate-100  dark:bg-zinc-900'>
      <Navbar />
      <Introduction />
      <Services />
    </main>
  );
}
// px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14
