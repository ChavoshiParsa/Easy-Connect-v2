import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header
      className='sticky top-0 z-30 w-full bg-slate-50 px-4 py-1.5 shadow-md dark:bg-zinc-950 xs:px-6 sm:px-8 md:px-10 md:py-2 lg:px-12 xl:px-14'
      id='header'
    >
      <nav className='flex w-full items-center justify-between whitespace-nowrap'>
        <Link
          className='flex items-center justify-center space-x-2 md:space-x-4'
          href='/'
        >
          <Image
            src='/images/logo.png'
            className='size-10 md:size-12'
            alt='logo of app'
            width={100}
            height={100}
          />
          <span className='hidden text-2xl font-bold xs:block md:text-3xl'>
            Easy Connect
          </span>
        </Link>
        <ul className='hidden items-center justify-center space-x-4 hover:children:underline md:flex lg:space-x-8'>
          <li className=''>
            <Link
              className=''
              href='https://github.com/ChavoshiParsa/Easy-Connect-v2'
              target='_blank'
            >
              Source
            </Link>
          </li>
          <li className=''>
            <Link className='' href='#services'>
              Services
            </Link>
          </li>
          <li className=''>
            <Link className='' href='#frameworks'>
              Frameworks
            </Link>
          </li>
        </ul>
        <div className='flex items-center justify-center space-x-4 text-lg'>
          <Link className='hover:underline' href='/sign-up'>
            Sign up
          </Link>
          <Link
            className='rounded-lg bg-purlue px-3 py-1 text-white transition-colors hover:bg-violet-500'
            href='/sign-in'
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}
