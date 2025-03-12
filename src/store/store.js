import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slices/quizSlice";
import chatReducer from "./slices/chatSlice";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    chat: chatReducer,
  },
});

export default store;
