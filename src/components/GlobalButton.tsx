import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

interface GlobalButtonProps {
    isActive: boolean
}

export default function GlobalButton({isActive}: GlobalButtonProps) {
    const navigate = useNavigate();

    const clickButton = () => {
        navigate('/register/keyword');
    }

    return (
        <GlobalButtonWrapper
            onClick={clickButton}
            $isActive={isActive}
            disabled={!isActive}
        >
            다음
        </GlobalButtonWrapper>
    );
}

const GlobalButtonWrapper = styled.button<{ $isActive: boolean }>`
    font-weight: 700;
    font-size: 18px;
    color: ${({$isActive}) => $isActive ? '#FAFAFA' : '#B7B7B7'};
    border-radius: 12px;
    background-color: ${({$isActive}) => $isActive ? ({theme}) => theme.colors.primary : ''};
    padding: 18px 0;
`;