import axios from 'axios';

interface NotificationType {
    createdDate: string;
    keyword: string;
    pushId: number;
    title: string;
    url: string;
}

interface GetNotificationResponse {
    pushLogs: NotificationType[];
    hasNext: boolean;
    cursor: number;
}

const getNotifications = async (cursor: number): Promise<GetNotificationResponse | undefined> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/notify/page/${cursor}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export default getNotifications;