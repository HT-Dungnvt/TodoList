import styled from "styled-components";

export const TheButton = styled.button`
  height: 2.5rem;
  width: 8rem;

  background-color: #e2e8f0;
  border-radius: 0.25rem;
  border: none;

  &:hover {
    background-color: #e2e8f0;
    cursor: pointer;
  }

  & + & {
    margin-left: 8px;
  }
`;

export const SubmitButton = styled(TheButton)`
  background-color: blue;
`;
