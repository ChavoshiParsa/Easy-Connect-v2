'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '../../prisma/prisma';
import { z } from 'zod';

export async function logout() {
  await signOut();
}

export async function authenticate(formData: {
  email: string;
  password: string;
}) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password! Please check your credentials and try again.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(formData: { email: string; password: string }) {
  try {
    const parsedCredentials = z
      .object({
        email: z.string().email().toLowerCase(),
        password: z.string().min(6),
      })
      .safeParse(formData);

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        return "You've already registered with this email. Try sign in?";
      }
    } else return 'Please provide valid credentials.';
  } catch (error: any) {
    return error.toString();
  }
}
// return await authenticate(formData);

// if (parsedCredentials.success) {
//   const { email, password } = parsedCredentials.data;
//   const hashedPass = hashSync(password);
//   const user = await prisma.user.create({
//     data: {
//       email,
//       password: hashedPass,
//       fist_name: 'Parsa',
//       username: Math.random().toString(),
//     },
//   });
//   console.log(user);
// } else return 'please enter real email';
