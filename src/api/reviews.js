import axios from "./axios"

export const getReviewsByApi = () => axios.get("/reviews");
export const createReviewByApi = async (data) => {
  const isFormData = data instanceof FormData;

  return axios.post("/reviews", data, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" },
  });
};


export const updateReviewByApi = (reviewId, data) => axios.patch(`/reviews/${reviewId}`, data);
export const deleteReviewByApi = (reviewId) => axios.delete(`/reviews/${reviewId}`);

export const getReviewByTokenByApi = (token) => axios.get(`/reviews/${token}`);

