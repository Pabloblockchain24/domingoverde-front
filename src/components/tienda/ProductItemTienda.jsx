import { useCartStore } from "../../store/cartStore.js"
import { toast } from "react-toastify";


export default function ProductItemTienda({ _id, title, price, image, inventoryItem, inventoryQuantity }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart({
      _id,
      title,
      price,
      image,
      quantity: 1,
      inventoryItem,
      inventoryQuantity
    });
    toast.success(`✅ "${title}" se agregó al carrito`);
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
