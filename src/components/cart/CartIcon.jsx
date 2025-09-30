import { useCartStore } from "../../store/cartStore";

export default function CartIcon() {
  const cart = useCartStore((state) => state.cart);

  return (
    <a href="/cart" className="cart-icon">
      <i className="fas fa-shopping-cart"></i>
      <span className="badge">{cart.length}</span>
    </a>
  );
}
