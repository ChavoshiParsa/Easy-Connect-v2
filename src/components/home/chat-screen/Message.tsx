import Icon from '@/components/ui/Icon';
import { useContextProvider } from '@/redux/context';

type Message = {
  text: string;
  time: string;
  status?: 'sent' | 'seen' | 'pending';
};

export default function Message({ text, time, status }: Message) {
  return (
    <div
      className='flex w-4/5 max-w-max flex-col space-y-1.5 px-3 pb-1 pt-2.5 leading-5'
      style={{
        alignSelf: `${status ? 'self-end' : 'self-start'}`,
        backgroundColor: `${status ? '#6A4DFF' : '#cbd5e1'}`,
        color: `${status ? '#ffffff' : '#1e293b'}`,
        borderRadius: `12px 12px ${status ? '0 12px' : '12px 0'}`,
      }}
    >
      <span>{text}</span>
      <div className='flex items-center justify-end space-x-0.5 text-xs'>
        <span>{time}</span>
        {status && <Icon name={status} size={22} color='#FFFFFF' />}
      </div>
    </div>
  );
}
