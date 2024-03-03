import { openNewMessages } from '@/actions/contact-action';
import ChatScreen from '@/components/home/chat-screen/ChatScreen';

export default async function ChatPage({
  params,
}: {
  params: { contact: string };
}) {
  openNewMessages(params.contact);
  return <ChatScreen />;
}
