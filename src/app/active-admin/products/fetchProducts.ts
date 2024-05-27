import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/products?include=category,seller,image`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error; 
  }
};