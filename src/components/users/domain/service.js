import axios from "axios";

export const createUser = async (data) => {
    try {
        const response = await axios.post(`/clients/register`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateUser = async (userId, data) => {
    try {
        const response = await axios.put(`/clients/${userId}`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const confirmPayment = async (userId) => {
    try {
        const response = await axios.post(`/clients/${userId}/pay`);
        return response.data;
    } catch (error) {                   
        return error.response.data;
    }
};