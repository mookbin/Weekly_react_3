import React from "react";
import styled from "styled-components";
import TodosList from "../features/todo/TodosList";
import Layout from "../components/Layout";
import Wrapper from "../elem/Wrapper";
import Text from "../elem/Text";

// 할일 목록 보여주는 TodosList 컴포넌트 렌더링
//Layout으로 감싸져있고
//Wrapper로 상단에 텍스트 표시
const Todos = () => {
  return (
    <Layout>
      <Wrapper mg="24px 0">
        <Text size="32">내 할일</Text>
      </Wrapper>

      {/* 할일 목록을 감싸며 높이를 계산해서 화면 전체 높이에서 헤더와 푸터 높이를 뺀값과 같게 설정하고 있음  */}
      <StContainer>
        <TodosList />
      </StContainer>
    </Layout>
  );
};

export default Todos;

const StContainer = styled.div`
  height: calc(100% - 45px - 48px);
`;
