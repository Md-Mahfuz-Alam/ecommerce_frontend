import axios from "axios";

export const fetchCategoriesData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/categories`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error; 
  }
};