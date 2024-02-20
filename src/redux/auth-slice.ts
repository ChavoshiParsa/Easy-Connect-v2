import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  id: string;
  firstName: string;
  lastName: string;
  profileUrl: string;
  biography: string;
  username: string;
  email: string;
};

const initialState: AuthState = {
  id: '',
  firstName: '',
  lastName: '',
  profileUrl: '',
  biography: '',
  username: '',
  email: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthState>) {
      return { ...state, ...action.payload };
    },
    clearCredentials(state) {
      state.id = '';
      state.firstName = '';
      state.lastName = '';
      state.profileUrl = '';
      state.biography = '';
      state.username = '';
      state.email = '';
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
