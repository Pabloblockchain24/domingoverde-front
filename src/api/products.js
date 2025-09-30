import axios from "./axios"; 

export const getFeaturedProductsByApi = () => axios.get("/products/destacados");
export const getAllProductsByApi = () => axios.get("/products");

