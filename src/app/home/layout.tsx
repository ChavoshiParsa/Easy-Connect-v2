import { ContextCredential } from '@/redux/providers/ContextCredential';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ContextCredential>{children}</ContextCredential>;
}
