import React from 'react';
import styled from "styled-components";

interface AlertBoxProps {
    isAlert: boolean;
    status: "success" | "failure";
}

export default function AlertBox({isAlert, status}: AlertBoxProps) {
    const message =
        status === "success"
            ? "성공적으로 변경되었어요!"
            : "잠시 후에 다시 시도해 주세요";

    return (
        <AlertBoxWrapper $isAlert={isAlert} $status={status}>
            {message}
        </AlertBoxWrapper>
    );
}

const AlertBoxWrapper = styled.div<{ $isAlert: boolean; $status: "success" | "failure" }>`
    position: fixed;
    left: 50%;
    bottom: 0;
    transition: transform 0.3s ease-in-out;
    transform: translate(-50%, ${({$isAlert}) => $isAlert ? '-162px' : '100%'});
    width: calc(100% - 40px);
    z-index: 10;
    padding: 18px 0;
    color: ${({$status}) => $status === "success" ? '#528B5D' : '#BD0000'};
    background-color: ${({$status}) => $status === "success" ? '#F0FAF2' : '#FFEFF0'};
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    text-align: center;

    @media (min-width: 500px) {
        left: 50%;
        transform: translate(-50%, ${({$isAlert}) => $isAlert ? '-162px' : '100%'});
        width: calc(500px - 40px);
    }
`;