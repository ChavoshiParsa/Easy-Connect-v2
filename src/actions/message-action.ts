'use server';

import { MessageType } from '@/components/home/chat-screen/Message';
import { prisma } from '../../prisma/prisma';
import { auth } from '@/auth';

export async function sendMessage(receiverId: string, text: string) {
  const session = await auth();
  if (!session?.user?.email) return [];

  const sender = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    select: { chats: true, id: true },
  });

  if (!sender?.id) return [];

  const prevChat = sender?.chats.find((c) => c.receiverId === receiverId);

  if (prevChat === undefined) {
    // no chat before
    // connect sender to receiver
    await prisma.user.update({
      where: { id: sender?.id },
      data: {
        chats: {
          create: {
            receiverId,
            messages: { create: { status: 'sent', text } },
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
            receiverId: sender?.id,
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
      where: { id: sender?.id },
      data: {
        chats: {
          update: {
            where: { id: prevChat.id },
            data: {
              messages: { create: { status: 'sent', text } },
            },
          },
        },
      },
    });
    // new message from sender to receiver
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
      select: { chats: true },
    });

    const chat = receiver?.chats.find((c) => c.receiverId === sender?.id);

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

export default async function getMessages(contactId: string) {
  const session = await auth();
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    select: { chats: true, id: true },
  });

  if (!user?.id) return [];

  const isAnyChat = user?.chats.find((c) => c.receiverId === contactId);

  if (isAnyChat === undefined) {
    return [];
  } else {
    const userChats = await prisma.user.findFirst({
      where: { id: user?.id },
      select: {
        chats: {
          where: {
            senderId: user?.id,
            AND: {
              receiverId: contactId,
            },
          },
          select: { messages: true },
        },
      },
    });
    const contactChats = await prisma.user.findFirst({
      where: { id: contactId },
      select: {
        chats: {
          where: {
            senderId: contactId,
            AND: {
              receiverId: user?.id,
            },
          },
          select: { messages: true },
        },
      },
    });

    const transformedUserMessages: MessageType[] =
      userChats?.chats[0]?.messages?.map(({ id, text, createdAt, status }) => {
        return {
          id,
          text,
          time: createdAt.toString(),
          status,
        };
      }) ?? [];

    const transformedContactMessages: MessageType[] =
      contactChats?.chats[0]?.messages.map(({ id, text, createdAt }) => {
        return {
          id,
          text,
          time: createdAt.toString(),
        };
      }) ?? [];

    const mergedMessages = [
      ...transformedUserMessages,
      ...transformedContactMessages,
    ];

    mergedMessages.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    return mergedMessages;
  }
}
