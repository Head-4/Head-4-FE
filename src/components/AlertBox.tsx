import React from 'react';
import styled from "styled-components";

interface AlertBoxProps {
    isAlert: boolean;
    status: "success" | "failure";
}

export default function AlertBox({isAlert, status}: AlertBoxProps) {
    return (
        <AlertBoxWrapper $isAlert={isAlert}>
            {status === "success" ? (
                '성공적으로 변경되었어요!'
            ) : (
                '실패'
            )}
        </AlertBoxWrapper>
    );
}

const AlertBoxWrapper = styled.div<{ $isAlert: boolean }>`
    position: fixed;
    left: 50%;
    bottom: 0;
    transition: transform 0.3s ease-in-out;
    transform: translate(-50%, ${({$isAlert}) => $isAlert ? '-162px' : '100%'});
    width: calc(100% - 40px);
    z-index: 10;
    padding: 18px 0;
    color: #528B5D;
    font-size: 16px;
    font-weight: 600;
    background-color: #F0FAF2;
    border-radius: 12px;
    text-align: center;

    @media (min-width: 500px) {
        left: 50%;
        transform: translate(-50%, ${({$isAlert}) => $isAlert ? '-162px' : '100%'});
        width: calc(500px - 40px);
    }
`;