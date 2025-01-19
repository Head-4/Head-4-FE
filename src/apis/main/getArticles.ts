import {axiosInstance} from "../index";

interface NoticeType {
    id: number;
    title: string;
    date: string;
    url: string;
}

interface GetMainArticlesResponse {
    articles: NoticeType[];
    hasNext: boolean;
    cursor: number;
}

const getArticles = async (cursor: number, selectedKeyWord: string): Promise<GetMainArticlesResponse | undefined> => {
    try {
        const response = await axiosInstance.get(`/api/v1/article/page/${cursor}/${selectedKeyWord}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export default getArticles;