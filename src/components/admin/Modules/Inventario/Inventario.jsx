import { useState, useEffect } from "react";
import InventarioTabla from "./InventarioTabla";
import { useOrders } from "../../../../context/OrdersContext";
import { usePurchases } from "../../../../context/PurchasesContext";
import Loader from "../../../loader";


export default function Inventario() {
  const { orders, getOrders, loading: loadingOrders } = useOrders();
  const { purchases, getPurchases, loading: loadingPurchases } = usePurchases();
  const [productos, setProductos] = useState([]);

  // Helper to get the effective sale price
  const getPrecioFinal = (producto) =>
    producto.precioVenta > 0 ? producto.precioVenta : producto.precioCompra;

  // Llamado a la API para obtener ventas y compras
  useEffect(() => {
    getOrders();
    getPurchases();
  }, []);


  // Calcular inventario
  useEffect(() => {
    if ((!orders || orders.length === 0) && (!purchases || purchases.length === 0)) return;

    const inventario = {};

    // 1. Recorrer compras → sumar cantidades y guardar precioCompra
    purchases.forEach((compra) => {
      compra.productos.forEach((p) => {
        if (!inventario[p.nombre]) {
          inventario[p.nombre] = {
            nombre: p.nombre,
            cantidad: 0,
            precioCompra: p.precio || 0,
            precioVenta: 0,
          };
        }
        inventario[p.nombre].cantidad += p.cantidad;
        inventario[p.nombre].precioCompra = p.precio; // último precio registrado
      });
    });

    // 2. Recorrer ventas → restar cantidades y guardar precioVenta
    orders.forEach((venta) => {
      venta.productos.forEach((p) => {
        if (!inventario[p.nombre]) {
          inventario[p.nombre] = {
            nombre: p.nombre,
            cantidad: 0,
            precioCompra: 0,
            precioVenta: p.precio || 0,
          };
        }
        inventario[p.nombre].cantidad -= p.cantidad;
        inventario[p.nombre].precioVenta = p.precio; // último precio registrado
      });
    });

    setProductos(Object.values(inventario));
  }, [orders, purchases]);

  // 👉 Calcular stock total a precio de venta
  const stockTotalVenta = productos.reduce(
    (acc, p) => acc + p.cantidad * getPrecioFinal(p),
    0
  );

  // Función formateo CLP
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
