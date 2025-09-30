import axios from "./axios"

export const getPurchasesByApi = () => axios.get("/purchases");
export const deletePurchaseByApi = (purchaseId) => axios.delete(`/purchases/${purchaseId}`);
export const updatePurchaseByApi = (purchaseId, data) => axios.patch(`/purchases/${purchaseId}`, data);
export const createPurchaseByApi = (data) => axios.post("/purchases", data);