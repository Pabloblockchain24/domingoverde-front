import { useCartStore } from "../../store/cartStore";

export default function CartWidget() {
  const cartItems = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.cantidad,
    0
  );

  const handleDecrease = (_id, cantidad) => {
    if (cantidad > 1) {
      updateQuantity(_id, cantidad - 1);
    }
  };

  const handleIncrease = (_id, cantidad) => {
    updateQuantity(_id, cantidad + 1);
  };

  return (
    <div className="cart-widget">
      <h3>🛒 Tu Carrito</h3>

      {cartItems.length === 0 ? (
        <p className="empty">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="item-info">
                  <strong>{item.title}</strong>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(item._id, item.cantidad)}>-</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => handleIncrease(item._id, item.cantidad)}>+</button>
                  </div>
                  <span className="price">${item.price * item.cantidad}</span>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total:</strong> ${total}
          </div>

          <a href="/checkout" className="checkout-btn">
            Ir al Checkout
          </a>
        </>
      )}
    </div>
  );
}
