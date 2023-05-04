import React from "react";
import styled from "styled-components";
import flex from "../lib/flex";

//Stack 컴포넌트는 하위 컴포넌트들을 수직으로 쌓는 역할을 한다.

const Stack = ({ children, align, jusify, direction }) => {
  return (
    <StContainer align={align} jusify={jusify} direction={direction}>
      {children}
    </StContainer>
  );
};

export default Stack;

//align, jusify, direction이라는 props를 받아서 flex 속성으로 처리한다.
//이 컴포넌트를 사용하면 하위 컴포넌트들을 간단하게 수직으로 정렬할 수 있다.
const StContainer = styled.div`
  width: 100%;
  ${({ align, jusify, direction }) =>
    flex({
      align,
      jusify,
      direction,
    })}
`;
