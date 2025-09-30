import { ReviewsProvider } from "../../context/ReviewsContext.jsx";
import ReviewList from "./ReviewList.jsx"

export default function ReviewWrapper() {
    return (
        <ReviewsProvider>
            <ReviewList />
        </ReviewsProvider>
    );
}
