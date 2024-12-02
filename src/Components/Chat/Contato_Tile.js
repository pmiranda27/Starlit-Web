import styled from "styled-components";

export const ContatoTileChat = styled.div`
    width: 85%;
    height: 7vh;

    position: relative;
    z-index: 1;

    overflow: hidden;

    padding: 8px 12px 8px 12px;
    margin-bottom: 12px;

    background-color: rgba(0, 0, 0, .45);

    border: transparent;
    border-radius: 15px;

    gap: 12px;

    display: flex;
    align-items: center;

    color: white;

    cursor: pointer;

    user-select: none;

    &:hover {
        background-color: rgba(0, 0, 0, .65);
    }
    &:active {
        cursor: default;
    }

    > img {
        height: 100%;

        border-radius: 50%;

        aspect-ratio: 1;
    }
`;