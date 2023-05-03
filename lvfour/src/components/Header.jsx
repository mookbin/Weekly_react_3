import React from "react";
import styled from "styled-components";
import { HiHome } from "react-icons/hi";

import flex from "../lib/flex";
import { useNavigate } from "react-router-dom";

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
