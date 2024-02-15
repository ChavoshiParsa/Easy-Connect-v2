import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { compareSync } from 'bcrypt-ts';
import { z } from 'zod';
import { prisma } from '../prisma/prisma';
import Credentials from 'next-auth/providers/credentials';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email().toLowerCase(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await prisma.user.findUnique({
            where: { email: email.trim() },
          });

          if (!user) return null;
          const passwordsMatch = compareSync(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});
