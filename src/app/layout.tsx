import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Varela_Round } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Alert from '@/components/ui/Alert';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';
import { Provider } from '@/redux/providers/Provider';

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
        <Provider>
          <NextTopLoader color='#6A4DFF' />
          <Alert />
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
