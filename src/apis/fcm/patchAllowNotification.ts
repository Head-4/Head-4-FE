import axios from 'axios';

const patchAllowNotification = async (allow: boolean) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/user/notify/${allow}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default patchAllowNotification;