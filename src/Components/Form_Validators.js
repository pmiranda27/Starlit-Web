import styled from "styled-components";

const InputInvalidError = styled.p`
  font-size: clamp(0.75rem, 1.25rem, x-large);
  font-weight: bold;

  @media (max-width: 380px) {
    font-size: 0.85rem;
    font-weight: bolder;
  }

  width: 90%;
  height: fit-content;

  z-index: -1;
  background-color: darkred;

  padding: 0 4px;
  padding-top: 20px;

  visibility: ${(props) => (props.$isVisible ? `visible` : `hidden`)};

  position: absolute;
  margin-left: auto;
  margin-right: auto;

  left: 50%;
  transform: translateX(-50%);
  text-align: center;

  top: 45%;
  @media (max-width: 600px) {
    padding-top: ${(props) => (props.$isLoginInput ? `24px` : `16px`)};
    top: ${(props) => (props.$isPassword ? `35%` : `32%`)};
  }
  @media (max-width: 400px) {
    top: ${(props) => (props.$isPassword ? `26%` : `32%`)};
  }
  @media (max-width: 300px) {
    top: 24%;
  }

  border-radius: 0 0 15px 15px;

  margin-top: 8px;
  margin-bottom: ${(props) => (props.$isPassword ? `32px` : `16px`)};

  color: red;

`;

export default InputInvalidError;
