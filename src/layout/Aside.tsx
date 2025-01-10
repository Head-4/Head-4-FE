import React from 'react';
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as CloseIcon} from "../assets/Aside/CloseIcon.svg";
import {ReactComponent as MiniKakaoIcon} from "../assets/Aside/MiniKakaoIcon.svg";
import {ReactComponent as UniversityIcon} from "../assets/Aside/UniversityIcon.svg";
import {ReactComponent as KeywordIcon} from "../assets/Aside/KeywordIcon.svg";
import {ReactComponent as MessageIcon} from "../assets/Aside/MessageIcon.svg";
import {ReactComponent as ExpandIcon} from "../assets/Aside/ExpandIcon.svg";

interface AsideProps {
    toggleAside: () => void;
    isAsideOpen: boolean;
}

export default function Aside({toggleAside, isAsideOpen}: AsideProps) {
    const navigate = useNavigate();

    const clickLogOut = () => {
        // 로그아웃 설정
        toggleAside();
        navigate('/login');
    }

    return (
        <>
            {isAsideOpen && <Overlay onClick={toggleAside}/>}
            <AsideWrapper $isAsideOpen={isAsideOpen} onClick={(e) => e.stopPropagation()}>
                <AsideTopSection>
                    <MiniKakaoIcon/>
                    <AsideUserName>eunjin@naver.com</AsideUserName>
                    <AsideCloseButton onClick={toggleAside}>
                        <CloseIcon/>
                    </AsideCloseButton>
                </AsideTopSection>
                <AsideBottomSection>
                    <ul>
                        <li>
                            <AsideLink to='/setting/university' onClick={toggleAside}>
                                <UniversityIcon/>
                                <AsideSetting>학교 설정</AsideSetting>
                                <ExpandIcon/>
                            </AsideLink>
                        </li>
                        <li>
                            <AsideLink to='/setting/keyword' onClick={toggleAside}>
                                <KeywordIcon/>
                                <AsideSetting>키워드 설정</AsideSetting>
                                <ExpandIcon/>
                            </AsideLink>
                        </li>
                        <li>
                            <AsideLink to='/faq' onClick={toggleAside}>
                                <MessageIcon/>
                                <AsideSetting>건의하기</AsideSetting>
                                <ExpandIcon/>
                            </AsideLink>
                        </li>
                    </ul>
                </AsideBottomSection>
                <LogOutButton onClick={clickLogOut}>
                    로그아웃
                </LogOutButton>
            </AsideWrapper>
        </>
    );
}

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(51, 54, 63, 0.10);
    z-index: 999;
`;

const AsideWrapper = styled.aside<{ $isAsideOpen: boolean }>`
    z-index: 1000;
    position: fixed;
    top: 0;
    right: 0;
    width: ${({$isAsideOpen}) => $isAsideOpen ? '80%' : '0'};
    background-color: #FAFAFA;
    height: 100vh;
    padding: ${({$isAsideOpen}) => $isAsideOpen ? '0 20px' : '0'};
    transition: all 0.2s ease-in-out;
    opacity: ${({$isAsideOpen}) => $isAsideOpen ? '1' : '0'};

    @media (min-width: 500px) {
        width: ${({$isAsideOpen}) => $isAsideOpen ? '400px' : '0'};
        right: calc(50vw - 250px);
    }
`;

const AsideTopSection = styled.section`
    height: 52px;
    display: flex;
    column-gap: 8px;
    align-items: center;
    justify-content: space-between;
`;

const AsideUserName = styled.span`
    color: ${({theme}) => theme.colors.mainFont};
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
`;

const AsideCloseButton = styled.button`
    display: flex;
`;

const AsideBottomSection = styled.section`
    margin-top: 10px;
`;

const AsideLink = styled(Link)`
    display: flex;
    column-gap: 12px;
    padding: 16px 0;
    align-items: center;
    color: #DDDDDD;

    &:active {
        color: ${({theme}) => theme.colors.primary};
    }
`;

const AsideSetting = styled.div`
    color: ${({theme}) => theme.colors.mainFont};
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
`;

const LogOutButton = styled.button`
    position: absolute;
    bottom: 140px;
    color: #A9A9A9;
    font-size: 12px;
    font-weight: 500;
    text-decoration-line: underline;
`;