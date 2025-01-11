import styled, {css} from "styled-components";

const FlexCss = css`
    display: flex;
`;

const HeaderH1 = styled.h1`
    flex: 1;
    color: ${({theme}) => theme.colors.mainFont};
    font-size: 20px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export {HeaderH1, FlexCss}