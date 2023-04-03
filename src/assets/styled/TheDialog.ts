import styled from "styled-components";

type DialogProps = {
  visible: boolean;
};
export const TheDialog = styled.div<DialogProps>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
