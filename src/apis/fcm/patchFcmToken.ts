import axios from 'axios';

const patchFcmToken = async (token: string) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/user/fcm/${token}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default patchFcmToken;