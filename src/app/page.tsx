import Introduction from '@/components/landing/Introduction';
import Navbar from '@/components/landing/Navbar';
import { prisma } from '../../prisma/prisma';

export default async function LandingPage() {
  const userLength = await prisma.user.count();
  const chatLength = await prisma.chat.count();
  const messageLength = await prisma.message.count();

  return (
    <main className='flex h-full w-full flex-col items-center justify-start overflow-y-scroll bg-slate-100 px-4 dark:bg-zinc-900 xs:px-6 sm:px-8 md:px-10 lg:px-12  xl:px-14'>
      <Navbar />
      <Introduction
        userLength={userLength}
        chatLength={chatLength}
        messageLength={messageLength}
      />
    </main>
  );
}
