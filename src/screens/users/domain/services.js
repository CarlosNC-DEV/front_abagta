import axios from "axios";

export const getAllUsersByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`/clients/category/${categoryId}`);
        return response.data;
    } catch (error) {
        return error.response.data; 
    }
};
