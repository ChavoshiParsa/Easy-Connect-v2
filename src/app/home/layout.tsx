import { ContextCredential } from '@/redux/providers/ContextCredential';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Easy Connect',
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ContextCredential>{children}</ContextCredential>;
}
