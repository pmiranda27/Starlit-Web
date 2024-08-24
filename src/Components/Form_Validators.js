import styled from "styled-components";

const InputInvalidError = styled.p`
  font-size: large;
  font-weight: bold;

  width: 98%;
  height: 60%;

  z-index: -1;
  background-color: darkred;

  padding: 0 4px;
  padding-top: 10px;

  visibility: ${(props) => (props.$isVisible ? `visible` : `hidden`)};

  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;

  top: 70%;

  border-radius: 0 0 15px 15px;

  margin-top: 8px;
  margin-bottom: 16px;

  color: red;
`;

export default InputInvalidError;
