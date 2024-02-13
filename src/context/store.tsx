'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type ContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
};

const Context = createContext<ContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  isDark: false,
  setIsDark: () => {},
});

let firstTime = true;

export const ContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (firstTime) {
      setIsDark(localStorage.theme === 'dark');
      firstTime = false;
    }

    if (isDark) {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, setIsDark]);

  function handleResize() {
    if (window.innerWidth > 1024) setIsMenuOpen(false);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <Context.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextProvider = () => useContext(Context);
