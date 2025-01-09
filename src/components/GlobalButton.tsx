import React from 'react';
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";

interface GlobalButtonProps {
    isActive: boolean;
    inputReset?: () => void;
}

export default function GlobalButton({isActive, inputReset}: GlobalButtonProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const pathName = location.pathname;

    const clickButton = () => {
        switch (pathName) {
            case '/register/university':
                navigate('/register/keyword');
                break;
            case '/setting/university':
                if (inputReset) inputReset();
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

    const buttonName: { [key: string]: string } = {
        "/register/university": "다음",
        "/setting/university": "저장",
        "/register/keyword": "다음",
        "/register/complete": "확인",
        "/faq": "건의하기",
    };

    return (
        <GlobalButtonWrapper
            onClick={clickButton}
            $isActive={isActive}
            disabled={!isActive}
        >
            {buttonName[pathName]}
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