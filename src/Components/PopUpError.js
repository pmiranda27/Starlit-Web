import styled from "styled-components";

export const PopUpError = styled.div`
  position: absolute;

  padding: 12px;

  z-index: 4;

  top: ${(props) => (props.$isShowingMessage ? `3vh` : `-25vh`)};

  border-radius: 15px;
  box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.4);

  color: white;
  text-align: center;

  user-select: none;

  width: fit-content;

  text-wrap: wrap;

  @media (max-width: 360px) {
    width: 50vw;
  }

  background-color: red;

  transition: 0.8s;
`;