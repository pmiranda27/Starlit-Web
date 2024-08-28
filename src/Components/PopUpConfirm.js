import styled from "styled-components";

const PopUpConfirm = styled.div`
    position: absolute;

    padding: 12px;

    z-index: 3;

    bottom: ${(props) => (props.$isShowingMessage ? `9vh` : `-25vh`)};

    border-radius: 15px;
    box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.4);

    color: white;
    text-align: center;

    @media (max-width: 360px){
        width: 50vw;
    }

    background-color: ${(props) => (props.$isGreen ? `rgba(0, 255, 0, .5)` : `red`)};

    transition: .8s;
`;

export default PopUpConfirm;