import React from 'react';
import styled from "styled-components";
import AsideTop from "./components/AsideTop";
import AsideBottom from "./components/AsideBottom";
import AsideLogOut from "./components/AsideLogOut";

interface AsideProps {
    toggleAside: () => void;
    isAsideOpen: boolean;
}

export default function Aside({toggleAside, isAsideOpen}: AsideProps) {
    return (
        <>
            {isAsideOpen && <Overlay onClick={toggleAside}/>}
            <AsideWrapper $isAsideOpen={isAsideOpen} onClick={(e) => e.stopPropagation()}>
                <AsideTop toggleAside={toggleAside}/>
                <AsideBottom toggleAside={toggleAside}/>
                <AsideLogOut toggleAside={toggleAside}/>
            </AsideWrapper>
        </>
    );
}

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(51, 54, 63, 0.10);
    z-index: 999;
`;

const AsideWrapper = styled.aside<{ $isAsideOpen: boolean }>`
    z-index: 1000;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background-color: ${({theme}) => theme.colors.backgroundWhite};
    width: ${({$isAsideOpen}) => $isAsideOpen ? '80%' : '0'};
    opacity: ${({$isAsideOpen}) => $isAsideOpen ? '1' : '0'};
    transition: all 0.2s ease-in-out;

    @media (min-width: 500px) {
        width: ${({$isAsideOpen}) => $isAsideOpen ? '400px' : '0'};
        right: calc(50vw - 250px);
    }
`;