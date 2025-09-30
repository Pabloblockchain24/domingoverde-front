import { createContext, useContext, useState } from "react";
import {
    getRecipesByApi,
    getRecipeByIdByApi,
    createRecipeByApi,
    updateRecipeByApi,
    deleteRecipeByApi
} from "../api/recipes";

const RecipesContext = createContext();

export const useRecipes = () => {
    const context = useContext(RecipesContext);
    if (!context)
    throw new Error("useRecipes must be used within a RecipesProvider");
  return context;
};


export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRecipes = async () => {
        setLoading(true);
        try {
            const res = await getRecipesByApi();
            setRecipes(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const getRecipesById = async (id) => {
        setLoading(true);
        try {
            const res = await getRecipeByIdByApi(id);
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const createRecipe = async (data) => {
        setLoading(true);
        try {
            const res = await createRecipeByApi(data);
            setRecipes((prev) => [...prev, res.data]);
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateRecipe = async (recipeId, data) => {
        setLoading(true);
        try {
            const res = await updateRecipeByApi(recipeId, data);
            setRecipes((prev) =>
                prev.map((r) => (r._id === recipeId ? res.data : r))
            );
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteRecipe = async (recipeId) => {
        setLoading(true);
        try {
            await deleteRecipeByApi(recipeId);
            setRecipes((prev) => prev.filter((r) => r._id !== recipeId));
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <RecipesContext.Provider
            value={{ recipes, loading, getRecipes,getRecipesById, createRecipe, updateRecipe, deleteRecipe }}
        >
            {children}
        </RecipesContext.Provider>
    );
};