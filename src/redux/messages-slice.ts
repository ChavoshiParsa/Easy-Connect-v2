import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import getMessages from '@/actions/message-action';
import { MessageType } from '@/components/home/chat-screen/Message';

export const getInitialMessagesData = createAsyncThunk(
  'messages/getInitialData',
  async (contactIds: string[], thunkAPI) => {
    try {
      const allMessages = await Promise.all(
        contactIds.map(async (contactId) => {
          const messages = await getMessages(contactId);
          return { contactId, messages };
        })
      );
      return allMessages;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export type UsersState = {
  messagesContact: { contactId: string; messages: MessageType[] }[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  messagesContact: [],
  loading: true,
  error: null,
};

const usersSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInitialMessagesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInitialMessagesData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.messagesContact = action.payload;
      })
      .addCase(getInitialMessagesData.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
