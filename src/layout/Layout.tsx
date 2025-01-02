import React, {useState} from 'react';
import styled from "styled-components";
import {media} from "../styles/media";
import {Outlet} from "react-router-dom";
import {handleAllowNotification} from "../utills/firebaseConfig";

export default function Layout() {
    const [token, setToken] = useState<string>('');

    return (
        <LayoutWrapper>
            <Outlet/>
            {token}
            <button  onClick={() => handleAllowNotification(setToken)}>
                알림 설정
            </button>
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