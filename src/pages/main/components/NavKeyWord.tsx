import React from 'react';
import styled from "styled-components";

interface keyWord {
    id: number;
    content: string;
}

interface NavKeyWordProps {
    it: keyWord;
    isSelected: boolean;
    clickKeyWord: (id: number) => void;
}

export default function NavKeyWord({it, isSelected, clickKeyWord}: NavKeyWordProps) {
    return (
        <li>
            <NavKeyWordButton
                onClick={() => clickKeyWord(it.id)}
                $isSelected={isSelected}
            >
                {it.content}
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