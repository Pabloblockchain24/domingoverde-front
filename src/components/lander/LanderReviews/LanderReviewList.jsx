// src/components/ReviewList.jsx
import { useEffect, useMemo } from "react";
import { Star } from "lucide-react";
import LanderReviewItem from "./LanderReviewItem.jsx";
import { useReviews } from "../../../context/ReviewsContext.jsx";
import Loader from "../../loader.jsx";

// Función para generar estrellas según la calificación
const renderStars = (rating) => {
  const rounded = Math.round(rating);
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={18}
      fill={i < rounded ? "#facc15" : "none"} // Amarillo para las llenas
      stroke="#facc15" // Bordes del mismo color
    />
  ));
};

export default function ReviewList() {
  const { reviews, getReviews, loading } = useReviews();

  useEffect(() => {
    getReviews();
  }, []);

  const { averageRating, totalReviews } = useMemo(() => {
    if (!reviews || reviews.length === 0)
      return { averageRating: 0, totalReviews: 0 };

    const totalReviews = reviews.length;
    const averageRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

    return {
      averageRating: averageRating.toFixed(1),
      totalReviews,
    };
  }, [reviews]);

  return (
    <div>
      <div className="landing-review-summary">
        <h3>Reseñas ({totalReviews})</h3>
        <div className="average-rating">
          <span className="average-rating-number">
            <span>{averageRating}</span> {renderStars((averageRating))}</span>
        </div>
      </div>

      <div className="landing-review-list">
        {loading ? (
          <Loader />
        ) : reviews && reviews.length > 0 ? (
          reviews.map((r) => <LanderReviewItem key={r._id} review={r} />)
        ) : (
          <p className="no-reviews-message">Aún no hay reseñas disponibles.</p>
        )}
      </div>
    </div>
  );
}
