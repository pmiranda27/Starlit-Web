import styled from "styled-components";

export const SendProfilePicturePanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px;

  position: absolute;

  border-radius: 40px;

  left: 50%;
  top: ${(props) => (props.$isShowingProfilePicturePanel ? `50%` : `250%`)};

  transform: translate(-50%, -50%);

  z-index: 2;

  width: 380px;
  height: 380px;

  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: saturate(180%) blur(10px);

  box-shadow: 0 4px 9px 4px rgba(0, 0, 0, 0.35);

  transition: 750ms;
`;
