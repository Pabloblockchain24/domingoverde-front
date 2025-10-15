import { useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";
import FeaturedItem from "./featuredItem/FeaturedItem";
import Loader from "../loader";
import Glider from "glider-js";
import "glider-js/glider.min.css";

export default function FeaturedProductsContent() {
  const { featured, loading, getFeaturedProducts } = useProducts();

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  useEffect(() => {
    if (!featured.length) return;

    const gliderEl = document.querySelector(".glider");

    // Evitar reinicializar el carrusel si ya existe
    if (gliderEl && !gliderEl.classList.contains("glider-initialized")) {
      const glider = new Glider(gliderEl, {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        arrows: {
          prev: ".glider-prev",
          next: ".glider-next",
        },
        responsive: [
          {
            // 🔹 Móviles pequeños
            breakpoint: 420,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            // 🔹 Tablets
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            // 🔹 Escritorio grande
            breakpoint: 1440,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
        ],
      });

      // Limpiar glider al desmontar
      return () => {
        glider.destroy();
      };
    }
  }, [featured]);

  if (loading) return <Loader />;
  if (!featured.length) return <p>No hay productos destacados en este momento.</p>;

  return (
    <div className="glider-container">
      <div className="glider">
        {featured.map((product) => (
          <FeaturedItem
            key={product._id}
            img={product.image}
            title={product.title}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>

      {/* Flechas navegación */}
      <button aria-label="Anterior" className="glider-prev custom-arrow" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button aria-label="Siguiente" className="glider-next custom-arrow" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
