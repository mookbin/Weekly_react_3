import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todosSlice";

const store = configureStore({
  reducers: {
    todos,
  },
});
export default store;
