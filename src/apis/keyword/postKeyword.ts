import {axiosInstance} from "../index";

const postKeyword = async (keyword: string) => {
    try {
        const response = await axiosInstance.post(`/api/v1/notify/add/keywords`, {
                keywords: [keyword],
            }
        );

        return response;
    } catch (error) {
        console.error(error);
    }
};

export default postKeyword;