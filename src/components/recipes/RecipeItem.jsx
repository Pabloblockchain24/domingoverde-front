export default function RecipeItem({ recipe }) {
  return (
    <a href={`/recetas/${recipe._id}`} className="recipe-item">
      {recipe.image && (
        <div className="recipe-item__image">
          <img src={recipe.image} alt={recipe.name} />
        </div>
      )}
      <div className="recipe-item__content">
        <h2 className="recipe-item__title">{recipe.title}</h2>
        <p className="recipe-item__description">{recipe.description}</p>

        <h3 className="recipe-item__header">Receta</h3>
        {recipe.ingredients?.length > 0 && (
          <ul className="recipe-item__ingredients">
            {recipe.ingredients.slice(0, 3).map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
            {recipe.ingredients.length > 3 && <li>...</li>}
          </ul>
        )}
      </div>
    </a>
  );
}
