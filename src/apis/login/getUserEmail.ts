import {axiosInstance, getTokenHeader} from "../index";

const getUserEmail = async () => {
    try {
        const response = await axiosInstance.get(`api/v1/user/email`, {
            headers: getTokenHeader()
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default getUserEmail;