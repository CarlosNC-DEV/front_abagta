import axios from "axios";
import { ENV } from "../../../config/pass";

export const allCategories = async () => {
  try {
    const response = await axios.get(`${ENV.API_URL}/categories`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
