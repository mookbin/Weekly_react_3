import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from ".";

// 추가
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

//삭제
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

//  서버로부터 모든 할일 목록(todolist)을 가져오기
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
    // clearTodo 리듀서는 isSuccess를 false로 변경하여, 새로운 todo가 추가되었을 때만 새로운 todo가 추가되었다는 메시지를 출력
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
      // 성공적으로 비동기 작업이 완료되었을 때 (새로운 todo 항목이 성공적으로 서버에 추가되었을 때)해당 todo 항목을 state.todos 배열에 추가하고
      //, isLoading 상태를 false로 변경,
      //isSuccess 상태를 true로 변경하는 역할
      // state.todos 배열에 새로운 todo 항목이 추가되고 이에 따라 UI를 업데이트할 수 있다.
      state.todos.push(action.payload);
    },
    [__addTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteTodoThunk.fulfilled]: (state, action) => {
      // __deleteTodoThunk action이 성공했을 때 state에 저장된 todos 배열에서 삭제 대상 todo의 index를 찾는 데 사용된다.
      //.__deleteTodoThunk action은 인자로 삭제 대상 todo의 id를 받고, 이 id를 action.payload로 전달한다.
      //이후 state.todos 배열에서 해당 id를 가진 todo를 찾기 위해 Array.findIndex() 메소드를 사용하고 이 결과값은 target에 저장된다.
      const target = state.todos.findIndex(
        (comment) => comment.id === action.payload
      );
      // state.todos 배열에서 target 인데스부터 1개 요소 삭제 => 해당하는 todo 삭제
      state.todos.splice(target, 1);
    },
    [__deleteTodoThunk.rejected]: () => {},
    [__deleteTodoThunk.pending]: () => {},
  },
});

export const { clearTodo } = todoSlice.actions;
export default todoSlice.reducer;
