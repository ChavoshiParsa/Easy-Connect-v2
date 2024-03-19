import Footer from '@/components/landing/Footer';
import Frameworks from '@/components/landing/Frameworks';
import Introduction from '@/components/landing/Introduction';
import Navbar from '@/components/landing/Navbar';
import Services from '@/components/landing/Services';

export default async function LandingPage() {
  return (
    <>
      <Navbar />
      <main className='flex w-full flex-col items-center justify-start overflow-x-hidden overflow-y-scroll bg-slate-100 dark:bg-zinc-900'>
        <Introduction />
        <Services />
        <Frameworks />
      </main>
      <Footer />
    </>
  );
}
