import Image from 'next/image';
import Link from 'next/link';

export default function Frameworks() {
  return (
    <section
      className='flex w-full flex-col items-center justify-start space-y-10 px-4 py-10 md:space-y-20 md:px-20 md:py-20'
      id='frameworks'
    >
      <h1 className='w-full text-center text-3xl font-bold md:text-5xl'>
        Trendy{' '}
        <span className='inline-block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent '>
          Frameworks
        </span>{' '}
        for Modern Development
      </h1>
      <div className='flex w-full flex-col items-center justify-center space-y-8 md:space-y-16'>
        <div className='flex w-full flex-col items-center justify-center space-y-4 md:space-y-8'>
          <h2 className='text-center text-3xl md:text-5xl'>Client Side</h2>
          <div className='flex w-full items-center justify-center space-x-2 xs:space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10'>
            <LinkIcon name='react' link='https://react.dev' />
            <LinkIcon name='next' link='https://nextjs.org' />
            <LinkIcon name='redux' link='https://redux.js.org' />
            <LinkIcon name='tailwindcss' link='https://tailwindcss.com' />
            <LinkIcon name='axios' link='https://axios-http.com' />
          </div>
        </div>
        <div className='flex w-full flex-col items-center justify-center space-y-4 md:space-y-8'>
          <h2 className='text-center text-3xl md:text-5xl'>Server Side</h2>
          <div className='flex w-full items-center justify-center space-x-2 xs:space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10'>
            <LinkIcon name='node' link='https://nodejs.org' />
            <LinkIcon name='prisma' link='https://www.prisma.io' />
            <LinkIcon name='mongodb' link='https://www.mongodb.com' />
            <LinkIcon name='socketio' link='https://socket.io' />
            <LinkIcon name='express' link='https://expressjs.com' />
          </div>
        </div>
      </div>
    </section>
  );
}

const LinkIcon = ({ name, link }: { name: string; link: string }) => {
  return (
    <Link
      className='relative size-14 rounded-full bg-white shadow xs:size-20 sm:size-24 md:size-28 lg:size-32'
      href={link}
      target='_blank'
    >
      <Image
        className='p-2.5 transition-all hover:scale-110 xs:p-3 md:p-4 lg:p-5'
        src={`/icons/${name}.svg`}
        alt={`${name} icon`}
        fill
      />
    </Link>
  );
};
