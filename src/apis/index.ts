import axios, {AxiosRequestConfig} from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export function getTokenHeader(userToken: string): Record<string, string> {
    return {Authorization: `Bearer ${userToken}`};
}

const config: AxiosRequestConfig = {baseURL: baseUrl};
export const axiosInstance = axios.create(config);