import { createContext, useContext, useState } from "react";
import {
  getOrdersByApi,
  deleteOrderByApi,
  updateOrderByApi,
  createOrderByApi,
  generateReviewTokenByApi
} from "../api/orders";

const OrdersContext = createContext();

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context)
    throw new Error("useOrders must be used within a OrdersProvider");
  return context;
};

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const createOrder = async (data) => {
    setLoading(true);
    try {
      const res = await createOrderByApi(data);
      setOrders((prev) => [...prev, res.data]); // añadimos al estado local
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editOrder = async (orderId, data) => {
    setLoading(true);
    try {
      const res = await updateOrderByApi(orderId, data);
      const updated = res.data;
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, ...updated } : o))
      );
      return updated;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrdersByApi();
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const deleteOrder = async (orderId) => {
    setLoading(true);
    try {
      await deleteOrderByApi(orderId);
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const updateOrder = async (orderId, data) => {
    setLoading(true);
    try {
      const res = await updateOrderByApi(orderId, data);
      const updated = res.data;

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, ...updated } : o))
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderEntrega = (orderId, nuevoEstado) =>
    updateOrder(orderId, { estadoEntrega: nuevoEstado });

  const updateOrderPago = (orderId, nuevoEstado) =>
    updateOrder(orderId, { estadoPago: nuevoEstado });

  const generateReviewToken = async (orderId) => {
    setLoading(true);
    try {
      const res = await generateReviewTokenByApi(orderId);
      return res.data;
    } catch (error) {
      console.error("Error al generar el token de review:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  return (
    <OrdersContext.Provider
      value={{
        orders,
        createOrder,
        editOrder,
        getOrders,
        deleteOrder,
        updateOrderEntrega,
        updateOrderPago,
        generateReviewToken,
        loading,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
