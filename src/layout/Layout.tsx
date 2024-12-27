import React from 'react';
import styled from "styled-components";
import {media} from "../styles/media";

export default function Layout() {
    return (
        <LayoutWrapper>
            대충 레이아웃
        </LayoutWrapper>
    );
};

const LayoutWrapper = styled.div`
    background: blue;

    ${media.medium`
        background: green;
    `}
    ${media.large`
        background: red;
    `}

`;