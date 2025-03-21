import axios from 'axios';
import { getLocal, isEmpty } from '../utils/common';

export const setAuthToken = (token) => axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const Axios = async (data) => {
    try {

        if (!isEmpty(getLocal("token"))) axios.defaults.headers.common['Authorization'] = `Bearer ${getLocal("token")}`;
        const respData = await axios(data);

        return {
            data: respData?.data?.data,
            message: respData?.data?.message,
            status: respData?.data?.status
        }
    } catch (e) {
        if (e?.response?.status === 401) {
            localStorage.removeItem("token"); // Clear token
            return window.location.href = "/";  // Redirect to login page
        }
        return {
            message: e?.response?.data?.message,
            status: e?.response?.data?.status
        }
    }
}


export default axios