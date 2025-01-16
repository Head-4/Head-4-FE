import axios from 'axios';

const deleteKeyword = async (notifyId: number) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/user/delete/keyword/${notifyId}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default deleteKeyword;