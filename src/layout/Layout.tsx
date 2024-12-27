import React from 'react';
import styled from "styled-components";
import {media} from "../styles/media";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <LayoutWrapper>
            <Outlet/>
        </LayoutWrapper>
    );
};

const LayoutWrapper = styled.div`
    min-height: 100vh;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    ${media.medium`
        background: green;
    `}
    
    ${media.large`
        background: red;
    `}

`;