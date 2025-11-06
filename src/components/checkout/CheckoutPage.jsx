import { useState, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import { useOrders } from "../../context/OrdersContext";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const { createOrder, loading } = useOrders();
  const cartItems = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const addToCart = useCartStore((state) => state.addToCart);

  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    direccion: "",
    horaEntrega: "",
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const productTitle = query.get("title");

    if (productTitle) {
      clearCart();

      let productData = null;

      if (productTitle === "palta-hass-3kg") {
        productData = {
          title: "Palta Hass Chilena - Malla 3kg",
          price: 10000,
          cantidad: 1,
          image: "/productos/palta_3.jpg",
        };
      } else if (productTitle === "palta-hass-1kg") {
        productData = {
          title: "Palta Hass Chilena - Malla 1kg",
          price: 3500,
          cantidad: 1,
          image: "/productos/palta_1.jpg",
        };
      }

      if (productData) {
        addToCart(productData);
      }
    }
  }, [addToCart, clearCart]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.cantidad || 1),
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (Object.values(form).some((val) => val.trim() === "")) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos de entrega.",
        confirmButtonColor: "#117c0dff",
      });
      return;
    }
    if (!/^\d{9}$/.test(form.celular)) {
      Swal.fire({
        icon: "error",
        title: "Número inválido",
        text: "El número de celular debe tener exactamente 9 dígitos.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    const payload = {
      ...form,
      metodoPago: paymentMethod,
      productos: cartItems.map((item) => ({
        nombre: item.title || item.name || "",
        precio: item.price,
        cantidad: item.cantidad || 1,
        inventoryItem: item.inventoryItem,
        inventoryQuantity: item.inventoryQuantity,
      })),
      total,
      ventaPagina: true,
    };

    try {
      await createOrder(payload);
      Swal.fire({
        icon: "success",
        title: "¡Compra realizada con éxito! 🎉",
        text: "Tu pedido ha sido recibido. Te contactaremos para coordinar la entrega.",
        confirmButtonColor: "#4CAF50",
      }).then(() => {
        clearCart();
        window.location.href = "/compraconfirmada";
      });
    } catch (error) {
      console.error("Checkout error:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear la orden",
        text: "Ocurrió un problema al procesar tu compra. Intenta nuevamente.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-page">
        {cartItems.length === 0 ? (
          <p>
            Tu carrito está vacío. <a href="/">Volver a la tienda</a>
          </p>
        ) : (
          <>
            <h2>Resumen de tu compra</h2>
            <ul className="checkout-list">
              {cartItems.map((item, index) => (
                <li key={index} className="checkout-item">
                  <img src={item.image} alt={item.title} className="item-img" />
                  <div className="checkout-item-info">
                    <span className="checkout-title">{item.title}</span>
                    <span className="checkout-qty">
                      ${item.price} x {item.cantidad || 1}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="checkout-total">
              <strong>Total:</strong> ${total}
            </div>

            <hr />

            <div className="checkout-section">
              <h3>🧾 Método de pago</h3>
              <div className="payment-options">
                <div
                  className={`payment-card ${
                    paymentMethod === "efectivo" ? "active" : ""
                  }`}
                  onClick={() => setPaymentMethod("efectivo")}
                >
                  <i className="fas fa-money-bill-wave"></i>
                  <span>Efectivo o transferencia en la entrega</span>
                </div>

                <div
                  className={`payment-card ${
                    paymentMethod === "tarjeta" ? "active" : ""
                  }disabled`}
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fas fa-credit-card"></i>
                  <span>Tarjeta débito/crédito (proximamente)</span>
                </div>
              </div>
            </div>

            <hr />

            <div className="checkout-section">
              <h3>📦 Datos de entrega</h3>

              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                autoComplete="given-name"
                value={form.nombre}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                autoComplete="family-name"
                value={form.apellido}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="celular"
                placeholder="Ej: 912345678"
                value={form.celular}
                onChange={handleInputChange}
                maxLength={9}
                pattern="[0-9]{9}"
                inputMode="numeric"
                required
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "Tab"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                autoComplete="street-address"
                value={form.direccion}
                onChange={handleInputChange}
              />

              <label htmlFor="horaEntrega" className="label">
                ¿Qué hora te acomoda?
                <small className="helper-text">
                  * Horario de entrega disponible: <strong>09:00</strong> a{" "}
                  <strong>19:00</strong>
                </small>
              </label>
              <select
                id="horaEntrega"
                name="horaEntrega"
                value={form.horaEntrega}
                onChange={handleInputChange}
                className="select-input"
              >
                <option value="">Selecciona una hora</option>
                {Array.from({ length: 11 }, (_, i) => {
                  const hour = 9 + i; // desde 9 hasta 19
                  const time = `${hour.toString().padStart(2, "0")}:00`;
                  return (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              className="finish-btn"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Finalizar compra"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
