'use server';

import { prisma } from '../../prisma/prisma';

export async function getLengths() {
  const userLength = await prisma.user.count();
  const chatLength = await prisma.chat.count();
  const messageLength = await prisma.message.count();
  return { userLength, chatLength, messageLength };
}
