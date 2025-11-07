import { ProductsProvider } from "../../context/ProductsContext.jsx";
import { ReviewsProvider } from "../../context/ReviewsContext.jsx";
import ProductList from "./ProductList.jsx";

export default function ProductsWrapper() {
  return (
    <ReviewsProvider>
      <ProductsProvider>
        <ProductList />
      </ProductsProvider>
    </ReviewsProvider>
  );
}
