import Image from 'next/image';
import { hexToFilter } from '../../../lib/hex-to-filter';

export default function Icon({
  name,
  size,
  color,
  dark,
}: {
  name: string;
  size: number;
  color?: string;
  dark?: boolean;
}) {
  let filteredColor;
  if (color) filteredColor = hexToFilter(color);
  else if (dark) filteredColor = hexToFilter('#f4f4f5');
  else filteredColor = hexToFilter('#3f3f46');

  return (
    <div
      className='relative'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: `${filteredColor}`,
      }}
    >
      <Image src={`/icons/${name}.svg`} alt='hamburger icon' fill />
    </div>
  );
}
