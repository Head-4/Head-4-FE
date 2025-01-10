import styled from "styled-components";
import {ReactComponent as KakaoIcon} from "../../assets/Login/KakaoIcon.svg";
import {ReactComponent as MainLogo} from "../../assets/Logo/MainLogo.svg";

export default function Login() {
    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

    const clickKakaoLogin = () => {
        window.location.href = KAKAO_LOGIN_URL;
    }

    return (
        <>
            <LoginSection>
                <LoginH1>어쩌고 저쩌고</LoginH1>
                <LoginH2>카카오로 바로 시작해 보세요</LoginH2>
                <MainLogo style={{width: '100%'}}/>
            </LoginSection>
            <LoginButton onClick={clickKakaoLogin}>
                <KakaoIcon/>
                <KakaoLogin>카카오 로그인</KakaoLogin>
            </LoginButton>
        </>
    );
};

const LoginSection = styled.section`
    margin-top: 60px;
    color: #F7F7F7;
    text-align: center;
`;

const LoginH1 = styled.h1`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
`;

const LoginH2 = styled.h2`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 65px;
`;

const LoginButton = styled.button`
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
    font-weight: 700;
`;