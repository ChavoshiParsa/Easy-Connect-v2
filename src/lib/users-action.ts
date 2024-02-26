'use server';

import { auth } from '@/auth';
import { prisma } from '../../prisma/prisma';

export async function getLoggedUser() {
  try {
    const session = await auth();
    if (!session?.user?.email) return null;

    return await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profileUrl: true,
        biography: true,
        username: true,
        email: true,
        isOnline: true,
      },
    });
  } catch (error) {
    console.error('Error fetching logged user:', error);
  }
}

export async function getOtherUsers() {
  try {
    const session = await auth();
    if (!session?.user?.email) return null;

    return await prisma.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profileUrl: true,
        biography: true,
        username: true,
        email: true,
        isOnline: true,
      },
    });
  } catch (error) {
    console.error('Error fetching other users:', error);
  }
}

export async function getSingleUser(id: string) {
  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profileUrl: true,
        biography: true,
        username: true,
        email: true,
        isOnline: true,
      },
    });
    return user;
  } catch (error) {
    console.error('Error fetching other users:', error);
  } finally {
    return user;
  }
}
