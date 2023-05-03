import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../../components/Card";
import Stack from "../../elem/Stack";
import Text from "../../elem/Text";
import { __getTodosThunk } from "../../redux/modules/todosSlice";

const TodosList = () => {
  const dispatch = useDispatch();
  const { todos, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(__getTodosThunk());
  }, [dispatch]);

  if (todos.length === 0)
    return (
      <Stack>
        <Text size="18">할일이 없네요!</Text>
      </Stack>
    );

  if (error) return <div>알수 없는 에러가 발생했습니다.</div>;
  return (
    <StContainer>
      {todos.map((todo) => (
        <Card key={todo.id} todo={todo} />
      ))}
    </StContainer>
  );
};

export default TodosList;

const StContainer = styled.div``;
