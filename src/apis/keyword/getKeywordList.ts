import axios from 'axios';

const getKeywordList = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/keywords`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default getKeywordList;