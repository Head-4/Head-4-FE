import {Link} from "react-router-dom";
import styled from "styled-components";
import {FlexCss, HeaderH1} from "../Header.styled";
import {ReactComponent as BellIcon} from "../../../assets/Layout/Header/BellIcon.svg";
import {ReactComponent as MenuIcon} from "../../../assets/Layout/Header/MenuIcon.svg";
import {ReactComponent as SearchIcon} from "../../../assets/Layout/Header/SearchIcon.svg";
import Row from "../../../styles/Common/Row";

interface MainHeaderProps {
    toggleAside: () => void;
}

// isNew : 새로온 알림 있는지 확인 API
export default function MainHeader({toggleAside}: MainHeaderProps) {
    return (
        <>
            <HeaderH1>한양대학교 ERICA캠퍼스</HeaderH1>
            <Row $gap={12}>
                <Link to='/search'>
                    <Row>
                        <SearchIcon/>
                    </Row>
                </Link>
                <Link to='/notification'>
                    <AfterRedPoint $isNew={true}>
                        <BellIcon/>
                    </AfterRedPoint>
                </Link>
                <MenuButton onClick={toggleAside}>
                    <MenuIcon/>
                </MenuButton>
            </Row>
        </>
    );
}

const AfterRedPoint = styled.div<{ $isNew: boolean }>`
    display: flex;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 4px;
        height: 4px;
        background-color: #BD0000;
        border-radius: 50%;
        display: ${({$isNew}) => ($isNew ? 'block' : 'none')};
    }
`;

const MenuButton = styled.button`
    ${FlexCss}
`;