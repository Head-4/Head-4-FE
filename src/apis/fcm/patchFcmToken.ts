import {axiosInstance, getTokenHeader} from "../index";

const patchFcmToken = async (token: string) => {
    try {
        const response = await axiosInstance.patch(`/api/v1/user/fcm/${token}`, null, {
            headers: getTokenHeader()
        });

        return response;
    } catch (error) {
        console.error(error);
    }
};

export default patchFcmToken;