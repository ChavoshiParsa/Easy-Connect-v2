import Frameworks from '@/components/landing/Frameworks';
import Introduction from '@/components/landing/Introduction';
import Navbar from '@/components/landing/Navbar';
import Services from '@/components/landing/Services';

export default async function LandingPage() {
  return (
    <main className='flex w-full flex-col items-center justify-start overflow-y-scroll bg-slate-100  dark:bg-zinc-900'>
      <Navbar />
      <Introduction />
      <Services />
      <Frameworks />
    </main>
  );
}
