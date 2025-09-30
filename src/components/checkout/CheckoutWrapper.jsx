import { OrdersProvider } from "../../context/OrdersContext.jsx";
import CheckoutPage from "./CheckoutPage.jsx"

export default function CheckoutWrapper() {
    return (
        <OrdersProvider>
            <CheckoutPage />
        </OrdersProvider>
    );
}
