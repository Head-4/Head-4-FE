import React from 'react';
import styled from "styled-components";
import {ReactComponent as DeleteIcon} from "../../../assets/KeyWord/DeleteIcon.svg";
import {UseMutationResult} from "@tanstack/react-query";

interface Keyword {
    notifyId: number;
    keyword: string;
}

interface KeyWordProps {
    it: Keyword;
    deleteKeywordMutate: (id: number) => void;
}

export default function KeyWord({it, deleteKeywordMutate}: KeyWordProps) {
    return (
        <KeyWordDiv>
            <KeyWordContent>{it.keyword}</KeyWordContent>
            <DeleteButton onClick={() => deleteKeywordMutate(it.notifyId)}>
                <DeleteIcon/>
            </DeleteButton>
        </KeyWordDiv>
    );
}

const KeyWordDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 8px 12px 8px 18px;
    border-radius: 20px;
    border: 1px solid #E9E9E9;
`;

const KeyWordContent = styled.span`
    color: #707070;
    font-weight: 600;
`;

const DeleteButton = styled.button`
    display: flex;
    color: #D2D2D2;

    &:active {
        color: ${({theme}) => theme.colors.primary};
    }
`;