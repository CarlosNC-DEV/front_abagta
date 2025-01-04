import axios from "axios";

export const getAllMessages = async () => {
    try {
        const response = await axios.get("/messages");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};