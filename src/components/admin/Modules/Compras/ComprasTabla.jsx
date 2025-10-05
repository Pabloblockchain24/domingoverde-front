export default function ComprasTabla({
  compras,
  onEditModal,
  onDeleteCompra,
  onActualizarEstadoEntrega,
  onActualizarEstadoPago,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>N° compra</th>
          <th>Proveedor</th>
          <th>Productos</th>
          <th>Total</th>
          <th>Método Pago</th>
          <th>Estado entrega</th>
          <th>Estado pago</th>
          <th>Fecha compra </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {compras.map((compra, idx) => {
          return (
            <tr key={compra._id || `local-${idx}`}>
              <td>{compra.nCompra}</td>
              <td>{compra.proveedor}</td>
              <td>
                <ul>
                  {compra.productos?.map((p, i) => (
                    <li key={i}>
                      {p.nombre} (${p.precio}) x {p.cantidad}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${compra.total}</td>
              <td>{compra.metodoPago}</td>
              <td>
                <select
                  className={`estado ${compra.estadoEntrega}`}
                  value={compra.estadoEntrega}
                  onChange={(e) =>
                    onActualizarEstadoEntrega(compra._id, e.target.value)
                  }
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="recibida">Recibido</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </td>
              <td>
                <select
                  className={`estado ${compra.estadoPago}`}
                  value={compra.estadoPago}
                  onChange={(e) =>
                    onActualizarEstadoPago(compra._id, e.target.value)
                  }
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="pagado">Pagado</option>
                </select>
              </td>
              <td>
                {new Date(compra.fechaCompra)
                  .toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    timeZone: "UTC", 
                  })
                  .replace(" ", "-")
                  .replace(".", "")}
              </td>
              <td className="button-actions">
                <button onClick={() => onEditModal(compra)}>✏️</button>
                <button onClick={() => onDeleteCompra(compra._id)}>🗑️</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
