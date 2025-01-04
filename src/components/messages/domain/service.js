import axios from "axios";

export const updateMessage = async (id, message) => {
    try {
        const response = await axios.put(`/messages/${id}`, message);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
