'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get('modal');
  const pathname = usePathname();

  return (
    <>
      {modal && (
        <dialog className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur'>
          <div className='m-auto bg-white p-8'>
            <div className='flex flex-col items-center'>
              <p>Modal content</p>
              <br />
              <Link href={pathname}>
                <button type='button' className='bg-red-500 p-2 text-white'>
                  Close Modal
                </button>
              </Link>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
