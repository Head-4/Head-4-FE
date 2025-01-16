import axios from 'axios';

const getKakaoToken = async (code: string) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/login/kakao/${code}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default getKakaoToken;