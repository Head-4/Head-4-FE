import React, {useState} from 'react';
import styled from "styled-components";
import {media} from "../styles/media";
import {Outlet} from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <LayoutWrapper>
            <Header/>
            <Outlet/>
        </LayoutWrapper>
    );
};

const LayoutWrapper = styled.div`
    min-height: 100vh;
    padding: 3.25rem 1.25rem 0;
    
    ${media.medium`
    `}
`;