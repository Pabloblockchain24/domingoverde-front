import { useState, useEffect } from "react";
import InventarioTabla from "./InventarioTabla";
import { useOrders } from "../../../../context/OrdersContext";
import { usePurchases } from "../../../../context/PurchasesContext";
import Loader from "../../../loader";

export default function Inventario() {
  const { orders, getOrders, loading: loadingOrders } = useOrders();
  const { purchases, getPurchases, loading: loadingPurchases } = usePurchases();
  const [productos, setProductos] = useState([]);

  // Helper para obtener el precio final
  const getPrecioFinal = (producto) =>
    producto.precioVenta > 0 ? producto.precioVenta : producto.precioCompra;

  useEffect(() => {
    getOrders();
    getPurchases();
  }, []);

  useEffect(() => {
  if ((!orders || orders.length === 0) && (!purchases || purchases.length === 0)) return;

  const inventario = {};

  // 1. Recorrer compras
  purchases.forEach((compra) => {
    compra.productos.forEach((p) => {
      const key = p.inventoryItem ? p.inventoryItem : p.nombre;
      const cantidadBase = (p.cantidad || 1);

      if (!inventario[key]) {
        inventario[key] = {
          nombre: key,
          cantidad: 0,
          precioCompra: p.precio || 0,
          precioVenta: 0,
        };
      }

      inventario[key].cantidad += cantidadBase;
      inventario[key].precioCompra = p.precio; // último precio registrado
    });
  });

  // 2. Recorrer ventas
  orders.forEach((venta) => {
    venta.productos.forEach((p) => {
      const key = p.inventoryItem ? p.inventoryItem : p.nombre;
      const cantidadBase = p.inventoryQuantity
        ? (p.cantidad || 0) * p.inventoryQuantity
        : (p.cantidad || 0);

      if (!inventario[key]) {
        inventario[key] = {
          nombre: key,
          cantidad: 0,
          precioCompra: 0,
          precioVenta: p.precio || 0,
        };
      }

      inventario[key].cantidad -= cantidadBase;
      inventario[key].precioVenta = p.precio; // último precio registrado
    });
  });

  // 🔥 Falta esto → convertir el objeto en array y setear al estado
  setProductos(Object.values(inventario));
}, [orders, purchases]); 

  // 👉 Calcular stock total a precio de venta
  const stockTotalVenta = productos.reduce(
    (acc, p) => acc + p.cantidad * getPrecioFinal(p),
    0
  );

  const formatCurrency = (value) => `$${value.toLocaleString("es-CL")}`;

  if (loadingOrders || loadingPurchases) {
    return <Loader size={60} color="#2e7d32" />;
  }

  return (
    <>
      <div className="inventario">
        <h2>Inventario</h2>
      </div>

      {/* Resumen */}
      <div className="inventario-resumen">
        <h3>Resumen</h3>
        <p>
          <strong>Stock total (precio de venta): </strong>
          {formatCurrency(stockTotalVenta)}
        </p>
      </div>
      <InventarioTabla productos={productos} />
    </>
  );
}
