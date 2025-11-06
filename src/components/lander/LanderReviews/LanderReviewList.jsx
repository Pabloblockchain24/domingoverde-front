// src/components/ReviewList.jsx
import { useEffect, useState, useMemo } from "react";
import LanderReviewItem from "./LanderReviewItem.jsx";
import { useReviews } from "../../../context/ReviewsContext.jsx";
import Loader from "../../loader.jsx";
import { Star } from "lucide-react";

// Función de ayuda para generar la cadena de estrellas Unicode
const getStarIcons = (rating) => {
    // El carácter Unicode U+2B50 es una estrella sólida
    return '⭐'.repeat(rating);
}

export default function ReviewList() {
  const { reviews, getReviews, loading } = useReviews();
  
  const [filterRating, setFilterRating] = useState(null); 

  useEffect(() => {
    getReviews();
  }, []);

  // ⭐ Cálculo de Recuentos (Memoizado)
  const ratingCounts = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    if (reviews) {
      reviews.forEach(review => {
        const rating = Math.round(review.rating); 
        if (rating >= 1 && rating <= 5) {
          counts[rating] += 1;
        }
      });
    }
    return counts;
  }, [reviews]); 

  // Lógica de Filtrado
  const filteredReviews = reviews
    ? reviews.filter(review => {
        return filterRating === null || Math.round(review.rating) === filterRating;
      })
    : [];
    
  // Recálculo de totales y promedio con las reseñas FILTRADAS
  const totalReviewsFiltered = filteredReviews.length || 0;
  const averageRating =
    totalReviewsFiltered > 0
      ? (filteredReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsFiltered).toFixed(1)
      : 0;
      
  const totalReviewsAll = reviews?.length || 0;
  
  return (
    <div className="review-home-container">
      <div className="landing-review-list">
        {loading ? (
          <Loader />
        ) : (
          filteredReviews.map((r) => <LanderReviewItem key={r._id} review={r} />)
        )}
        
        {!loading && filteredReviews.length === 0 && reviews?.length > 0 && (
          <p className="no-reviews-message">
            No hay reseñas con {filterRating} estrella(s).
          </p>
        )}
      </div>
    </div>
  );
}