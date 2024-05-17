
import axios from "axios";

export const category = async (categoryId: string): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/categories/${categoryId}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error; 
  }
};
