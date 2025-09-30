import axios from "./axios"

export const getReviewsByApi = () => axios.get("/reviews");
export const createReviewByApi = (data) => axios.post("/reviews", data);
export const updateReviewByApi = (reviewId, data) => axios.patch(`/reviews/${reviewId}`, data);
export const deleteReviewByApi = (reviewId) => axios.delete(`/reviews/${reviewId}`);
