import React from "react";
import styled, { css } from "styled-components";
import flex from "../lib/flex";

//props를 인자로 받고 props.children을 버튼안에 렌더링

const Button = (props) => {
  return (
    //props.disabled 를 이용해서 버튼이 비활성화인지 확인
    <StButton {...props} disabled={props.disabled}>
      {props.children}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  ${flex({})};
  border: 1px solid #eee;
  background-color: #fff;
  height: 46px;
  border-radius: 8px;
  background-color: ${({ bgColor, disabled }) => (disabled ? "#ddd" : bgColor)};
  cursor: pointer;

  // 버튼 크기 조절 위해 size prop 이용
  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 100%;
        `;
      case "medium":
        return css`
          width: 80px;
        `;
      case "small":
        return css`
          width: 30px;
          height: 30px !important;
          //크기가 small이면 버튼 높이를 30px로 강제 지정
        `;
      default:
        return css`
          width: 120px;
        `;
    }
  }}
`;
