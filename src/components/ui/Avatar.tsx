import Image from 'next/image';

export default function Avatar({
  firstName,
  lastName,
  src,
  size,
  online,
}: {
  firstName: string;
  lastName: string;
  src: string;
  size: number;
  online?: boolean;
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
          backgroundImage: `${src === '' ? gradientColors[grn(0, gradientColors.length)] : ''}`,
        }}
      >
        {src !== '' ? (
          <Image
            style={{ width: `${size}px`, height: 'auto' }}
            src={src}
            alt={`a portrait of ${firstName + ' ' + lastName}`}
            width={size}
            height={size}
          />
        ) : (
          <span className='text-slate-50'>{ffl + lfl}</span>
        )}
      </div>
    </div>
  );
}

export const gradientColors = [
  'linear-gradient(to bottom, #7dd3fc, #0ea5e9, #0369a1)',
  'linear-gradient(to bottom, #fdba74, #f97316, #c2410c)',
  'linear-gradient(to bottom, #d8b4fe, #a855f7, #7e22ce)',
  'linear-gradient(to bottom, #6ee7b7, #10b981, #047857)',
  'linear-gradient(to bottom, #a5b4fc, #6366f1, #4338ca)',
  'linear-gradient(to bottom, #fda4af, #f43f5e, #be123c)',
];

export const grn = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
