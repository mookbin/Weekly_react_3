import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../../components/Card";
import Stack from "../../elem/Stack";
import Text from "../../elem/Text";
import { __getTodosThunk } from "../../redux/modules/todosSlice";

const TodosList = () => {
  const dispatch = useDispatch();
  // useSelector를 사용하여 상태 저장소에서 할일 목록과 에러 상태를 가져온다
  const { todos, error } = useSelector((state) => state.todos);

  useEffect(() => {
    //useEffect를 사용하여 컴포넌트가 마운트될 때 __getTodosThunk 함수를 디스패치하여 할일 목록을 가져온다.
    dispatch(__getTodosThunk());
  }, [dispatch]);

  // 할일목록 비어있을 때
  if (todos.length === 0)
    return (
      <Stack>
        <Text size="18">할일이 없네요!</Text>
      </Stack>
    );

  // 에러 있을 때
  if (error) return <div>알수 없는 에러가 발생했습니다.</div>;
  return (
    <StContainer>
      {/* 비어있지 않을 떄 -> map함수를 이용해서 각 할일에 대한 Card 컴포넌트를 생성한다 */}
      {todos.map((todo) => (
        <Card key={todo.id} todo={todo} />
      ))}
    </StContainer>
  );
};

export default TodosList;

const StContainer = styled.div``;
