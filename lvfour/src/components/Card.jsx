import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { VscTrash } from "react-icons/vsc";
import { __deleteTodoThunk } from "../redux/modules/todosSlice";
import Button from "../elem/Button";
import Stack from "../elem/Stack";
import Text from "../elem/Text";
import Wrapper from "../elem/Wrapper";

const Card = ({ todo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteHandler = () => {
    dispatch(__deleteTodoThunk(todo.id));
  };

  return (
    <StCard
      onClick={() => {
        navigate(`/works/${todo.id}`);
      }}
    >
      <Stack jusify="space-between">
        <Text size="20">{todo.title}</Text>
        <Button
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            const result = window.confirm("이 할일을 지울까요?");
            if (result) {
              return onDeleteHandler();
            } else {
              return;
            }
          }}
        >
          <VscTrash color="#FE531F" />
        </Button>
      </Stack>
      <Wrapper mg="10px 0">
        <Stack jusify="space-between">작성자 : {todo.username}</Stack>
      </Wrapper>
    </StCard>
  );
};

export default Card;

const StCard = styled.div`
  padding: 12px;
  height: 90px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 12px;
`;
