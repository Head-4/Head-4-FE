import React from 'react';
import styled from "styled-components";
import {ReactComponent as BellIcon} from "../assets/Layout/Header/BellIcon.svg";
import {ReactComponent as MenuIcon} from "../assets/Layout/Header/MenuIcon.svg";
import {ReactComponent as SearchIcon} from "../assets/Layout/Header/SearchIcon.svg";
import {ReactComponent as BackIcon} from "../assets/Layout/Header/BackIcon.svg";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    pageRoute: string;
}

export default function Header({pageRoute}: HeaderProps) {
    const navigate = useNavigate();

    const BackClick = () => {
        navigate(-1);
    }

    const noHeaderList = [
        "/login",
        "/register/complete",
    ];

    if (noHeaderList.includes(pageRoute)) return null;
    return (
        <HeaderWrapper>
            {pageRoute === '/' ?
                <>
                    <HeaderH1>한양대학교 ERICA캠퍼스</HeaderH1>
                    <HeaderRight>
                        <SearchIcon/>
                        <BellIcon/>
                        <MenuIcon/>
                    </HeaderRight>
                </>
                :
                <>
                    <BackButton onClick={BackClick}>
                        <BackIcon/>
                    </BackButton>
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