import React, { useState } from "react";
import styled from "styled-components";
import { MdFileUpload } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";

//화면 하단에 고정되어있는상태. 위로 슬라이드해서 보이거나 숨길 수 있음
const Drawer = ({ children }) => {
  //isUp = Drawer가 열려있느지 닫혀있는지 나타내는 값
  const [isUp, setIsUp] = useState(false);
  return (
    <StDrawer isUp={isUp}>
      <StHeader>
        <div
          onClick={() => {
            setIsUp((pre) => !pre);
          }}
        >
          {/* 아이콘 클릭시 열기 닫기 기능 사용가능 */}
          {isUp ? <MdFileDownload size="24" /> : <MdFileUpload size="24" />}
        </div>
      </StHeader>
      {children}
    </StDrawer>
  );
};

export default Drawer;

const StDrawer = styled.div`
  border: 1px solid red;
  width: 100%;
  min-height: 80%;
  height: 80%;
  background-color: #eee;
  position: absolute;
  bottom: 0;
  border-radius: 24px 24px 0 0;
  // isUp 값에 따라서 transform 속성으로 Y축으로 이동하는 애니메이션 효과 적용
  transform: ${({ isUp }) => `translateY(${isUp ? 0 : 600}px)`};
  transition: transform 300ms ease-in-out;
`;

//헤더스타일
const StHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 17px;
`;
