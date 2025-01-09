import React from 'react';
import styled from "styled-components";
import GlobalButton from "../../components/GlobalButton";
import {ReactComponent as MainLogo} from "../../assets/Logo/MainLogo.svg";

export default function CompletePage() {
    return (
        <>
            <CompleteSection>
                <CompleteH1>환영합니다!</CompleteH1>
                <CompleteH2>이제 필요한 공지만<br/>빠르게 받아볼 수 있어요</CompleteH2>
                <MainLogo/>
            </CompleteSection>
            <GlobalButton isActive={true}/>
        </>
    );
}

const CompleteSection = styled.section`
    margin-top: 68px;
    text-align: center;
`;

const CompleteH1 = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.mainFont};
    margin-bottom: 24px;
`;

const CompleteH2 = styled.h2`
    font-size: 18px;
    font-weight: 500;
    color: #707070;
    margin-bottom: 16px;
`;