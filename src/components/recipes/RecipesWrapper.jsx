import { RecipesProvider } from "../../context/RecipesContext.jsx";
import RecipeList from "./RecipeList.jsx"

export default function ProductsWrapper() {
    return (
        <RecipesProvider>
            <RecipeList />
        </RecipesProvider>
    );
}
