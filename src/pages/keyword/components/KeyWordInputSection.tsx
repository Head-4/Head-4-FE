import React from 'react';
import Row from "../../../styles/Common/Row";
import styled from "styled-components";
import {ReactComponent as AddIcon} from "../../../assets/KeyWord/AddIcon.svg";


interface KeyWordInputSectionProps {
    keyWord: string;
    setKeyWord: React.Dispatch<React.SetStateAction<string>>;
    isAddActive: boolean;
    isMax: boolean;
    setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
    addKeyWordClick: () => void;
}

export default function KeyWordInputSection({
                                                keyWord, setKeyWord, isAddActive, isMax,
                                                setIsInputFocused, addKeyWordClick,
                                            }: KeyWordInputSectionProps) {

    return (
        <Row $gap={12} $verticalAlign="center">
            <KeyWordInput
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                $isMax={isMax}
                readOnly={isMax}
                placeholder='키워드 입력'
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            />
            <AddButton
                onClick={addKeyWordClick}
                disabled={!isAddActive}
                $isAddActive={isAddActive}
            >
                <AddIcon/>
                <AddLabel>추가하기</AddLabel>
            </AddButton>
        </Row>
    );
}

const KeyWordInput = styled.input<{ $isMax: boolean }>`
    width: calc(100% - 55px);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #E9E9E9;
    font-size: 18px;
    font-weight: 600;
    color: ${({theme}) => theme.colors.mainFont};

    &:focus {
        border-color: ${({$isMax}) => $isMax ? '#BD0000' : ({theme}) => theme.colors.primary};
    }

    &::placeholder {
        color: #ADADAD;
    }
`;

const AddButton = styled.button<{ $isAddActive: boolean }>`
    color: ${({$isAddActive}) => $isAddActive ? ({theme}) => theme.colors.primary : '#DBDBDB'};
`;

const AddLabel = styled.div`
    margin-top: 4px;
    font-size: 12px;
    font-weight: 500;
`;