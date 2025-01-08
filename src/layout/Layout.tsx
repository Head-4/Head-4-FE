import React, {useState} from 'react';
import styled from "styled-components";
import {media} from "../styles/media";
import {Outlet, useLocation} from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    const location = useLocation();

    const pageRoute = location.pathname;

    return (
        <LayoutWrapper $pageRoute={pageRoute}>
            <Header pageRoute={pageRoute}/>
            <LayoutMain>
                <Outlet/>
            </LayoutMain>
        </LayoutWrapper>
    );
};

const LayoutWrapper = styled.div<{ $pageRoute: string }>`
    min-height: 100vh;
    padding: 76px 20px 86px;
    background-color: ${({ $pageRoute }) => ($pageRoute === "/login" ? ({theme}) => theme.colors.primary : "transparent")};

    ${media.medium`
    `}
`;

const LayoutMain = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 76px - 86px);
`;