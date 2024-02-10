import Icon from '@/components/ui/Icon';
import { useState } from 'react';

export default function InputField() {
  const [message, setMessage] = useState('');

  return (
    <form
      className='z-20 flex w-full items-center justify-between space-x-2 py-4 children:shadow-xl'
      onSubmit={() => {}}
    >
      <input
        className='w-full rounded-lg bg-slate-50 px-5 py-3 outline-none dark:bg-zinc-700'
        placeholder='Write a message...'
        type='text'
        name='message-field'
        onChange={(e) => setMessage(e.target.value)}
        autoComplete='off'
        required
      />
      <button
        className='rounded-full p-3'
        style={{ background: `${message ? '#6A4DFF' : 'gray'}` }}
        type='submit'
      >
        <Icon name='send' size={24} color='#FFF' />
      </button>
    </form>
  );
}
