'use server';

import { ChatItemType } from '@/components/home/chat/ChatItem';
import { prisma } from '../../prisma/prisma';
import { MessageType } from '@/components/home/chat-screen/Message';
import { auth } from '@/auth';
import { date } from 'zod';

export async function getChats() {
  const session = await auth();
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    select: { chats: true },
  });

  if (user?.chats === undefined) {
    return [];
  } else {
    const mappedChats: ChatItemType[] = await Promise.all(
      user.chats.map(async (chat) => {
        const userChats = await prisma.user.findFirst({
          where: { id: chat.senderId },
          select: {
            chats: {
              where: {
                senderId: chat.senderId,
                AND: {
                  receiverId: chat.receiverId,
                },
              },
              select: {
                messages: {
                  orderBy: {
                    createdAt: 'desc',
                  },
                  take: 1,
                },
              },
            },
          },
        });

        const contactChats = await prisma.user.findFirst({
          where: { id: chat.receiverId },
          select: {
            chats: {
              where: {
                senderId: chat.receiverId,
                AND: {
                  receiverId: chat.senderId,
                },
              },
              select: {
                messages: {
                  orderBy: {
                    createdAt: 'desc',
                  },
                  take: 1,
                },
              },
            },
          },
        });

        const transformedUserMessages: MessageType[] =
          userChats?.chats[0]?.messages?.map(
            ({ id, text, createdAt, status }) => ({
              id,
              text,
              time: createdAt.toString(),
              status,
            })
          ) ?? [];

        const transformedContactMessages: MessageType[] =
          contactChats?.chats[0]?.messages.map(({ id, text, createdAt }) => ({
            id,
            text,
            time: createdAt.toString(),
          })) ?? [];

        const mergedMessages = [
          ...transformedUserMessages,
          ...transformedContactMessages,
        ].sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        const contact = await prisma.user.findUnique({
          where: {
            id: chat.receiverId,
          },
          select: {
            firstName: true,
            lastName: true,
            profileUrl: true,
            theme: true,
            isOnline: true,
          },
        });

        return {
          id: chat.receiverId as string,
          firstName: contact?.firstName || '',
          lastName: contact?.lastName || '',
          src: contact?.profileUrl || '',
          newMessages: chat.newMessages ?? 0,
          theme: contact?.theme || 'red',
          lastMessage: mergedMessages[0].status
            ? {
                text: mergedMessages[0].text ?? '',
                time: mergedMessages[0].time ?? '',
                status: mergedMessages[0].status ?? 'pending',
              }
            : {
                text: mergedMessages[0].text ?? '',
                time: mergedMessages[0].time ?? '',
              },
          isOnline: contact?.isOnline || false,
        };
      })
    );

    return mappedChats;
  }
}

export async function openNewMessages(contactId: string) {
  const session = await auth();
  if (!session?.user?.email) return;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { chats: true, unreadMessages: true },
  });

  if (!user) return;

  const chat = user.chats.find((contact) => contact.receiverId === contactId);
  if (!chat) return;
  const { id, newMessages } = chat;

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      chats: {
        update: {
          where: { id },
          data: {
            newMessages: 0,
          },
        },
      },
    },
  });

  await prisma.user.update({
    where: { email: session.user.email },
    data: { unreadMessages: user.unreadMessages - newMessages },
  });
}
