import styled from "styled-components";

export const ModalLogoutConfirm = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: -9vh;
  left: -11vw;

  z-index: 5;

  display: ${(props) => (props.$isShowingModal ? `flex` : `none`)};

  justify-content: center;
  align-items: center;

  text-align: center;

  background-color: rgba(0, 0, 0, .7);

  transition: 0.8s;
`;
