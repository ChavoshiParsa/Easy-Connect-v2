import Icon from '@/components/ui/Icon';
import { sendMessage } from '@/lib/connect-action';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { setNotification } from '@/redux/ui-slice';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function InputField() {
  const dispatch = useDispatch<AppDispatch>();

  const senderId = useAppSelector((state) => state.authReducer.credentials.id);
  const loading = useAppSelector((state) => state.authReducer.loading);
  const params = useParams<{ contact: string }>();

  const [message, setMessage] = useState('');

  // error state
  // loading state

  async function sendMessageHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    try {
      // loading state
      await sendMessage(senderId, params.contact, message);
      // updating ui - message slice
    } catch (error: any) {
      dispatch(
        setNotification({
          status: 'Error',
          message: error.message,
        })
      );
    }
  }

  return (
    <form
      className='z-20 flex w-full items-center justify-between space-x-2 py-4 children:shadow-xl'
      onSubmit={sendMessageHandler}
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
