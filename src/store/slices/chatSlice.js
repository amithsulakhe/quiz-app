// // store/slices/chatSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   messages: [
//     {
//       id: 1,
//       sender: 'system',
//       content: 'Welcome to the quiz! Click "Start Quiz" to begin.',
//       timestamp: new Date().toISOString(),
//     },
//   ],
// };

// export const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     addMessage: (state, action) => {
//       const { sender, content, type } = action.payload;
//       state.messages.push({
//         id: state.messages.length + 1,
//         sender,
//         content,
//         type,
//         timestamp: new Date().toISOString(),
//       });
//     },
//     clearChat: (state) => {
//       state.messages = [
//         {
//           id: 1,
//           sender: 'system',
//           content: 'Welcome to the quiz! Click "Start Quiz" to begin.',
//           timestamp: new Date().toISOString(),
//         },
//       ];
//     },
//   },
// });

// export const { addMessage, clearChat } = chatSlice.actions;
// export default chatSlice.reducer;