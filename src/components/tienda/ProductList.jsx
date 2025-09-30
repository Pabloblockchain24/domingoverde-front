import { useEffect, useState } from "react";
import ProductItem from "./ProductItemTienda.jsx"; 
import { useProducts } from "../../context/ProductsContext.jsx";
import Loader from "../loader.jsx";

export default function ProductList() {
  const { products, getAllProducts, loading } = useProducts();
  const [categoria, setCategoria] = useState("Todos");

  useEffect(() => {
    getAllProducts();
  }, []);

  const categories = ["Todos", ...new Set(products.map((p) => p.category))];

  const filtered = categoria === "Todos"
    ? products
    : products.filter((p) => p.category === categoria);

  return (
    <main className="products-page">
      <h1>Nuestros Productos</h1>

      <div className="filters">
        <label>
          Filtrar por categoría:
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <section className="product-list">
          {filtered.map((product) => (
            <ProductItem key={product._id} {...product} />
          ))}
        </section>
      )}
    </main>
  );
}
