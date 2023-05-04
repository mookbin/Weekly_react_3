import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Layout = ({ children, bgColor = "#fff" }) => {
  return (
    <>
      <Header />
      <StLayout bgColor={bgColor}>{children}</StLayout>
    </>
  );
};

export default Layout;

const StLayout = styled.div`
  //브라우저 높이에서 헤더 바 높이 뺀 값으로 설정
  height: calc(100vh - 45px);
  //'bgcolor' prop으로 배경색 지정가능
  background-color: ${({ bgColor }) => {
    return bgColor;
  }};
  //좌우여백 24px
  padding: 24px;
`;
