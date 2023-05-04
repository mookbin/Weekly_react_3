import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from ".";

//async action인 __getComment를 정의한다.
export const __getComment = createAsyncThunk(
  "GET_COMMENT",
  async (arg, thunkAPI) => {
    try {
      //서버에서 axios를 사용하여 비동기적으로 comments를 가져온다.
      const { data } = await axios.get(`${serverUrl}/comments/${arg}`);
      // Redux toolkit에서 제공하는 fulfillWithValue와 rejectWithValue 함수를 사용하여
      //액션에 대한 결과값과 에러를 처리.
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 초기상태
const initialState = {
  data: {
    content: "",
    username: "",
    id: 0,
    todoId: 0,
  },
  isLoading: false,
  error: null,
  isGlobalEditmode: false,
};

//comment라는 slice생성
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearComment: (state) => {
      state.data.content = "";
    },

    //이 slice는 globalEditModeToggle reducer를 포함하고있다. 이 reducer는 전달받은 payload 값에 따라 isGlobalEditmode 값을 변경한다.
    globalEditModeToggle: (state, action) => {
      state.isGlobalEditmode = action.payload;
    },
  },
  // extraReducers를 사용하여 __getComment 액션의 세 가지 상태(pending, fulfilled, rejected)를 처리하도록 설정한다. 이렇게 처리하면, __getComment 액션을 따로 핸들링하는 reducer를 만들지 않아도 된다. 해당 상태에 맞는 함수를 정의해두면 Redux toolkit이 알아서 처리해준다.
  extraReducers: {
    [__getComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearComment, globalEditModeToggle } = commentSlice.actions;
export default commentSlice.reducer;
