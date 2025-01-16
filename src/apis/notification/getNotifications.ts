import axios from 'axios';

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

const getNotifications = async (cursor: number): Promise<GetMainArticlesResponse | undefined> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/notify/page/${cursor}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export default getNotifications;