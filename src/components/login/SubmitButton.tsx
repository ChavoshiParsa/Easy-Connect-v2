import { MouseEventHandler } from 'react';

export function SubmitButton({
  onClick,
  disabled,
  validate,
  name,
  pending,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  validate: boolean;
  name: 'Register' | 'Login' | 'Submit';
  pending: boolean;
}) {
  return (
    <button
      className='relative w-full rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-500 py-2 text-base text-slate-100 transition hover:scale-[1.01] hover:from-indigo-600 hover:to-indigo-400 disabled:hover:scale-100 md:py-2.5 md:text-xl'
      onClick={onClick}
      disabled={validate && (disabled || pending)}
      type='submit'
    >
      {pending && name !== 'Submit' && (
        <div className='absolute left-10 top-3.5 h-5 w-5 animate-spin rounded-full border-2 border-[#00000041] border-r-slate-100 bg-transparent' />
      )}
      {!pending ? name : 'Submitting...'}
    </button>
  );
}
