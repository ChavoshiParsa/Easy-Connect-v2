import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className='flex w-full flex-nowrap bg-zinc-950 px-4 pb-8 pt-6 text-slate-100 md:px-12 md:pb-14 md:pt-10'
      id='footer'
    >
      <div className='mr-6 flex flex-col items-start justify-between space-y-3 md:space-y-6'>
        <h3 className='inline-block text-nowrap bg-gradient-to-r from-violet-500 to-blue-400 bg-clip-text text-lg font-bold text-transparent md:text-2xl'>
          Easy Connect
        </h3>
        <span className='text-xs md:text-base'>
          The Last Chat App you&apos;ll ever need
        </span>
        <div className='flex items-center justify-start space-x-2'>
          <LinkIcon name='github' link='https://github.com/ChavoshiParsa' />
          <LinkIcon name='telegram' link='https://t.me/Pachav' />
          <LinkIcon
            name='instagram'
            link='https://www.instagram.com/parsa__chavoshi'
          />
        </div>
      </div>
      <div className='ml-auto hidden flex-col items-start justify-start space-y-1.5 md:mr-12 md:space-y-3 lg:flex xl:mr-24'>
        <h4 className='mb-2 text-nowrap text-lg md:text-xl'>Help</h4>
        <span className='text-xs text-slate-500 md:text-sm'>Support</span>
        <span className='text-xs text-slate-500 md:text-sm'>
          Knowledge base
        </span>
        <span className='text-xs text-slate-500 md:text-sm'>Tutorials</span>
      </div>
      <div className='mr-6 hidden flex-col items-start justify-start space-y-1.5 sm:flex md:mr-12 md:space-y-3 xl:mr-24'>
        <h4 className='mb-2 text-nowrap text-lg md:text-xl'>Features</h4>
        <span className='text-xs text-slate-500 md:text-sm'>Safety</span>
        <span className='text-xs text-slate-500 md:text-sm'>Realtime</span>
        <span className='text-xs text-slate-500 md:text-sm'>
          IOS and Android apps
        </span>
        <span className='text-xs text-slate-500 md:text-sm'>
          User management
        </span>
      </div>
      <div className='mr-6 hidden flex-col items-start justify-start space-y-1.5 xs:flex md:mr-12 md:space-y-3 xl:mr-24'>
        <h4 className='mb-2 text-nowrap text-lg md:text-xl'>Company</h4>
        <span className='text-xs text-slate-500 md:text-sm'>About us</span>
        <span className='text-xs text-slate-500 md:text-sm'>Career</span>
      </div>
      <div className='flex flex-col items-start justify-start space-y-1.5 md:space-y-3'>
        <h4 className='mb-2 text-nowrap text-lg md:text-xl'>Contact us</h4>
        <span className='text-xs text-slate-500 md:text-sm'>+989016038768</span>
        <span className='text-xs text-slate-500 md:text-sm'>
          parypary82@ gmail.com
        </span>
        <span className='text-xs text-slate-500 md:text-sm'>Iran, Tehran</span>
      </div>
    </footer>
  );
}

const LinkIcon = ({ name, link }: { name: string; link: string }) => {
  return (
    <Link
      className='relative size-7 rounded-full bg-slate-200 shadow md:size-10'
      href={link}
      target='_blank'
    >
      <Image
        className='p-1 transition-all hover:scale-110'
        src={`/icons/${name}.svg`}
        alt={`${name} icon`}
        fill
      />
    </Link>
  );
};
