import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getCommnetsByTodoId } from "../../redux/modules/commentsSlice";
import Text from "../../elem/Text";
import flex from "../../lib/flex";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";

//Todolist에 대한 댓글 목록을 보여주는 컴포넌트
const Comments = () => {
  // useParams를 사용하여 현재 URL에서 추출한 Todo ID를 가져온다
  const { id } = useParams();
  const dispatch = useDispatch();
  //isShow는 댓글 창이 열려있는지 여부를 나타내는 변수
  const [isShow, setisShow] = useState(false);

  //댓글 목록을 Redux store에서 가져온다.
  const { data } = useSelector((state) => state.comments.commentsByTodoId);

  //댓글 목록이 표시되어야 할 경우 __getCommnetsByTodoId 액션을 디스패치.
  useEffect(() => {
    // Redux store에서 해당 Todo ID에 대한 댓글 목록을 가져온다.
    if (isShow) {
      dispatch(__getCommnetsByTodoId(id));
    }
  }, [dispatch, id, isShow]);

  return (
    <StContainer isShow={isShow}>
      <StToggleContainer
        onClick={() => {
          setisShow((pre) => !pre);
        }}
      >
        <Text size="16">
          {isShow ? "눌러서 댓글내리기" : "눌러서 댓글보기"}
        </Text>
      </StToggleContainer>
      <AddCommentForm />
      <StCommentList>
        {data?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </StCommentList>
    </StContainer>
  );
};

export default Comments;

const StContainer = styled.div`
  height: ${({ isShow }) => (isShow ? "400px" : "50px")};
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #fff;
  transition: height 400ms ease-in-out;
`;

const StToggleContainer = styled.div`
  ${flex({
    jusify: "space-between",
  })};
  height: 50px;
  padding: 0 12px;
  border-top: 1px solid #eee;
`;

const StCommentList = styled.div`
  height: 350px;
  overflow: scroll;
`;
