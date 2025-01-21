import {axiosInstance, getTokenHeader} from "../index";

const deleteKeyword = async (notifyId: number) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/user/delete/keyword/${notifyId}`, {
            headers: getTokenHeader()
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default deleteKeyword;