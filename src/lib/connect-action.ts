'use server';

import { MessageType } from '@/components/home/chat-screen/Message';
import { prisma } from '../../prisma/prisma';

export async function sendMessage(
  senderId: string,
  receiverId: string,
  text: string
) {
  const sender = await prisma.user.findUnique({
    where: { id: senderId },
    select: { chats: true },
  });

  const prevChat = sender?.chats.find((c) => c.receiverId === receiverId);

  if (prevChat === undefined) {
    // no chat before
    // connect sender to receiver
    await prisma.user.update({
      where: { id: senderId },
      data: {
        chats: {
          create: {
            receiverId: receiverId,
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

    const chat = receiver?.chats.find((c) => c.receiverId === senderId);

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

export default async function getMessages(userId: string, contactId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { chats: true },
  });

  const isAnyChat = user?.chats.find((c) => c.receiverId === contactId);

  if (isAnyChat === undefined) {
    return [];
  } else {
    const userChats = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        chats: {
          where: {
            senderId: userId,
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
              receiverId: userId,
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
