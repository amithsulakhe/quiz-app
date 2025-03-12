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
      const { sender, content, type,qid } = action.payload;
      state.messages.push({
        id: state.messages.length + 1,
        sender,
        content,
        type,
        qid,
        timestamp: new Date().toISOString(),
      });
    },
    clearChat: (state) => {
      state.messages = [
        {
          id: 1,
          sender: 'system',
          content: 'Quiz Started',
          timestamp: new Date().toISOString(),
        },
      ];
    },
  },
});

export const { setMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;