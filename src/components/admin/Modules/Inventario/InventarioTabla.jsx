export default function InventarioTabla({ productos }) {
  const formatCurrency = (value) => `$${value.toLocaleString("es-CL")}`;
  const getPrecioFinal = (producto) =>
  producto.precioVenta > 0 ? producto.precioVenta : producto.precioCompra;
  return (
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad [Kg]</th>
          <th>Precio compra (u.)</th>
          <th>Precio venta (u.)</th>
          <th>Valor total compra</th>
          <th>Valor total venta</th>
          <th>Utilidad por unidad</th>
          <th>Margen %</th>
          <th>Ganancia potencial</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto, idx) => {
          const valorCompra = producto.cantidad * producto.precioCompra;
          const valorVenta = producto.cantidad * getPrecioFinal(producto);

          const utilidadUnidad = getPrecioFinal(producto) - producto.precioCompra;
          const gananciaPotencial = utilidadUnidad * producto.cantidad;
          const margen =
            producto.precioCompra > 0
              ? ((utilidadUnidad / producto.precioCompra) * 100).toFixed(1)
              : "0";

          return (
            <tr key={idx}>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>{formatCurrency(producto.precioCompra)}</td>
              <td>{formatCurrency(getPrecioFinal(producto))}</td>
              <td>{formatCurrency(valorCompra)}</td>
              <td>{formatCurrency(valorVenta)}</td>
              <td>{formatCurrency(utilidadUnidad)}</td>
              <td>{margen}%</td>
              <td>{formatCurrency(gananciaPotencial)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
