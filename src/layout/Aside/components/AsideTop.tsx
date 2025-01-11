import styled from "styled-components";
import {ReactComponent as CloseIcon} from "../../../assets/Aside/CloseIcon.svg";
import {ReactComponent as MiniKakaoIcon} from "../../../assets/Aside/MiniKakaoIcon.svg";

interface AsideTopProps {
    toggleAside: () => void;
}

export default function AsideTop({toggleAside}: AsideTopProps) {
    return (
        <AsideTopSection>
            <MiniKakaoIcon/>
            <AsideUserName>eunjin@naver.com</AsideUserName>
            <AsideCloseButton onClick={toggleAside}>
                <CloseIcon/>
            </AsideCloseButton>
        </AsideTopSection>
    );
}

const AsideTopSection = styled.section`
    height: 52px;
    display: flex;
    column-gap: 8px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`;

const AsideUserName = styled.span`
    color: ${({theme}) => theme.colors.mainFont};
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
`;

const AsideCloseButton = styled.button`
    display: flex;
`;