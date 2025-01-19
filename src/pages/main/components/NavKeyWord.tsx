import React from 'react';
import styled from "styled-components";

interface Keyword {
    notifyId: number;
    keyword: string;
}

interface NavKeyWordProps {
    it: Keyword;
    isSelected: boolean;
    clickKeyWord: (keyword: string) => void;
    children: string;
}

export default function NavKeyWord({it, isSelected, clickKeyWord, children}: NavKeyWordProps) {
    return (
        <li>
            <NavKeyWordButton
                onClick={() => clickKeyWord(it.keyword)}
                $isSelected={isSelected}
            >
                {children}
            </NavKeyWordButton>
        </li>
    );
}

const NavKeyWordButton = styled.button<{ $isSelected: boolean }>`
    padding: 8px 18px 8px 18px;
    border-radius: 20px;
    border: 1px solid ${({theme}) => theme.colors.lightGray};
    font-size: 14px;
    font-weight: 600;
    color: ${({$isSelected}) => $isSelected ? '#FFFFFF' : '#707070'};
    background-color: ${({$isSelected}) => $isSelected ? ({theme}) => theme.colors.primary : ({theme}) => theme.colors.backgroundWhite};
`;