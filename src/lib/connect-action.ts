'use server';

import { create } from 'domain';
import { prisma } from '../../prisma/prisma';

export async function sendMessage(
  senderId: string,
  receiverId: string,
  text: string
) {
  let sender = await prisma.user.findUnique({
    where: { id: senderId },
    select: { chats: true },
  });

  let prevChat = sender?.chats.find((c) => c.receiverId === receiverId);

  if (prevChat === undefined) {
    // no chat before
    // connect sender to receiver
    await prisma.user.update({
      where: { id: senderId },
      data: {
        chats: {
          create: {
            receiverId: receiverId,
            messages: { create: { status: 'SENT', text } },
          },
        },
      },
    });
    // connect receiver to sender
    await prisma.user.update({
      where: { id: receiverId },
      data: {
        chats: {
          create: {
            receiverId: senderId,
            newMessages: 1,
          },
        },
        unreadMessages: { increment: 1 },
      },
    });
  } else {
    // already chat
    // message sender to receiver
    await prisma.user.update({
      where: { id: senderId },
      data: {
        chats: {
          update: {
            where: { id: prevChat.id },
            data: {
              messages: { create: { status: 'SENT', text } },
            },
          },
        },
      },
    });
    // new message from sender to receiver
    let receiver = await prisma.user.findUnique({
      where: { id: receiverId },
      select: { chats: true },
    });

    let chat = receiver?.chats.find((c) => c.receiverId === senderId);

    await prisma.user.update({
      where: { id: receiverId },
      data: {
        chats: {
          update: {
            where: { id: chat?.id },
            data: {
              newMessages: { increment: 1 },
            },
          },
        },
        unreadMessages: { increment: 1 },
      },
    });
  }
}
