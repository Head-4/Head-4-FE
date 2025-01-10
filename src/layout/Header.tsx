import React from 'react';
import styled from "styled-components";
import {ReactComponent as BellIcon} from "../assets/Layout/Header/BellIcon.svg";
import {ReactComponent as MenuIcon} from "../assets/Layout/Header/MenuIcon.svg";
import {ReactComponent as SearchIcon} from "../assets/Layout/Header/SearchIcon.svg";
import {ReactComponent as BackIcon} from "../assets/Layout/Header/BackIcon.svg";
import {Link, useNavigate} from "react-router-dom";

interface HeaderProps {
    pageRoute: string;
    toggleAside: () => void;
}

// isNew 조건 API 설정하기
export default function Header({pageRoute, toggleAside}: HeaderProps) {
    const navigate = useNavigate();

    const BackClick = () => {
        navigate(-1);
    }

    const noHeaderList: string[] = [
        "/login",
        "/register/complete",
    ];

    const headerName: { [key: string]: string } = {
        "/setting/university": "학교 설정",
        "/setting/keyword": "키워드 설정",
        "/notice": "알림",
        "/faq": "건의하기",
    };

    if (noHeaderList.includes(pageRoute)) return null;
    return (
        <HeaderWrapper>
            {pageRoute === '/' ?
                <>
                    <HeaderH1>한양대학교 ERICA캠퍼스</HeaderH1>
                    <HeaderRight>
                        <SearchIcon/>
                        <Link to='/notification'>
                            <AfterRedPoint $isNew={true}>
                                <BellIcon/>
                            </AfterRedPoint>
                        </Link>
                        <MenuButton onClick={toggleAside}>
                            <MenuIcon/>
                        </MenuButton>
                    </HeaderRight>
                </>
                :
                <>
                    <BackButton onClick={BackClick}>
                        <BackIcon/>
                    </BackButton>
                    <HeaderH1>{headerName[pageRoute]}</HeaderH1>
                </>
            }
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 20px;
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 14px;
    background-color: #FAFAFA;

    @media (min-width: 500px) {
        transform: translateX(-50%);
        left: 50%;
        width: 500px;
    }
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

const HeaderRight = styled.div`
    display: flex;
    column-gap: 12px;
`;

const BackButton = styled.button`
    display: flex;
`;

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
    display: flex;
`;