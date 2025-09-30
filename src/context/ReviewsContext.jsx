import { createContext, useContext, useState } from "react";
import {
    getReviewsByApi,
    createReviewByApi,
    updateReviewByApi,
    deleteReviewByApi,
} from "../api/reviews";

const ReviewsContext = createContext();

export const useReviews = () => {
    const context = useContext(ReviewsContext);
    if (!context)
    throw new Error("useReviews must be used within a ReviewsProvider");
  return context;
};


export const ReviewsProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const getReviews = async () => {
        setLoading(true);
        try {
            const res = await getReviewsByApi();
            setReviews(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const createReview = async (data) => {
        setLoading(true);
        try {
            const res = await createReviewByApi(data);
            setReviews((prev) => [...prev, res.data]);
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateReview = async (reviewId, data) => {
        setLoading(true);
        try {
            const res = await updateReviewByApi(reviewId, data);
            setReviews((prev) =>
                prev.map((r) => (r._id === reviewId ? res.data : r))
            );
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteReview = async (reviewId) => {
        setLoading(true);
        try {
            await deleteReviewByApi(reviewId);
            setReviews((prev) => prev.filter((r) => r._id !== reviewId));
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <ReviewsContext.Provider
            value={{ reviews, loading, getReviews, createReview, updateReview, deleteReview }}
        >
            {children}
        </ReviewsContext.Provider>
    );
};