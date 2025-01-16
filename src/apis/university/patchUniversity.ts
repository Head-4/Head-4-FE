import axios from 'axios';

const patchUniversity = async (name: string) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/user/univ/${name}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default patchUniversity;