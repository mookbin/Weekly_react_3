import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from ".";

// 모든 댓글을 가져오는 함수
export const __getCommentsThunk = createAsyncThunk(
  "GET_COMMENTS",
  // 첫번째 인자가 사용되지 않을 것임을 명시하기 위한 표시 _
  async (_, thunkAPI) => {
    try {
      // 서버로부터 모든 댓글을 가져오는 API 호출
      const { data } = await axios.get(`${serverUrl}/comments`);
      // 호출 결과 처리( 성공적인 결과 반환)
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      // 실패한 결과 반환
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 특정 Todo에 대한 댓글들을 가져오는 비동기 함수
export const __getCommnetsByTodoId = createAsyncThunk(
  "GET_COMMENT_BY_TODO_ID",

  //arg는 페이로드(todoId)
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(`${serverUrl}/comments?todoId=${arg}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// "DELETE_COMMENT" 액션 타입을 가지는 비동기 액션 생성자 함수 정의
export const __deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  // arg는 삭제할 댓글의 id 값
  async (arg, thunkAPI) => {
    try {
      await axios.delete(`${serverUrl}/comments/${arg}`);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 댓글을 업데이트 하는 함수를 만드는 코드
export const __updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      axios.patch(`${serverUrl}/comments/${arg.id}`, arg);

      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (arg, thunkAPI) => {
    try {
      //POST 요청으로 댓글을 추가한 결과로 서버에서 반환된 데이터가 data 변수에 담겨져 있다. 이 데이터는 새로 추가된 댓글의 정보가 담겨져 있음.
      const { data } = await axios.post(`${serverUrl}/comments`, arg);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  comments: {
    data: [],
    isLoading: false,
    error: null,
  },
  commentsByTodoId: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearTodo: (state) => {
      state.comments = null;
    },
  },
  extraReducers: {
    // 전체 댓글 조회
    [__getCommentsThunk.pending]: (state) => {
      console.log(state);
      state.comments.isLoading = true;
    },
    [__getCommentsThunk.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.data = action.payload;
    },
    [__getCommentsThunk.rejected]: (state, action) => {
      console.log(action);
      state.comments.isLoading = false;
      state.comments.error = action.payload;
    },

    // 댓글 조회 (todoId)
    [__getCommnetsByTodoId.pending]: (state) => {
      state.commentsByTodoId.isLoading = true;
    },
    [__getCommnetsByTodoId.fulfilled]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.data = action.payload;
    },
    [__getCommnetsByTodoId.rejected]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.error = action.payload;
    },

    // 댓글 삭제
    [__deleteComment.pending]: (state) => {
      state.commentsByTodoId.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      const target = state.commentsByTodoId.data.findIndex(
        (comment) => comment.id === action.payload
      );
      state.commentsByTodoId.data.splice(target, 1);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.error = action.payload;
    },

    // 댓글 수정
    [__updateComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateComment.fulfilled]: (state, action) => {
      const target = state.commentsByTodoId.data.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.isLoading = false;
      state.commentsByTodoId.data.splice(target, 1, action.payload);
    },
    [__updateComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 댓글 추가
    [__addComment.pending]: (state) => {
      state.commentsByTodoId.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.data.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.error = action.payload;
    },
  },
});

export default commentsSlice.reducer;
