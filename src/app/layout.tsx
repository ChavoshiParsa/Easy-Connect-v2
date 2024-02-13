import type { Metadata } from 'next';
import { Varela_Round } from 'next/font/google';
import '@/styles/globals.css';
import { ContextProvider } from '@/context/store';
import NextTopLoader from 'nextjs-toploader';
import Alert from '@/components/ui/Alert';
// import Modal from '@/components/ui/Modal';

const inter = Varela_Round({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Easy Connect',
  description: 'Created by Parsa Chavoshi',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={inter.className + ' transition-colors duration-200'}>
        <ContextProvider>
          <NextTopLoader color='#6A4DFF' />
          <Alert />
          {children}
          {/* <Modal /> */}
        </ContextProvider>
      </body>
    </html>
  );
}
