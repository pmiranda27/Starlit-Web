import styled from "styled-components";

export const NotificacaoTab = styled.div`
  width: 250px;
  height: 350px;

  background-color: rgba(0, 0, 0, 0.8);

  display: ${(props) => (props.$isShowingNotificationsTab ? `grid` : `none`)};
  grid-template-rows: ${(props) => (props.$isShowingNotificationsTab ? `1fr` : `0fr`)};

  padding: 12px;

  backdrop-filter: blur(30px);

  position: absolute;
  top: -5%;
  right: 4%;
  z-index: 1;

  transition: 400ms ease-in-out;
`;
