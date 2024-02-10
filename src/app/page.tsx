import Link from 'next/link';

export default function IntroductionPage() {
  return (
    <main className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center space-x-2 self-end'>
        <Link
          className='rounded-md border-2 border-purlue px-3 py-1 text-lg'
          href='/sign-up'
        >
          Get started
        </Link>
        <Link
          className='rounded-md border-2 border-purlue px-3 py-1 text-lg'
          href='/sign-in'
        >
          Sign in
        </Link>
      </div>
      <Link
        className='mt-32 rounded-lg bg-purlue px-6 py-3 text-center text-3xl text-slate-50'
        href='/home'
      >
        Home Page
      </Link>
    </main>
  );
}
