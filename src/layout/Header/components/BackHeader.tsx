import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {ReactComponent as BackIcon} from "../../../assets/Layout/Header/BackIcon.svg";
import {FlexCss, HeaderH1} from "../Header.styled";

interface BackHeaderProps {
    pageName: string;
}

export default function BackHeader({pageName}: BackHeaderProps) {
    const navigate = useNavigate();

    const BackClick = () => {
        navigate(-1);
    }

    return (
        <>
            <BackButton onClick={BackClick}>
                <BackIcon/>
            </BackButton>
            <HeaderH1>
                {pageName}
            </HeaderH1>
        </>
    );
}

const BackButton = styled.button`
    ${FlexCss}
`;