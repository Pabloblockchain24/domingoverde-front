import { createContext, useContext, useState } from "react";
import { getFeaturedProductsByApi, getAllProductsByApi } from "../api/products";

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductsProvider");
  return context;
};

export function ProductsProvider({ children }) {
  const [featured, setFeatured] = useState([]);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(false);

  const getFeaturedProducts = async () => {
    setLoading(true);
    try {
      const res = await getFeaturedProductsByApi();
      setFeatured(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProductsByApi();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductsContext.Provider
      value={{ featured,products, getAllProducts, loading, getFeaturedProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
