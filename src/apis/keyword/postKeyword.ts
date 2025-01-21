import {axiosInstance, getTokenHeader} from "../index";

const postKeyword = async (keywords: string[]) => {
    try {
        const response = await axiosInstance.post(`/api/v1/notify/add/keywords`, {
                keywords: keywords,
            }, {
                headers: getTokenHeader()
            }
        );

        return response;
    } catch (error) {
        console.error(error);
    }
};

export default postKeyword;