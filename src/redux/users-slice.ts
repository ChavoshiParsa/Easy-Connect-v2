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
  loading: true,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
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

export const {} = usersSlice.actions;

export default usersSlice.reducer;
