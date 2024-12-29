import axios from "axios";
import { ENV } from "../../../config/pass";

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      `${ENV.API_URL}/users/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
