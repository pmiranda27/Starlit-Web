import styled from "styled-components";

export const ProfileMenuItems = styled.div`
  font-size: 1.5rem;
  font-weight: ${(props) => (props.$isItemSelected ? `bolder` : `normal`)};

  cursor: pointer;

  text-decoration: none;
  list-style: none;

  color: ${(props) =>
    props.$isItemSelected
      ? `rgba(255, 255, 255, 1)`
      : `rgba(255, 255, 255, 0.6);`};

  transition: 500ms;
`;
