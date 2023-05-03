import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isDev, serverUrl } from ".";

export const __addTodoThunk = createAsyncThunk(
  "ADD_TODO",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(`${serverUrl}/todos`, arg);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __deleteTodoThunk = createAsyncThunk(
  "DELETE_TODO",
  async (arg, thunkAPI) => {
    try {
      axios.delete(`${serverUrl}/todos/${arg}`);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __getTodosThunk = createAsyncThunk(
  "GET_TODOS",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${serverUrl}/todos`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

const initialState = {
  todos: [],
  error: null,
  isLoading: false,
  isSuccess: false,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodo: (state, action) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [__getTodosThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodosThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodosThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__addTodoThunk.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addTodoThunk.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.todos.push(action.payload);
    },
    [__addTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteTodoThunk.fulfilled]: (state, action) => {
      const target = state.todos.findIndex(
        (comment) => comment.id === action.payload
      );

      state.todos.splice(target, 1);
    },
    [__deleteTodoThunk.rejected]: () => {},
    [__deleteTodoThunk.pending]: () => {},
  },
});

export const { clearTodo } = todoSlice.actions;
export default todoSlice.reducer;
