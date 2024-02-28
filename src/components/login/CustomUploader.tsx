import { deletePhoto } from '@/actions/photo-action';
import { AppDispatch } from '@/redux/store';
import { setNotification } from '@/redux/ui-slice';
import { useUploadThing } from '@/utils/uploadthing';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UploadFileResponse } from 'uploadthing/client';

const SIZE = 1024;

export default function CustomUploader({
  email,
  profilePhotoUrl,
  setProfilePhotoUrl,
}: {
  email: string;
  profilePhotoUrl: string;
  setProfilePhotoUrl: Dispatch<SetStateAction<string>>;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [progress, setProgress] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing('imageUploader', {
    onUploadBegin: async () => {
      setLoading(true);
      if (profilePhotoUrl === '') return;
      const key = profilePhotoUrl.split('/')[4];
      await deletePhoto(key);
    },
    onUploadProgress(p: number) {
      setProgress(p);
    },
    onClientUploadComplete: async (
      res: UploadFileResponse<{
        uploadedBy: string;
      }>[]
    ) => {
      if (res && res.length > 0) {
        const { url } = res[0];
        setProfilePhotoUrl(url);
      }
      dispatch(
        setNotification({
          status: 'Info',
          message: 'Your photo has been successfully uploaded.',
        })
      );
      setLoading(false);
    },
    onUploadError: (error: Error) => {
      setNotification({ status: 'Error', message: error.message });
      setLoading(false);
    },
  });

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const imageFile: File | undefined = event.target.files?.[0];

    if (!imageFile) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = (readerE: ProgressEvent<FileReader>) => {
      const imageUrl: string | ArrayBuffer | null | undefined =
        readerE.target?.result;

      if (typeof imageUrl !== 'string' || !imageUrl) {
        return;
      }

      const imageTag = document.createElement('img');
      imageTag.src = imageUrl as string;

      imageTag.onload = (imageTagE: Event) => {
        let canvas = document.createElement('canvas');
        let ratio = SIZE / (imageTagE.target as HTMLImageElement).width;
        canvas.width = SIZE;
        canvas.height = (imageTagE.target as HTMLImageElement).height * ratio;

        const context = canvas.getContext('2d');
        if (!context) return;
        context.drawImage(
          imageTag as HTMLImageElement,
          0,
          0,
          canvas.width,
          canvas.height
        );
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFile = new File([blob], `${email}.jpg`, {
                type: 'image/jpg',
                lastModified: Date.now(),
              });
              startUpload([newFile]);
            }
          },
          'image/jpg',
          0.9
        );
      };
    };
  };
  return (
    <>
      {progress && progress !== 100 ? (
        <progress
          className='w-28 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-200
            [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-purlue'
          id='photo'
          value={progress}
          max='100'
        >
          {progress} %
        </progress>
      ) : (
        <label className='flex cursor-pointer flex-col items-center justify-center rounded-md border border-sky-600 px-1 py-0.5 text-sm text-sky-600 hover:bg-sky-600 hover:text-slate-50'>
          <input
            className='hidden'
            type='file'
            onChange={inputChangeHandler}
            disabled={loading}
          />
          <span className='flex flex-row items-center justify-center space-x-2'>
            {loading ? (
              <>
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-[#00000041] border-r-slate-100 bg-transparent' />
                <span>Uploading...</span>
              </>
            ) : (
              'Choose a Photo'
            )}
          </span>
        </label>
      )}
    </>
  );
}
