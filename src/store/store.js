import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slices/quiz-slice";
import chatReducer from "./slices/chat-slice";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    chat: chatReducer,
  },
});

export default store;
