import { useEffect } from "react";
import ReviewItem from "./ReviewItem.jsx";
import { useReviews } from "../../context/ReviewsContext.jsx";
import Loader from "../loader.jsx";

export default function ReviewList() {
  const { reviews, getReviews, loading } = useReviews();

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="review-container">
      <h2> 🔍 Reseñas </h2>
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
