import React from 'react';
import styled from "styled-components";

interface CommonButtonProps {
    isActive: boolean;
    onClick: () => void;
    children: string;
}

export default function CommonButton({onClick, children, isActive}: CommonButtonProps) {
    return (
        <CommonButtonWrapper onClick={onClick} $isActive={isActive}>
            {children}
        </CommonButtonWrapper>
    );
}

const CommonButtonWrapper = styled.button<{ $isActive: boolean }>`
    margin-top: 36px;
    width: 100%;
    font-weight: 700;
    font-size: 18px;
    color: ${({$isActive}) => $isActive ? '#FAFAFA' : '#B7B7B7'};
    border-radius: 12px;
    background-color: ${({$isActive, theme}) => $isActive ? theme.colors.primary : '#F7F7F7'};
    padding: 18px 0;
`;