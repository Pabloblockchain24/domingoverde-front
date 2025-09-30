import axios from "./axios"

export const getRecipesByApi = () => axios.get("/recipes");
export const getRecipeByIdByApi = (recipeId) => axios.get(`/recipes/${recipeId}`);
export const createRecipeByApi = (data) => axios.post("/recipes", data);
export const updateRecipeByApi = (recipeId, data) => axios.patch(`/recipes/${recipeId}`, data);
export const deleteRecipeByApi = (recipeId) => axios.delete(`/recipes/${recipeId}`);
