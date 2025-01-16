import axios from 'axios';

const postKeyword = async (keyword: string) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/notify/add/keywords`, {
                keywords: [keyword],
            }
        );

        return response;
    } catch (error) {
        console.error(error);
    }
};

export default postKeyword;