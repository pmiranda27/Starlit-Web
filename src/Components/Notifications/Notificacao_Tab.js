import styled from "styled-components";

export const NotificacaoTab = styled.div`
  width: ${(props) => (props.$isShowingNotificationsTab ? `270px` : `0`)};
  height: ${(props) => (props.$isShowingNotificationsTab ? `350px` : `0`)};

  background-color: ${(props) => (props.$isShowingNotificationsTab ? `rgba(0, 0, 0, 0.95)` : `transparent`)};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  grid-template-rows: ${(props) => (props.$isShowingNotificationsTab ? `1fr` : `0fr`)};
  
  text-align: center;
  color: white;
  
  padding: 12px;

  border-radius: 24px;

  overflow: hidden;

  position: absolute;
  top: -5%;
  right: 4%;
  z-index: 2;

  transition: 400ms ease-in-out;

  & > h3 {
    margin-bottom: 8px;
  }
  & > div {
    width: 100%;
    height: 85%;

    position: relative;
  }
`;
