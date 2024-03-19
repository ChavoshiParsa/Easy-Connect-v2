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
            <Icon name='react' size={148} link='https://react.dev' />
            <Icon name='next' size={148} link='https://nextjs.org' />
            <Icon name='redux' size={148} link='https://redux.js.org' />
            <Icon
              name='tailwindcss'
              size={148}
              link='https://tailwindcss.com'
            />
            <Icon name='axios' size={148} link='https://axios-http.com' />
          </div>
        </div>
        <div className='flex w-full flex-col items-center justify-center space-y-4 md:space-y-8'>
          <h2 className='text-center text-3xl md:text-5xl'>Server Side</h2>
          <div className='flex w-full items-center justify-center space-x-2 xs:space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10'>
            <Icon name='node' size={148} link='https://nodejs.org' />
            <Icon name='prisma' size={148} link='https://www.prisma.io' />
            <Icon name='mongodb' size={148} link='https://www.mongodb.com' />
            <Icon name='socketio' size={148} link='https://socket.io' />
            <Icon name='express' size={148} link='https://expressjs.com' />
          </div>
        </div>
      </div>
    </section>
  );
}

const Icon = ({
  name,
  size,
  link,
}: {
  name: string;
  size: number;
  link: string;
}) => {
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
