import { MouseEventHandler } from 'react';
import { useFormStatus } from 'react-dom';

export function SubmitButton({
  onClick,
  disabled,
  validate,
  name,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  validate: boolean;
  name: 'Register' | 'Login';
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className='w-full rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-500 py-2.5 text-xl text-slate-100'
      onClick={onClick}
      disabled={validate && (disabled || pending)}
      type='submit'
    >
      {!pending ? name : 'Submitting...'}
    </button>
  );
}
