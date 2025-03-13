import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [
    {
      id: 1,
      sender: 'system',
      content: 'Quiz Started',
      timestamp: new Date().toISOString(),
    },
  ],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.messages.push({
        id: state.messages.length + 1,
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    clearChat: (state) => {
      state.messages = initialState.messages
    },
  },
});

export const { setMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;