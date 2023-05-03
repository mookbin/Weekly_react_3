import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../elem/Button";
import Text from "../../elem/Text";
import Wrapper from "../../elem/Wrapper";
import Input from "../../elem/Input";

import { clearTodo, __addTodoThunk } from "../../redux/modules/todosSlice";
import flex from "../../lib/flex";

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.todos.isSuccess);
  const [todo, setTodo] = useState({
    title: "",
    body: "",
    username: "",
  });

  useEffect(() => {
    if (!isSuccess) return;
    if (isSuccess) navigate("/works");

    return () => dispatch(clearTodo());
  }, [dispatch, isSuccess, navigate]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  return (
    <StContainer>
      <StForm
        onSubmit={(envet) => {
          envet.preventDefault();
          if (
            todo.body.trim() === "" ||
            todo.username.trim() === "" ||
            todo.title.trim() === ""
          ) {
            return alert("모든 항목을 입력해주세요.");
          }
          dispatch(__addTodoThunk(todo));
          setTodo({ title: "", body: "", username: "" });
        }}
      >
        <StMain>
          <Wrapper mg="10px 0">
            <Text size="24">작성자</Text>
          </Wrapper>
          <Input
            type="text"
            onChange={onChangeHandler}
            placeholder="작성자의 이름을 입력해주세요. (5자 이내)"
            value={todo.username}
            name="username"
            maxLength={5}
          />
          <Wrapper mg="10px 0">
            <Text size="24">제목</Text>
          </Wrapper>
          <Input
            type="text"
            onChange={onChangeHandler}
            placeholder="제목을 입력해주세요. (50자 이내)"
            value={todo.title}
            name="title"
            maxLength={50}
          />
          <Wrapper mg="10px 0">
            <Text size="24">내용</Text>
          </Wrapper>
          <Textarea
            name="body"
            rows="10"
            maxLength={200}
            onChange={onChangeHandler}
            placeholder="내용을 입력해주세요. (200자 이내)"
            value={todo.body}
          />
        </StMain>
        <Button size="large">추가하기</Button>
      </StForm>
    </StContainer>
  );
};

export default AddTodoForm;

const StForm = styled.form`
  width: 100%;
  height: 100%;
  ${flex({
    direction: "column",
    align: "start",
    jusify: "space-between",
  })}
`;

const StContainer = styled.div`
  height: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
`;

const StMain = styled.div`
  width: 100%;
`;
