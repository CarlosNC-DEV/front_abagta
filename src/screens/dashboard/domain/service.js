import axios from "axios";

export const allCategories = async () => {
  try {
    const response = await axios.get("/categories");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
