import React from 'react';
import styled from "styled-components";
import BackHeader from "./components/BackHeader";
import MainHeader from "./components/MainHeader";

interface HeaderProps {
    pageRoute: string;
}

export default function Header({pageRoute}: HeaderProps) {
    const noHeaderList: string[] = [
        "/login",
        "/register/complete",
    ];

    const headerName: { [key: string]: string } = {
        "/setting/university": "학교 설정",
        "/setting/keyword": "키워드 설정",
        "/notification": "알림",
        "/faq": "건의하기",
    };

    if (noHeaderList.includes(pageRoute)) return null;
    return (
        <HeaderWrapper $pageRoute={pageRoute}>
            {pageRoute === '/' ?
                <MainHeader/>
                :
                <BackHeader pageName={headerName[pageRoute]}/>
            }
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.header<{ $pageRoute: string }>`
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
    color: ${({theme}) => theme.colors.mainFont};
    background-color: ${({$pageRoute}) => $pageRoute === '/search' ? "#FFFFFF" : 'inherit'};
    z-index: 500;

    @media (min-width: 500px) {
        transform: translateX(-50%);
        left: 50%;
        width: 500px;
    }
`;