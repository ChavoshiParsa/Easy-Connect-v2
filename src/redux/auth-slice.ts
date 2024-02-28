import { getLoggedUser } from '@/actions/users-action';
import { Theme } from '@prisma/client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getInitialAuthData = createAsyncThunk(
  'auth/getInitialData',
  async () => {
    try {
      return await getLoggedUser();
    } catch (error) {
      throw error;
    }
  }
);

export type AuthState = {
  credentials: {
    id: string;
    firstName: string;
    lastName: string;
    profileUrl: string;
    biography: string;
    username: string;
    email: string;
    isOnline: boolean;
    unreadMessages: number;
    theme: Theme;
  };
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  credentials: {
    id: '',
    firstName: '',
    lastName: '',
    profileUrl: '',
    biography: '',
    username: '',
    email: '',
    isOnline: false,
    unreadMessages: 0,
    theme: 'red',
  },
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearCredentials(state) {
      state.credentials.id = '';
      state.credentials.firstName = '';
      state.credentials.lastName = '';
      state.credentials.profileUrl = '';
      state.credentials.biography = '';
      state.credentials.username = '';
      state.credentials.email = '';
      state.credentials.isOnline = false;
      state.credentials.unreadMessages = 0;
      state.credentials.theme = 'red';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialAuthData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInitialAuthData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.credentials.id = action.payload.id;
          state.credentials.firstName = action.payload.firstName;
          state.credentials.lastName = action.payload.lastName;
          state.credentials.profileUrl = action.payload.profileUrl;
          state.credentials.biography = action.payload.biography;
          state.credentials.username = action.payload.username;
          state.credentials.email = action.payload.email;
          state.credentials.isOnline = action.payload.isOnline;
          state.credentials.unreadMessages = action.payload.unreadMessages;
          state.credentials.theme = action.payload.theme;
        }
      })
      .addCase(getInitialAuthData.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const { clearCredentials } = authSlice.actions;

export default authSlice.reducer;
