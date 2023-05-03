import React, { useState } from "react";
import styled from "styled-components";
import { MdFileUpload } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";

const Drawer = ({ children }) => {
  const [isUp, setIsUp] = useState(false);
  return (
    <StDrawer isUp={isUp}>
      <StHeader>
        <div
          onClick={() => {
            setIsUp((pre) => !pre);
          }}
        >
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
  transform: ${({ isUp }) => `translateY(${isUp ? 0 : 600}px)`};
  transition: transform 300ms ease-in-out;
`;

const StHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 17px;
`;
