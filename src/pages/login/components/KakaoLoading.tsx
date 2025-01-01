import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import getKakaoToken from "../../../apis/login/getKakaoToken";

export default function KakaoLoading() {
    const navigate = useNavigate();

    const GetToken = async (code: string): Promise<void> => {
        try {
            const result = await getKakaoToken(code);
            if (!result) {
                alert('토큰을 받아올 수 없습니다.');
                navigate('/login');
                return;
            }
            const {accessToken, refreshToken} = result;

            alert('로그인 되었습니다.');
            // navigate('/setting');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) {
            GetToken(code);
        } else {
            //에러처리
        }
    }, []);

    return (
        <div>
            로딩중 아이콘
        </div>
    );
}
