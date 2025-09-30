export default function MarketingTable({ campañas, onEditar, onEliminar }) {
  return (
    <div className="marketing-table">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Inversión</th>
            <th>Alcance</th>
            <th>Leads</th>
            <th>Conversiones</th>
            <th>Retorno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {campañas.map((campaña) => (
            <tr key={campaña._id || campaña.id}>
              <td>{campaña.nombre}</td>
              <td className={`tipo ${campaña.tipo}`}>{campaña.tipo}</td>
              <td className={`actividad ${campaña.estado}`}>{campaña.estado}</td>
              <td>{new Date(campaña.inicio).toLocaleDateString()}</td>
              <td>{new Date(campaña.fin).toLocaleDateString()}</td>
              <td>{campaña.inversion?.toLocaleString("es-CL")}</td>
              <td>{campaña.alcance?.toLocaleString("es-CL")}</td>
              <td>{campaña.leads}</td>
              <td>{campaña.conversiones}</td>
              <td>{campaña.retorno?.toLocaleString("es-CL")}</td>
              <td className="acciones">
                <button
                  className="btn-editar"
                  onClick={() => onEditar(campaña)}
                >
                  Editar
                </button>
                <button
                  className="btn-eliminar"
                  onClick={() => onEliminar(campaña._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
