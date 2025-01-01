import axios from 'axios';

interface KakaoToken {
    accessToken: string;
    refreshToken: string;
}

const getKakaoToken = async (code: string): Promise<KakaoToken | undefined> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/kakao/login`, {
            params: {code: code},
        });
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
};

export default getKakaoToken;