import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todosSlice";
import comments from "../modules/commentsSlice";
import comment from "../modules/commentSlice";
import todo from "../modules/todoSlice";
// import { isDev } from "../modules";

const store = configureStore({
  reducer: {
    todos,
    comments,
    comment,
    todo,
  },
});

export default store;
