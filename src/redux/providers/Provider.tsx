'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';
import { ReactNode } from 'react';
import { ContextUI } from './ContextUI';

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ContextUI>{children}</ContextUI>
    </ReduxProvider>
  );
};
