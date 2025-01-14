import styled, { css } from "styled-components";
import {theme} from "../theme";

type ButtonProps = {
    $isActive: boolean;
};

const ButtonCSS = (props: ButtonProps) => css`
    font-weight: 700;
    font-size: 18px;
    color: ${props.$isActive ? '#FAFAFA' : '#B7B7B7'};
    border-radius: 12px;
    background-color: ${props.$isActive ? theme.colors.primary : '#F7F7F7'};
    padding: 18px 0;
`;

const Button = styled.button<ButtonProps>`
    ${(props) => ButtonCSS(props)}
`;

export default Button;