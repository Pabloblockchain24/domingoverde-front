import { createContext, useContext, useState } from "react";
import {
  getPurchasesByApi,
  createPurchaseByApi,
  updatePurchaseByApi,
  deletePurchaseByApi,
} from "../api/purchases";

const PurchasesContext = createContext();

export const usePurchases = () => {
  const context = useContext(PurchasesContext);
  if (!context)
    throw new Error("usePurchases must be used within a PurchasesProvider");
  return context;
};

export function PurchasesProvider({ children }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPurchases = async () => {
    setLoading(true);
    try {
      const res = await getPurchasesByApi();
      setPurchases(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Crear una compra
  const createPurchase = async (purchaseData) => {
    setLoading(true);
    try {
      const res = await createPurchaseByApi(purchaseData);
      setPurchases((prev) => [...prev, res.data]);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar compra
  const updatePurchase = async (purchaseId, data) => {
    setLoading(true);
    try {
      const res = await updatePurchaseByApi(purchaseId, data);
      setPurchases((prev) =>
        prev.map((p) => (p._id === purchaseId ? res.data : p))
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar compra
  const deletePurchase = async (purchaseId) => {
    setLoading(true);
    try {
      await deletePurchaseByApi(purchaseId);
      setPurchases((prev) => prev.filter((p) => p._id !== purchaseId));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PurchasesContext.Provider
      value={{
        purchases,
        loading,
        getPurchases,
        createPurchase,
        updatePurchase,
        deletePurchase,
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
}
