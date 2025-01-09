import React from 'react';
import styled from "styled-components";

interface SuccessProps {
    isSuccess: boolean;
}

export default function Success({isSuccess}: SuccessProps) {
    return (
        <SuccessWrapper $isSuccess={isSuccess}>
            성공적으로 변경되었어요!
        </SuccessWrapper>
    );
}

const SuccessWrapper = styled.div<{ $isSuccess: boolean }>`
    position: absolute;
    left: 50%;
    bottom: 0;
    transition: transform 0.3s ease-in-out;
    transform: translate(-50%, ${({$isSuccess}) => $isSuccess ? '-162px' : '100%'});
    width: calc(100% - 40px);
    z-index: 10;
    padding: 18px 0;
    color: #528B5D;
    font-size: 16px;
    font-weight: 600;
    background-color: #F0FAF2;
    border-radius: 12px;
    text-align: center;
`;