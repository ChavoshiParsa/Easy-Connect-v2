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
  reducers: {
    setUserOn(state, action: PayloadAction<string>) {
      const index = state.usersCredentials.findIndex(
        (user) => user.id === action.payload
      );
      state.usersCredentials[index].isOnline = true;
    },
    setUserOff(state, action: PayloadAction<string>) {
      const index = state.usersCredentials.findIndex(
        (user) => user.id === action.payload
      );
      state.usersCredentials[index].isOnline = false;
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

export const startAutoRefresh = () => (dispatch: any) => {
  const fetchUsersData = () => {
    dispatch(getInitialUsersData());
    setTimeout(fetchUsersData, 2000);
  };
  fetchUsersData();
};
