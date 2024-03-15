import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className='mb-2 w-full py-4 md:mb-4'>
      <nav className='flex w-full items-center justify-between whitespace-nowrap'>
        <Link
          className='flex items-center justify-center space-x-2 md:space-x-4'
          href='/'
        >
          <Image
            src='/images/logo.png'
            className='size-12 md:size-16'
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
              href='https://next-portfolio-delta-coral.vercel.app'
              target='_blank'
            >
              About
            </Link>
          </li>
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
