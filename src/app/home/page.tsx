import { auth } from '@/auth';
import Home from '@/components/home/Home';
import { prisma } from '../../../prisma/prisma';

export default async function HomePage() {
  const session = await auth();
  if (!session?.user?.email) return;
  const credential = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profileUrl: true,
      biography: true,
      username: true,
      email: true,
    },
  });
  if (!credential) return;
  return <Home credentials={credential} />;
}
