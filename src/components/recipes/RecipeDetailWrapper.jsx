import { RecipesProvider } from "../../context/RecipesContext.jsx";
import RecipeDetail from "./RecipeDetail.jsx";

export default function RecipeDetailWrapper({ recipeId }) {
  return (
    <RecipesProvider>
      <RecipeDetail recipeId={recipeId} />
    </RecipesProvider>
  );
}