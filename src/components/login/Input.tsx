import { useContextProvider } from '@/context/store';
import Icon from '../ui/Icon';
import { ChangeEventHandler, LegacyRef, forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    name,
    onChange,
    validate,
    error,
  }: {
    name: 'email' | 'password';
    onChange: ChangeEventHandler<HTMLInputElement> | undefined;
    validate: boolean;
    error: string;
  },
  ref: LegacyRef<HTMLInputElement>
) {
  const { isDark } = useContextProvider();

  return (
    <div className='relative w-full'>
      <div className='absolute left-3 top-3'>
        <Icon name={name} size={24} color='#94a3b8' dark={isDark} />
      </div>
      <input
        className='w-full rounded-lg border border-slate-200 bg-slate-100 py-3 pl-12 pr-4 outline-none dark:border-slate-700 dark:bg-zinc-800'
        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
        type={name}
        name={name}
        autoComplete='off'
        ref={ref}
        onChange={onChange}
        required
        minLength={6}
      />
      {error && validate && (
        <p className='absolute w-full text-left text-xs text-rose-600 dark:text-rose-400 '>
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
