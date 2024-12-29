import axios from "axios";
import { ENV } from "../../../config/pass";

export const createCategories = async (category) => {
  try {
    const response = await axios.post(
      `${ENV.API_URL}/categories/register`,
      category
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(
      `${ENV.API_URL}/categories/${id}`,
      category
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
