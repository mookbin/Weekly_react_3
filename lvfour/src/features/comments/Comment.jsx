import { VscTrash } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../elem/Button";
import Text from "../../elem/Text";
import Input from "../../elem/Input";
import flex from "../../lib/flex";
import {
  __deleteComment,
  __updateComment,
} from "../../redux/modules/commentsSlice";
import {
  clearComment,
  globalEditModeToggle,
  __getComment,
} from "../../redux/modules/commentSlice";

// 댓글 컴포넌트
const Comment = ({ comment }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");

  const { content } = useSelector((state) => state.comment.data);
  const { isGlobalEditmode } = useSelector((state) => state.comment);

  //댓글 삭제
  const onDeleteButtonHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  // 댓글 업데이트
  const onUpdateButtonHandler = () => {
    dispatch(
      // __updateComment 액션 호출
      // 댓글의 id, 수정된 내용, 댓글을 작성한 사용자 이름, 그리고 댓글이 속한 Todo 아이디를 함께 전달
      __updateComment({
        id: comment.id,
        content: updatedComment,
        username: comment.username,
        todoId: id,
      })
    );
    //댓글 수정모드 끝내기
    setIsEdit(false);
    // 전체 수정모드 false 로 변경
    dispatch(globalEditModeToggle(false));
  };

  // 댓글 수정버튼 클릭했을 때 실행되는 함수

  const onChangeEditButtonHandler = () => {
    //isEdit 상태 true로 변경
    setIsEdit(true);
    // 댓글 데이터를 가져오기 위해 __getComment 액션 디스패치
    dispatch(__getComment(comment.id));
    //댓글 수정 버튼과 삭제 버튼이 비활성화되어 수정 중인 댓글 외에는 수정되지 않도록 방지한다.
    dispatch(globalEditModeToggle(true));
  };

  // 수정 취소 버튼클릭 시 실행
  const onCancelButtonHandler = () => {
    // 현재 상태를 수정모드에서 일반모드로 변경
    setIsEdit(false);

    // commentSlice data 초기화
    dispatch(clearComment());
    dispatch(globalEditModeToggle(false));
  };

  // 컴포넌트가 렌더링될 때마다 실행
  //함수 내부에서는 content 변수가 변화할 때마다 setUpdatedComment 함수 실행
  //렌더링될 때 최신의 값을 보여주는 역할
  useEffect(() => {
    setUpdatedComment(content);
  }, [content]);

  return (
    <StComment>
      {isEdit ? (
        <>
          <StInputWrapper>
            <Input
              type="text"
              value={updatedComment}
              maxLength={100}
              onChange={(event) => {
                setUpdatedComment(event.target.value);
              }}
            />
          </StInputWrapper>
          <StControlGroup>
            <Button
              size="small"
              bgColor="#FE531F"
              onClick={onCancelButtonHandler}
            >
              <Text color="#fff">취소</Text>
            </Button>
            <Button
              size="small"
              bgColor="#FE531F"
              onClick={onUpdateButtonHandler}
            >
              <Text color="#fff">저장</Text>
            </Button>
          </StControlGroup>
        </>
      ) : (
        <>
          <StInputWrapper>
            <Text>{comment.username}</Text>
            <Text size="16">{comment.content}</Text>
          </StInputWrapper>

          <StControlGroup>
            <Button
              size="small"
              bgColor="#FE531F"
              disabled={isGlobalEditmode}
              onClick={onChangeEditButtonHandler}
            >
              <VscEdit size="16" color="#fff" />
            </Button>
            <Button
              size="small"
              bgColor="#FE531F"
              onClick={onDeleteButtonHandler}
              disabled={isGlobalEditmode}
            >
              <VscTrash size="16" color="#fff" />
            </Button>
          </StControlGroup>
        </>
      )}
    </StComment>
  );
};

export default Comment;

const StComment = styled.div`
  ${flex({
    jusify: "space-between",
  })}
  border-bottom: 1px solid #eee;
  height: 70px;
  padding: 0 12px;
`;

const StControlGroup = styled.div`
  ${flex({})}
  flex-shrink: 0;
  gap: 3px;
`;

const StInputWrapper = styled.div`
  width: 70%;
`;
