import styled from "styled-components";

export const TheForm = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  z-index: 5;
  background-color: #fff;
  padding: 16px;
  border-radius: 5%;
  box-shadow: 0 1px 2px #ccc;
  min-width: 360px;
`;
