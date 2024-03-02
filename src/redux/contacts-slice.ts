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

type lastMessage = {
  id: string;
  lastMessage: {
    text: string;
    time: string;
    status?: 'sent' | 'seen' | 'pending';
  };
};

const initialState: chatData = {
  chats: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContactUserOn(state, action: PayloadAction<string>) {
      const index = state.chats.findIndex((user) => user.id === action.payload);
      if (index === -1) return;
      state.chats[index].isOnline = true;
    },
    setContactUserOff(state, action: PayloadAction<string>) {
      const index = state.chats.findIndex((user) => user.id === action.payload);
      if (index === -1) return;
      state.chats[index].isOnline = false;
    },
    addContact(state, action: PayloadAction<ChatItemType>) {
      state.chats.push(action.payload);
    },
    updateLastMessage(state, action: PayloadAction<lastMessage>) {
      const index = state.chats.findIndex(
        (user) => user.id == action.payload.id
      );
      state.chats[index].lastMessage = action.payload.lastMessage;
    },
  },
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

export const {
  setContactUserOn,
  setContactUserOff,
  addContact,
  updateLastMessage,
} = authSlice.actions;

export default authSlice.reducer;
