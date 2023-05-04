import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Input from "../../elem/Input";
import Button from "../../elem/Button";
import flex from "../../lib/flex";
import { __addComment } from "../../redux/modules/commentsSlice";

//댓글 추가에 사용되는 컴포넌트
const AddCommentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [comment, setComment] = useState({
    username: "",
    content: "",
  });

  const onAddCommentButtonHandler = (event) => {
    event.preventDefault();

    //alert 띄우기
    if (comment.content.trim() === "" || comment.username.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    // 입력 내용 유효한지 확인 후 --addComment 액션을 디스패치
    dispatch(__addComment({ todoId: id, ...comment }));

    console.log(dispatch({ todoId: id, ...comment }));
    setComment({
      username: "",
      content: "",
    });
  };

  // 입력 필드 값 변경 시 setComment 호출해서 변경된 값을 comment 상태 객체에 반영
  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setComment({
      ...comment,

      // 함수에서 username 또는 content라는 속성을 따로 처리하지 않고 하나의 함수로 두 가지 속성을 모두 업데이트할 수 있다.
      //  name이 "username"이면 setComment({...comment, username: value})와 같이 객체의 username 속성을 업데이트 한다.
      //name이 "content"면  setComment({ ...comment, content: value })와 같이 content 속성을 업데이트한다.
      [name]: value,
    });
  };

  return (
    <StForm onSubmit={onAddCommentButtonHandler}>
      <StNameInput>
        <Input
          placeholder="이름 (5자 이내)"
          value={comment.username}
          type="text"
          name="username"
          onChange={onChangeInputHandler}
          maxLength={5}
        />
      </StNameInput>
      <Input
        placeholder="댓글을 추가하세요. (100자 이내)"
        value={comment.content}
        name="content"
        type="text"
        onChange={onChangeInputHandler}
        maxLength={100}
      />
      <Button type="submit" onClick={onAddCommentButtonHandler}>
        추가하기
      </Button>
    </StForm>
  );
};

export default AddCommentForm;

const StNameInput = styled.div`
  width: 150px;
`;

const StForm = styled.form`
  ${flex({})};
  gap: 12px;
  width: 100%;
  padding: 0 12px;
`;
