import React from "react";
import styled from "styled-components";
import flex from "../../lib/flex";
import { HiArrowCircleRight } from "react-icons/hi";
import Text from "../../elem/Text";

const HomeBox = ({ title, onClick }) => {
  return (
    <StContainer onClick={onClick}>
      <Text size="24">{title}</Text>
      <HiArrowCircleRight size="32" color="#FE531F"></HiArrowCircleRight>
    </StContainer>
  );
};

export default HomeBox;

const StContainer = styled.div`
  ${flex({
    jusify: "space-between",
  })}
  padding: 0 20px;
  width: 100%;
  height: 120px;
  border: 1px solid #eee;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 1px;
  }
`;
