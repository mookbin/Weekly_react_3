import React from "react";
import styled from "styled-components";

const Input = (props) => {
  //required: 해당 input에 값을 반드시 입력하도록 강제한다.
  //minLength: 해당 input에 입력할 수 있는 최소 길이를 정한다.
  //사용자가 값을 입력하지 않거나 입력한 값이 최소 길이보다 작으면 폼의 유효성 검사에서 실패하게 된다.
  return <StInput {...props} required={true} minLength={3} />;
};

export default Input;

const StInput = styled.input`
  box-sizing: border-box;
  height: 46px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #eee;
`;
