export default function VentasTabla({
  ventas,
  onEditModal,
  onDeleteVenta,
  onActualizarEstadoEntrega,
  onActualizarEstadoPago,
  onGenerarReviewToken,
}) {
  return (
    <table className="ventas-tabla">
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
          <th>Token Review</th>
          <th>¿Order tiene un review?</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map((venta, idx) => {
          const fechaVenta = new Date(venta.fechaVenta);
          const meses = [
            "ene",
            "feb",
            "mar",
            "abr",
            "may",
            "jun",
            "jul",
            "ago",
            "sep",
            "oct",
            "nov",
            "dic",
          ];
          const dia = String(fechaVenta.getUTCDate()).padStart(2, "0");
          const mes = meses[fechaVenta.getUTCMonth()];
          const fechaVentaFormateada = `${dia}-${mes}`;

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
              <td>{fechaVentaFormateada}</td>
              <td>{venta.horaEntrega}</td>
              <td>
                {venta.reviewToken ? (
                  <span className="token-activo">🟢 Activo</span>
                ) : (
                  <span className="token-inactivo">⚪ Sin token</span>
                )}
              </td>
              <td>
                {venta.orderReview ? (
                  <span className="review-hecho">✅</span>
                ) : (
                  <span className="review-pendiente">❌</span>
                )}
              </td>
              <td className="button-actions">
                <button onClick={() => onEditModal(venta)}>✏️</button>
                <button onClick={() => onDeleteVenta(venta._id)}>🗑️</button>
                <button
                  className={`btn-token ${venta.reviewToken ? "activo" : ""}`}
                  onClick={() => onGenerarReviewToken(venta._id)}
                  title={
                    venta.reviewToken
                      ? "Regenerar token de review"
                      : "Generar token de review"
                  }
                >
                  {venta.reviewToken ? "♻️" : "🏷️"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}