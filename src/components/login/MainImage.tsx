import { useAppSelector } from '@/redux/store';
import Image from 'next/image';

export default function MainImage({
  page,
  alt,
}: {
  page: 'up' | 'in';
  alt: string;
}) {
  const isDark = useAppSelector((state) => state.uiReducer.isDark);

  return (
    <Image
      className='object-cover object-center'
      src={
        isDark
          ? `/images/sign-${page}-dark.jpg`
          : `/images/sign-${page}-light.jpg`
      }
      alt={alt}
      fill
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      priority
    />
  );
}
