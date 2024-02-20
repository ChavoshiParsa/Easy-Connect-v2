import Image from 'next/image';

export default function Avatar({
  name,
  size,
  online,
}: {
  name: string;
  size: number;
  online: boolean;
}) {
  return (
    <div className='relative rounded-full bg-zinc-100 dark:bg-zinc-900'>
      {online && (
        <div className='absolute bottom-0.5 right-0.5  z-10 h-3 w-3 animate-pulse rounded-full border-2 border-zinc-50 bg-active dark:border-zinc-900 dark:bg-active-dark' />
      )}
      <div
        className='bg-dark relative flex items-center justify-center overflow-hidden rounded-full'
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Image
          className=''
          src={`/images/${name}.jpg`}
          alt={`a portrait of ${name}`}
          width={size}
          height={size}
        />
      </div>
    </div>
  );
}
