'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { ReactNode } from 'react';
import { ContextProvider } from './context';

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ContextProvider>{children}</ContextProvider>
    </ReduxProvider>
  );
};
