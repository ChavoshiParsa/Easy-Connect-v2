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
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessageFromContact(
      state,
      action: PayloadAction<{
        senderId: string;
        message: string;
      }>
    ) {
      const index = state.messagesContact.findIndex(
        (chat) => chat.contactId === action.payload.senderId
      );
      if (index === -1) return;
      state.messagesContact[index].messages.push({
        id: `${action.payload.message}-${new Date()}`,
        text: action.payload.message,
        time: new Date().toISOString(),
      });
    },
    addMessageFromUser(
      state,
      action: PayloadAction<{
        contactId: string;
        message: string;
      }>
    ) {
      const index = state.messagesContact.findIndex(
        (chat) => chat.contactId === action.payload.contactId
      );
      if (index === -1) return;
      state.messagesContact[index].messages.push({
        id: `${action.payload.message}-${Date.now()}`,
        text: action.payload.message,
        time: new Date().toISOString(),
        status: 'sent',
      });
    },
    getInitMessages(
      state,
      action: PayloadAction<
        {
          contactId: string;
          messages: MessageType[];
        }[]
      >
    ) {
      state.messagesContact = action.payload;
    },
  },
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

export const { addMessageFromContact, addMessageFromUser, getInitMessages } =
  usersSlice.actions;

export default usersSlice.reducer;
