import styled from "styled-components";

const AddUsersList = styled.div`
    width: 100%;
    height: 90%;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    right: ${(props => props.$addUserListEnabled ? '0' : '-150%')};

    background-color: rgba(0, 0, 0, 0.4);

    border-radius: 20px 0 0 20px;

    z-index: 1;

    padding: 4px;

    transition: 350ms;
`;

export default AddUsersList;