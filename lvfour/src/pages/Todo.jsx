import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import {
  clearTodo,
  __getTodoThunk,
  __updateTodoThunk,
} from "../redux/modules/todoSlice";
import Button from "../elem/Button";
import Text from "../elem/Text";
import flex from "../lib/flex";
import Comments from "../features/comments/Comments";

//Todo 항목 보여주는 페이지
const Todo = () => {
  const dispatch = useDispatch();
  //동적으로 변경되는 URL 매개변수를 추출
  // //todos/:id" 경로로 접근할 수 있으므로 useParams를 사용하여 id를 추출
  const { id } = useParams();
  const navigate = useNavigate();

  // 수정 모드 활성화를 위함
  const [isEditMode, setIsEditMode] = useState(false);
  // 업데이트된 내용 저장하기 위함
  const [updatedTodo, setUpdatedTodo] = useState("");
  const todo = useSelector((state) => state.todo.todo);

  useEffect(() => {
    //__getTodoThunk는 API를 통해 Todo 항목을 가져오는 작업을 수행
    dispatch(__getTodoThunk(id));
    //clearTodo는 이전에 선택된 Todo를 지워준다
    return () => dispatch(clearTodo());
  }, [dispatch, id]);

  useEffect(() => {
    setUpdatedTodo(todo.body);
  }, [todo]);

  const onSaveButtonHandler = () => {
    if (updatedTodo.trim() === "") {
      return alert("입력된 내용이 없습니다.");
    }
    dispatch(
      // __updateTodoThunk는 API를 통해 Todo의 내용을 업데이트하는 작업을 수행
      __updateTodoThunk({
        ...todo,
        body: updatedTodo,
      })
    );
    setIsEditMode(false);
  };

  return (
    <>
      <Layout
        bgColor="
    #fff"
      >
        {!isEditMode && (
          <StTodoHeader>
            <Text size="24">id: ({todo?.id})</Text>
            <Text
              size="24"
              onClick={() => {
                navigate("/works");
              }}
            >
              이전으로
            </Text>
          </StTodoHeader>
        )}

        <Text size="32" fw="700">
          {todo?.title}
        </Text>
        <StBody>
          {isEditMode ? (
            <>
              <Textarea
                name="body"
                rows="10"
                maxLength={200}
                value={updatedTodo}
                onChange={(event) => {
                  setUpdatedTodo(event.target.value);
                }}
              />
            </>
          ) : (
            <Text size="18">{todo?.body}</Text>
          )}

          {/* 수정 버튼이 클릭되면 isEditMode를 true로 설정하고, 저장 버튼이 클릭되면 updatedTodo의 내용을 업데이트 하고 __updateTodoThunk를 dispatch한다 */}
          <StButtonGroup>
            {isEditMode ? (
              <Button size="large" onClick={onSaveButtonHandler}>
                저장
              </Button>
            ) : (
              <Button
                size="large"
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                수정
              </Button>
            )}
          </StButtonGroup>
        </StBody>
        {/* 수정모드가 아닐 때만 댓글을 달 수 있는 Comments 컴포넌트 출력 */}
        {!isEditMode && <Comments />}
      </Layout>
    </>
  );
};

export default Todo;

const StTodoHeader = styled.div`
  ${flex({
    jusify: "space-between",
  })}
  div:nth-child(2) {
    text-decoration: underline;
    color: teal;
    cursor: pointer;
  }
  margin-bottom: 32px;
`;

const StBody = styled.div`
  ${flex({
    direction: "column",
    jusify: "space-between",
  })}
  margin-top: 50px;
  min-height: 550px;
  div {
    line-height: 1.5;
  }
`;

const StButtonGroup = styled.div`
  width: 100%;
  ${flex({})}
  gap: 12px;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
`;
