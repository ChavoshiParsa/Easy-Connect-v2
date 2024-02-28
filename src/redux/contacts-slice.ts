import { ChatItemType } from '@/components/home/chat/ChatItem';
import { getChats } from '@/actions/contact-action';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getInitialContactsData = createAsyncThunk(
  'contacts/getInitialData',
  async () => {
    try {
      return await getChats();
    } catch (error) {
      throw error;
    }
  }
);

export type chatData = {
  chats: ChatItemType[];
  loading: boolean;
  error: string | null;
};

const initialState: chatData = {
  chats: [],
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInitialContactsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInitialContactsData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.chats = action.payload;
        }
      })
      .addCase(getInitialContactsData.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
