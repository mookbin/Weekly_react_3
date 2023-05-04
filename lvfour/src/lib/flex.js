import { css } from "styled-components";

//라이브러리의 css 메소드를 이용하여 flexbox 레이아웃을 만들어주는 유틸리티 함수
const flex = ({ jusify = "center", align = "center", direction = "row" }) => {
  return css`
    display: flex;
    //세로축 정렬
    align-items: ${align};
    // 가로축 정렬
    justify-content: ${jusify};
    //요소들이 배치되는 방향
    flex-direction: ${direction};
  `;
};

export default flex;
