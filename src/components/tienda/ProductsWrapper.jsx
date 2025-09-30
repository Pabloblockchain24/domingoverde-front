import { ProductsProvider } from "../../context/ProductsContext.jsx";
import ProductList from "./ProductList.jsx"

export default function ProductsWrapper() {
    return (
        <ProductsProvider>
            <ProductList />
        </ProductsProvider>
    );
}
