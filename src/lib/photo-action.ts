'use server';

import { UTApi } from 'uploadthing/server';

export async function deletePhoto(photo: string) {
  const utapi = new UTApi();
  if (photo !== '') {
    await utapi.deleteFiles(photo);
  }
}
