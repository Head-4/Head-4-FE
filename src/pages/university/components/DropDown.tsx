import React from 'react';
import styled from "styled-components";
import {highlightText} from "../../../utils/highlightText";

interface DropDownProps {
    options: string[];
    DropDownClick: (clickedUniversity: string) => void;
    searchInput: string;
}

export default function DropDown({options, DropDownClick, searchInput = ''}: DropDownProps) {
    return (
        <DropDownUl>
            {options.map((university, idx) =>
                <DropDownLi key={idx} onClick={() => DropDownClick(university)}>
                    {highlightText(university,searchInput,18)}
                </DropDownLi>
            )}
        </DropDownUl>
    );
}

const DropDownUl = styled.ul`
    position: relative;
    border: 1px solid ${({theme}) => theme.colors.primary};
    border-top: none;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;

    li:last-child {
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 90%;  
        height: 1px;
        transform: translateX(-50%);
        background-color: #E9E9E9; 
    }
`;

const DropDownLi = styled.li`
    color: ${({theme}) => theme.colors.mainFont};
    background-color: ${({theme}) => theme.colors.backgroundWhite};
    padding: 20px;
    font-size: 18px;
    font-weight: 500;
    
    &:active{
        background-color: rgba(233, 233, 233, 0.25);;
    }
`;