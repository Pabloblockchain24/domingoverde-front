export default function VentasTabla({ventas, onEditModal, onDeleteVenta, onActualizarEstadoEntrega, onActualizarEstadoPago}) {
  return (
    <table>
      <thead>
        <tr>
          <th>N° venta</th>
          <th>Cliente</th>
          <th>Celular</th>
          <th>Dirección</th>
          <th>Productos</th>
          <th>Total</th>
          <th>Pago</th>
          <th>Estado entrega</th>
          <th>Estado pago</th>
          <th>Fecha Venta</th>
          <th>Hora Entrega</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map((venta, idx) => {
          const fechaVenta = new Date(venta.fechaVenta);
          const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

          const dia = String(fechaVenta.getUTCDate()).padStart(2, "0");
          const mes = meses[fechaVenta.getUTCMonth()];

          const fechaVentaFormateada = `${dia}-${mes}`;
          const fechaEntrega = new Date(venta.createdAt);
          fechaEntrega.setDate(fechaEntrega.getDate() + 1);

          return (
            <tr key={venta._id || `local-${idx}`}>
              <td>{venta.nVenta}</td>
              <td>
                {venta.nombre} {venta.apellido}
              </td>
              <td>{venta.celular}</td>
              <td>{venta.direccion}</td>
              <td>
                <ul>
                  {venta.productos?.map((p, i) => (
                    <li key={i}>
                      {p.nombre} (${p.precio}) x {p.cantidad}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${venta.total}</td>
              <td>{venta.metodoPago}</td>
              <td>
                <select
                  className={`estado ${venta.estadoEntrega}`}
                  value={venta.estadoEntrega}
                  onChange={(e) =>
                    onActualizarEstadoEntrega(venta._id, e.target.value)
                  }
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="fallida">Fallida</option>
                  <option value="entregado">Entregado</option>
                </select>
              </td>
              <td>
                <select
                  className={`estado ${venta.estadoPago}`}
                  value={venta.estadoPago}
                  onChange={(e) =>
                    onActualizarEstadoPago(venta._id, e.target.value)
                  }
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="pagado">Pagado</option>
                </select>
              </td>
              <td>{fechaVentaFormateada.toLocaleString()}</td>
              <td>{venta.horaEntrega}</td>
              <td className="button-actions">
                <button onClick={() => onEditModal(venta)}>✏️</button>
                <button onClick={() => onDeleteVenta(venta._id)}>🗑️</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
