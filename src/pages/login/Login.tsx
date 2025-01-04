import styled from "styled-components";

export default function Login() {
    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

    const clickKakaoLogin = () => {
        window.location.href = KAKAO_LOGIN_URL;
    }

    return (
        <>
            <header>
                <h1>로그인</h1>
            </header>
            <LoginWrapper>
                <LoginButton onClick={clickKakaoLogin}>
                    카카오 로그인
                </LoginButton>
            </LoginWrapper>
        </>
    );
};

const LoginWrapper = styled.main`
    border-radius: 5px;
    border: 1px solid black;
    text-align: center;
`;

const LoginButton = styled.button`

`;