import axios from "axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      "/users/login",
      credentials
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
