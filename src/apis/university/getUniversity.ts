import {axiosInstance, getTokenHeader} from "../index";

const getUniversity = async () => {
    try {
        const response = await axiosInstance.get(`api/v1/user/university`, {
            headers: getTokenHeader()
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default getUniversity;