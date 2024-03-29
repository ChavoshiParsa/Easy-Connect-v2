'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '../../prisma/prisma';
import { z } from 'zod';
import { hashSync } from 'bcrypt-ts';
import { colorNames, grn } from '@/utils/color-theme';

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

export async function validateEmailPass(formData: {
  email: string;
  password: string;
}) {
  try {
    const parsedCredentials = z
      .object({
        email: z.string().email().toLowerCase().trim(),
        password: z.string().min(6),
      })
      .safeParse(formData);

    if (parsedCredentials.success) {
      const { email } = parsedCredentials.data;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        return "You've already registered with this email. Want to try sign in instead?";
      }
    } else return 'Please provide valid credentials.';
  } catch (error: any) {
    return error.toString();
  }
}

export async function register(formData: {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  bio: string;
}) {
  let safeEmail: string;
  let safePass: string;
  try {
    const parsedCredentials = z
      .object({
        username: z.string().min(4).max(20).toLowerCase().trim(),
        email: z.string().email().toLowerCase().trim(),
        password: z.string().min(6),
        firstName: z.string().min(1).max(20).trim(),
        lastName: z.string().max(20).trim(),
        photoUrl: z.string(),
        bio: z.string().max(72).trim(),
      })
      .safeParse(formData);

    if (parsedCredentials.success) {
      const { email, password, username, firstName, lastName, photoUrl, bio } =
        parsedCredentials.data;

      safeEmail = email;
      safePass = password;

      const existingUsername = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (existingUsername) {
        return 'This username is already taken. Please choose a different username.';
      }
      const hashedPass = hashSync(password);

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPass,
          firstName,
          lastName,
          profileUrl: photoUrl,
          biography: bio,
          theme: colorNames[grn(0, colorNames.length)],
          lastSeen: Date.now().toString(),
        },
      });
    } else return 'Please provide valid credentials.';
  } catch (error: any) {
    return error.toString();
  }
  return await authenticate({
    email: safeEmail,
    password: safePass,
  });
}

export async function validateUsername(username: string) {
  const usernameSchema = z
    .string()
    .trim()
    .min(4, { message: 'Username must be at least 4 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Username must contain only English letters and numbers',
    });

  const safeUsername = usernameSchema.safeParse(username);

  if (safeUsername.success) {
    const existingUsername = await prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
    });
    if (existingUsername) {
      return { message: 'This username is already taken.', isValid: false };
    } else {
      return { message: `${username} is available.`, isValid: true };
    }
  } else {
    return { message: safeUsername.error.errors[0].message, isValid: false };
  }
}
