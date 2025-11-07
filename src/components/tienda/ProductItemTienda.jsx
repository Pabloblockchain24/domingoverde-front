import { useCartStore } from "../../store/cartStore.js";
import { useReviews } from "../../context/ReviewsContext.jsx";
import { useEffect, useMemo } from "react";
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
}) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { reviews, getReviews } = useReviews();

  // 🔹 Cargar las reseñas si aún no están cargadas
  useEffect(() => {
    if (!reviews.length) getReviews();
  }, []);

  // 🔹 Filtrar las reseñas que coinciden con el producto actual
  const productReviews = useMemo(() => {
    return reviews.filter(
      (r) => r.category?.toLowerCase() === inventoryItem?.toLowerCase()
    );
  }, [reviews, inventoryItem]);

  // 🔹 Calcular rating promedio y cantidad
  const { averageRating, totalReviews } = useMemo(() => {
    if (!productReviews.length) return { averageRating: 0, totalReviews: 0 };
    const sum = productReviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return {
      averageRating: (sum / productReviews.length).toFixed(1),
      totalReviews: productReviews.length,
    };
  }, [productReviews]);

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

  // 🔹 Renderizado de estrellas
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 >= 0.25;
  const totalStars = 5;

  const stars = Array.from({ length: totalStars }, (_, i) => {
    if (i < fullStars) {
      return <Star key={i} size={16} fill="#FFD700" stroke="#FFD700" />;
    } else if (i === fullStars && hasHalfStar) {
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
      return <Star key={i} size={16} stroke="#ccc" />;
    }
  });

  const categoryClass = category ? category.toLowerCase() : "";

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
          <span className="reviews">
            ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
          </span>
        </div>
      </div>

      <button onClick={handleAdd}>+ Agregar al carrito</button>
    </div>
  );
}
