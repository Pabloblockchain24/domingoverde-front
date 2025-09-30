import axios from "./axios"

export const getOrdersByApi = () => axios.get("/orders")
export const deleteOrderByApi = (orderId) => axios.delete(`/orders/${orderId}`)
export const updateOrderByApi = (orderId, data) => axios.patch(`/orders/${orderId}`, data)
export const createOrderByApi = (data) => axios.post("/orders", data);
