import LanderPage from "./LanderPage.jsx"
import { ReviewsProvider } from "../../context/ReviewsContext.jsx";

export default function LanderWrapper() {
    return (
        <ReviewsProvider>
            <LanderPage />
        </ReviewsProvider>
    );
}
