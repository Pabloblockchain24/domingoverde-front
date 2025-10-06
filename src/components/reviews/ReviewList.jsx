import { useEffect } from "react";
import ReviewItem from "./ReviewItem.jsx";
import { useReviews } from "../../context/ReviewsContext.jsx";
import Loader from "../loader.jsx";
import { Star } from "lucide-react";


export default function ReviewList() {
  const { reviews, getReviews, loading } = useReviews();

  useEffect(() => {
    getReviews();
  }, []);

  const totalReviews = reviews?.length || 0;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : 0;


  return (
    <div className="review-container">
      <h2> 🔍 Reseñas </h2>
      <p className="review-subtitle"> Reseñas ({totalReviews}) : {averageRating} <Star className="star-title"/> </p>
      <div className="review-list">
        {loading ? (
          <Loader />
        ) : (
          reviews.map((r) => <ReviewItem key={r._id} review={r} />)
        )}
      </div>
    </div>
  );
}
