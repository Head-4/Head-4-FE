import React from 'react';
import styled from "styled-components";

interface GlobalButtonProps {
    isActive: boolean
}

export default function GlobalButton({isActive}: GlobalButtonProps) {
    return (
        <GlobalButtonWrapper $isActive={isActive}>
            다음
        </GlobalButtonWrapper>
    );
}

const GlobalButtonWrapper = styled.button<{$isActive:boolean}>`
    font-weight: 700;
    font-size: 18px;
    color: ${({$isActive}) => $isActive ? '#FAFAFA' : '#B7B7B7'};
    border-radius: 12px;
    background-color: ${({$isActive}) => $isActive ? ({theme}) => theme.colors.primary : 'none'};
    padding: 18px 0;
`;