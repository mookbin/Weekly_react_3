import React from "react";
import styled from "styled-components";
import { HiHome } from "react-icons/hi";

import flex from "../lib/flex";
import { useNavigate } from "react-router-dom";

// 헤더 바 표시
// 모두의 투두리스트 제목 표시 및 홈 아이콘 표시
//홈 아이콘 클릭시 홈('/'경로)으로 이동
const Header = () => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <HiHome
        size="24"
        onClick={() => {
          navigate("/");
        }}
      />
      <StTitle>모두의 투두리스트</StTitle>
    </StContainer>
  );
};

export default Header;

const StContainer = styled.header`
  // 헤더 바 가로로 배치
  ${flex({
    jusify: "space-between",
  })}
  height: 45px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 0 12px;
`;

const StTitle = styled.div`
  font-size: 24px;
`;
