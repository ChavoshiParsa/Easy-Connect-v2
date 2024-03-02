import Icon from '@/components/ui/Icon';
import { sendMessage } from '@/actions/message-action';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { setNotification } from '@/redux/ui-slice';
import { useParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '@/socket';
import { addMessageFromUser } from '@/redux/messages-slice';
import { addContact, updateLastMessage } from '@/redux/contacts-slice';

export default function InputField() {
  const dispatch = useDispatch<AppDispatch>();

  const senderId = useAppSelector((state) => state.authReducer.credentials.id);
  const contactList = useAppSelector((state) => state.contactsReducer.chats);
  const userList = useAppSelector(
    (state) => state.usersReducer.usersCredentials
  );

  const params = useParams<{ contact: string }>();

  const [message, setMessage] = useState('');

  function inputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    socket.emit('activity', { senderId, receiverId: params.contact });
    setMessage(e.target.value);
  }

  async function sendMessageHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    socket.emit('message', { senderId, receiverId: params.contact, message });

    const index = contactList.findIndex(
      (contact) => contact.id === params.contact
    );
    if (index === -1) {
      const contact = userList.find((user) => user.id === params.contact);
      if (contact)
        dispatch(
          addContact({
            id: params.contact,
            firstName: contact.firstName,
            lastName: contact.lastName,
            isOnline: contact.isOnline,
            newMassages: 0,
            src: contact.profileUrl,
            theme: contact.theme,
            lastMessage: {
              text: message,
              time: new Date().toString(),
              status: 'sent',
            },
          })
        );
    } else {
      dispatch(
        updateLastMessage({
          id: params.contact,
          lastMessage: {
            text: message,
            time: new Date().toString(),
            status: 'sent',
          },
        })
      );
      dispatch(addMessageFromUser({ contactId: params.contact, message }));
    }

    try {
      setMessage('');
      await sendMessage(params.contact, message);
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
        onChange={inputChangeHandler}
        value={message}
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
