import { useEffect, useState } from "react";
import { useRecipes } from "../../context/RecipesContext";
import Loader from "../loader";

export default function RecipeDetail({ recipeId }) {
  const { getRecipesById, loading } = useRecipes();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipesById(recipeId);
        setRecipe(data);
      } catch (error) {
        console.error("Error al cargar la receta:", error);
      }
    };

    if (recipeId) fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="recipe-detail__loading">
        <Loader />
      </div>
    );
  }

  if (!recipe) {
    return <p className="recipe-detail__notfound">Receta no encontrada</p>;
  }

  return (
    <div className="recipe-detail">
      <a href="/recetas" className="recipe-detail__back">
        ⬅ Volver
      </a>

      <h1 className="recipe-detail__title">{recipe.name}</h1>
      <p className="recipe-detail__description">{recipe.description}</p>

      {recipe.image && (
        <div className="recipe-detail__image">
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{ maxWidth: "300px", width: "100%", borderRadius: "8px" }}
          />
        </div>
      )}

      {recipe.ingredients?.length > 0 && (
        <div className="recipe-detail__ingredients">
          <h2>Ingredientes</h2>
          <ul>
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>
      )}

      {recipe.steps?.length > 0 && (
        <div className="recipe-detail__steps mt-6">
          <h2>Preparación</h2>
          <ol className="list-decimal list-inside">
            {recipe.steps.map((step, idx) => (
              <li key={idx} className="mb-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
