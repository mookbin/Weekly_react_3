import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HomeBox from "../features/home/HomeBox";
import Layout from "../components/Layout";
import Text from "../elem/Text";
import flex from "../lib/flex";

const Home = () => {
  const nagivate = useNavigate();
  return (
    <Layout>
      <StContainer>
        <StMain>
          <Text size="32">무엇을 할까요?</Text>
          <HomeBox
            title="할일 기록하기"
            onClick={() => {
              nagivate("/work/add");
            }}
          />
          <HomeBox
            title="TODO LIST"
            onClick={() => {
              nagivate("/works");
            }}
          />
        </StMain>
      </StContainer>
    </Layout>
  );
};

export default Home;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StMain = styled.div`
  margin-top: 24px;
  ${flex({
    direction: "column",
    align: "start",
  })}
  gap: 24px;
`;
