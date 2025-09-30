import { ProductsProvider } from "../../context/ProductsContext.jsx";
import FeaturedProductsContent from "./FeaturedProductsContents.jsx";

export default function FeaturedProductsWrapper() {
  return (
    <ProductsProvider>
      <FeaturedProductsContent />
    </ProductsProvider>
  );
}
