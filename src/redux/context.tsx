'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from './store';
import { setIsDark, setIsMenuOpen, setNotification } from './ui-slice';

let firstTime = true;

export const ContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useAppSelector((state) => state.uiReducer.isDark);
  const isMenuOpen = useAppSelector((state) => state.uiReducer.isMenuOpen);
  const notification = useAppSelector((state) => state.uiReducer.notification);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [notification, dispatch]);

  useEffect(() => {
    if (firstTime) {
      dispatch(setIsDark(localStorage.theme === 'dark'));
      firstTime = false;
    }

    if (isDark) {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, dispatch]);

  function handleResize() {
    if (window.innerWidth > 1024) dispatch(setIsMenuOpen(false));
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    handleResize();
  }, []);

  return <>{children}</>;
};
