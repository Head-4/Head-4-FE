import React from 'react';
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";

interface GlobalButtonProps {
    isActive: boolean
}

export default function GlobalButton({isActive}: GlobalButtonProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const pathName = location.pathname;

    const clickButton = () => {
        switch (pathName) {
            case '/register/university':
                navigate('/register/keyword');
                break;
            case '/register/keyword':
                navigate('/register/complete');
                break;
            case '/register/complete':
                navigate('/');
                break;
            default:
                navigate('/');
                break;
        }
    };

    return (
        <GlobalButtonWrapper
            onClick={clickButton}
            $isActive={isActive}
            disabled={!isActive}
        >
            {pathName === '/register/complete' ?
                "확인"
                :
                "다음"
            }
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