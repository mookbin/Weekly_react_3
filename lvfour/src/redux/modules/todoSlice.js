import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from ".";

// 서버로부터 특정 todo 항목을  가져오는 함수
export const __getTodoThunk = createAsyncThunk(
  // 첫번째 인자 : action value
  "GET_TODO",
  // 두번째 인자 : 콜백함수
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(`${serverUrl}/todos/${arg}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 업데이트
export const __updateTodoThunk = createAsyncThunk(
  "UPDATE_TODO",
  async (arg, thunkAPI) => {
    try {
      axios.patch(`${serverUrl}/todos/${arg.id}`, arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  todo: {
    id: 0,
    body: "",
    username: "",
    title: "",
  },
  error: null,
  isLoading: false,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // 선택된 state.todo 취소하고 초기화
    clearTodo: (state) => {
      state.todo = {
        id: 0,
        body: "",
        username: "",
        title: "",
      };
    },
  },
  extraReducers: {
    [__getTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__getTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodoThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__updateTodoThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearTodo } = todoSlice.actions;
export default todoSlice.reducer;
