import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Notification = {
  status: 'Success' | 'Error' | 'Info' | 'Warning';
  message: string;
};

type UIState = {
  isMenuOpen: boolean;
  isDark: boolean;
  notification: Notification | null;
};

const initialState: UIState = {
  isMenuOpen: false,
  isDark: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setIsMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMenuOpen = action.payload;
    },
    toggleDarkMode(state) {
      state.isDark = !state.isDark;
    },
    setIsDark(state, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
    },
    setNotification(state, action: PayloadAction<Notification | null>) {
      state.notification = action.payload;
    },
  },
});

export const {
  toggleMenu,
  setIsMenuOpen,
  toggleDarkMode,
  setIsDark,
  setNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
