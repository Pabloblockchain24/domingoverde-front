import { useEffect } from "react";
import { useRecipes } from "../../context/RecipesContext";
import RecipeItem from "./RecipeItem";
import Loader from "../../components/loader";

export default function RecipeList() {
  const { recipes, getRecipes, loading } = useRecipes();

  useEffect(() => {
    getRecipes();
  }, []);

  if (loading) return <Loader />;

  if (recipes.length === 0) {
    return <p className="text-center">No hay recetas aún.</p>;
  }

  return (
    <div className="recipe-list">
      <h1 className="recipe-list__title">Recetas</h1>
      <div className="recipe-list__grid">
        {recipes.map((recipe) => (
          <RecipeItem key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
