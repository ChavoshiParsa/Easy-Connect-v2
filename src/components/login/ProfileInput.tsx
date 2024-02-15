import { ChangeEventHandler, LegacyRef, forwardRef } from 'react';

const ProfileInput = forwardRef(function Input(
  {
    name,
    onChange,
    validate,
    error,
    type,
  }: {
    name: string;
    onChange: ChangeEventHandler<HTMLInputElement> | undefined;
    validate: boolean;
    error: string;
    type: 'essential' | 'optional';
  },
  ref: LegacyRef<HTMLInputElement>
) {
  return (
    <div className='relative w-full'>
      <input
        className='w-full rounded border border-slate-200 bg-slate-50 px-4 py-1.5 outline-none dark:border-slate-700 dark:bg-zinc-800'
        placeholder={`${name.charAt(0).toUpperCase()}${name.slice(1)}${type === 'essential' ? '*' : ' (optional)'}`}
        type='text'
        name={name}
        autoComplete='off'
        ref={ref}
        onChange={onChange}
        required={type === 'essential'}
        minLength={name === 'username' ? 4 : 0}
        maxLength={20}
      />
      {error && validate && (
        <p className='absolute w-full text-left text-xs text-rose-600 dark:text-rose-400 '>
          {error}
        </p>
      )}
    </div>
  );
});

export default ProfileInput;
