import styled from "styled-components";

const InputInvalidError = styled.p`
  font-size: clamp(0.75rem, 1.25rem, x-large);
  font-weight: bold;

  width: 95%;
  height: fit-content;

  z-index: -1;
  background-color: darkred;

  padding: 0 4px;
  padding-top: 20px;

  visibility: ${(props) => (props.$isVisible ? `visible` : `hidden`)};

  position: absolute;
  margin-left: auto;
  margin-right: auto;

  left: 0;
  right: 0;
  text-align: center;

  top: 45%;
  @media (max-width: 600px){
    padding-top: 24px
    top: 25%;
  }

  border-radius: 0 0 15px 15px;

  margin-top: 8px;
  margin-bottom: 16px;

  color: red;
`;

export default InputInvalidError;
