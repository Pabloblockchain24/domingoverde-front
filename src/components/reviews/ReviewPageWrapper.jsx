import ReviewPage from "./ReviewPage.jsx";
import { ReviewsProvider } from "../../context/ReviewsContext.jsx";

export default function ReviewWrapper() {
  return (
    <ReviewsProvider>
      <ReviewPage />
    </ReviewsProvider>
  );
}
