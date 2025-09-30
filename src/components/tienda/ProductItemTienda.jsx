import { useCartStore } from "../../store/cartStore.js"

export default function ProductItemTienda({ _id, title, price, image }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart({
      _id,
      title,
      price,
      image,
      quantity: 1,
    });
    alert(`✅ Se agregó "${title}" al carrito`);
  };

  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p className="price">${price}</p>
      <button onClick={handleAdd}>Agregar al carrito</button>
    </div>
  );
}
