import { useCartStore } from "../../store/cartStore.js";
import { toast } from "react-toastify";
import { Star } from "lucide-react";

export default function ProductItemTienda({
  _id,
  title,
  price,
  image,
  category,
  inventoryItem,
  inventoryQuantity,
  rating = 4.3, // ⭐ Valor promedio, puede tener decimales
  reviews = 12, // cantidad de reseñas
}) {
  const addToCart = useCartStore((state) => state.addToCart);

  const formattedPrice = price.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  });

  const handleAdd = () => {
    addToCart({
      _id,
      title,
      price,
      image,
      quantity: 1,
      inventoryItem,
      inventoryQuantity,
    });
    toast.success(`✅ "${title}" se agregó al carrito`);
  };

  const categoryClass = category ? category.toLowerCase() : "";

  // Calcular número de estrellas llenas, parciales y vacías
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25; // si el decimal es relevante
  const totalStars = 5;

  const stars = Array.from({ length: totalStars }, (_, i) => {
    if (i < fullStars) {
      // Estrella completamente llena
      return (
        <Star key={i} size={16} fill="#FFD700" stroke="#FFD700" />
      );
    } else if (i === fullStars && hasHalfStar) {
      // Estrella parcialmente rellena
      return (
        <div
          key={i}
          className="star-half"
          style={{
            position: "relative",
            width: "16px",
            height: "16px",
          }}
        >
          <Star
            size={16}
            fill="none"
            stroke="#ccc"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
          <Star
            size={16}
            fill="url(#halfGradient)"
            stroke="#FFD700"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
          <svg width="0" height="0">
            <defs>
              <linearGradient id="halfGradient">
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    } else {
      // Estrella vacía
      return <Star key={i} size={16} stroke="#ccc" />;
    }
  });

  return (
    <div className="product-card">
      {category && (
        <span className={`product-category ${categoryClass}`}>{category}</span>
      )}
      <img src={image} alt={title} />
      <div className="product-card-content">
        <h3>{title}</h3>
        <p className="price">{formattedPrice}</p>

        <div className="rating">
          <div className="stars">{stars}</div>
          <span className="reviews">({reviews} reviews)</span>
        </div>
      </div>

      <button onClick={handleAdd}>+ Agregar al carrito</button>
    </div>
  );
}
