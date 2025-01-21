import {axiosInstance, getTokenHeader} from "../index";

const postKeyword = async (keyword: string) => {
    try {
        const response = await axiosInstance.post(`/api/v1/user/add/keyword/${keyword}`, null, {
                headers: getTokenHeader()
            }
        );

        return response;
    } catch (error) {
        console.error(error);
    }
};

export default postKeyword;