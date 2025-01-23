import styled from "styled-components";
import {ReactComponent as KakaoIcon} from "../../assets/Login/KakaoIcon.svg";
import {ReactComponent as MainLogo} from "../../assets/Logo/MainLogo.svg";
import Column from "../../styles/Common/Column";
import PwaInstallModal from "../utilPages/PWAInstallModal";

export default function Login() {
    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

    const clickKakaoLogin = () => {
        window.location.href = KAKAO_LOGIN_URL;
    }

    return (
        <Column $gap={164} $verticalAlign="center" style={{margin: 'auto 0', position: 'relative'}}>
            <PwaInstallModal/>
            <LoginLogoSection>
                <MainLogo width='100%'/>
                <LoginH1>나에게 필요한 공지만<br/>빠르게 받아볼 수 있어요</LoginH1>
            </LoginLogoSection>
            <LoginButtonSection>
                <LoginH2>카카오로 바로 시작해 보세요</LoginH2>
                <LoginButton onClick={clickKakaoLogin}>
                    <KakaoIcon/>
                    <KakaoLogin>카카오 로그인</KakaoLogin>
                </LoginButton>
            </LoginButtonSection>
        </Column>
    );
};

const LoginLogoSection = styled.section`
    color: #F7F7F7;
    text-align: center;
`;

const LoginH1 = styled.h1`
    color: ${({theme}) => theme.colors.mainFont};
    font-size: 18px;
    font-weight: 600;
    margin-top: 28px;
`;

const LoginButtonSection = styled.section`
    width: 100%;
`;

const LoginH2 = styled.h2`
    width: 100%;
    color: #6F6F6F;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 16px;
`;

const LoginButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 18px 32px;
    border-radius: 12px;
    background: #FEE500;
`;

const KakaoLogin = styled.span`
    flex: 1;
    color: ${({theme}) => theme.colors.mainFont};
    font-size: 20px;
    font-weight: 600;
`;