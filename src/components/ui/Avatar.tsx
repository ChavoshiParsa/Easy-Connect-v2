import { gradientColors } from '@/utils/color-theme';
import { Theme } from '@prisma/client';
import Image from 'next/image';

export default function Avatar({
  firstName,
  lastName,
  src,
  size,
  online,
  theme,
}: {
  firstName: string;
  lastName: string;
  src: string;
  size: number;
  online?: boolean;
  theme: Theme;
}) {
  const ffl = firstName.charAt(0).toUpperCase();
  const lfl = lastName.charAt(0).toUpperCase();

  return (
    <div className='relative rounded-full bg-zinc-200 dark:bg-zinc-800'>
      {online && (
        <div className='absolute bottom-0.5 right-0.5  z-10 h-3 w-3 animate-pulse rounded-full border-2 border-zinc-50 bg-active dark:border-zinc-900 dark:bg-active-dark' />
      )}
      <div
        className='relative flex items-center justify-center overflow-hidden rounded-full'
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `${src === '' ? gradientColors[theme] : ''}`,
        }}
      >
        {src !== '' ? (
          <Image
            style={{ objectFit: 'contain' }}
            src={src}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            alt={`a portrait of ${firstName + ' ' + lastName}`}
            fill
            priority
          />
        ) : (
          <span className='text-slate-50'>{ffl + lfl}</span>
        )}
      </div>
    </div>
  );
}
