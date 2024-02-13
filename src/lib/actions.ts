'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '../../prisma/prisma';
import { z } from 'zod';
import { hashSync } from 'bcrypt-ts';

export async function logout() {
  await signOut();
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const parsedCredentials = z
      .object({
        email: z.string().email().toLowerCase(),
        password: z.string().min(6),
      })
      .safeParse(formDataObj);

    console.log(parsedCredentials);

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;
      const hashedPass = hashSync(password);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPass,
          fist_name: 'Parsa',
          username: Math.random().toString(),
        },
      });
      console.log(user);
    } else return 'please enter real email';
  } catch (error: any) {
    return error.toString();
  }
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
