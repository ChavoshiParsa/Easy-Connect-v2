import { getOtherUsers } from '@/actions/users-action';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './auth-slice';

export const getInitialUsersData = createAsyncThunk(
  'users/getInitialData',
  async () => {
    try {
      const usersData = await getOtherUsers();
      return usersData || [];
    } catch (error) {
      throw error;
    }
  }
);

export type UsersState = {
  usersCredentials: AuthState['credentials'][];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  usersCredentials: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserOn(state, action: PayloadAction<string>) {
      const index = state.usersCredentials.findIndex(
        (user) => user.id === action.payload
      );
      if (index === -1) return;
      state.usersCredentials[index].isOnline = true;
      state.usersCredentials[index].lastSeen = Date.now().toString();
    },
    setUserOff(state, action: PayloadAction<string>) {
      const index = state.usersCredentials.findIndex(
        (user) => user.id === action.payload
      );
      if (index === -1) return;
      state.usersCredentials[index].isOnline = false;
      state.usersCredentials[index].lastSeen = Date.now().toString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialUsersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInitialUsersData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.usersCredentials = action.payload;
      })
      .addCase(getInitialUsersData.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const { setUserOn, setUserOff } = usersSlice.actions;

export default usersSlice.reducer;
