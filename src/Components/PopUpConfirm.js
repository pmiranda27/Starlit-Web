import styled from "styled-components";

export const PopUpConfirm = styled.div`
  position: absolute;

  padding: 12px;

  z-index: 4;

  bottom: ${(props) => (props.$isShowingMessage ? `9vh` : `-25vh`)};

  border-radius: 15px;
  box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.4);

  color: white;
  text-align: center;

  @media (max-width: 360px) {
    width: 50vw;
  }

  background-color: ${(props) =>
    props.$isGreen ? `rgba(0, 255, 0, .5)` : `red`};

  transition: 0.8s;
`;

export const FriendRequestPopUp = styled.div`
  width: 165px;
  height: 20px;
  position: absolute;

  padding: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 4;

  top: -1.5vh;
  right: ${(props) => (props.$isShowingMessage ? `0vw` : `-25vw`)};

  border-radius: 15px;
  box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.4);

  color: white;
  text-align: center;

  @media (max-width: 360px) {
    width: 35vw;
  }

  background-color: rgba(255, 165, 0, 0.35);

  transition: 0.8s;
`;
