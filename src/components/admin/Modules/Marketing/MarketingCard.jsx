export default function MarketingCards({ campañas, onEditar, onEliminar }) {
  return (
    <div className="marketing-cards">
      {campañas.map((campaña) => (
        <div key={campaña._id} className="card">
          <h4>{campaña.nombre}</h4>

          <p>
            <strong>Tipo:</strong>{" "}
            <span className={`tipo ${campaña.tipo}`}>{campaña.tipo}</span>
          </p>

          <p>
            <strong>Estado:</strong>{" "}
            <span className={`estado ${campaña.estado}`}>{campaña.estado}</span>
          </p>

          <p>
            <strong>Fecha inicio:</strong> {new Date(campaña.inicio).toLocaleDateString()}
          </p>
          <p>
            <strong>Fecha fin:</strong> {new Date(campaña.fin).toLocaleDateString()}
          </p>

          <p>
            <strong>Costo campaña:</strong> {campaña.inversion?.toLocaleString("es-CL")}
          </p>
          <p>
            <strong>Alcance:</strong> {campaña.alcance?.toLocaleString("es-CL")}
          </p>
          <p>
            <strong>Leads:</strong> {campaña.leads}
          </p>
          <p>
            <strong>Conversiones:</strong> {campaña.conversiones}
          </p>
          <p>
            <strong>Retorno:</strong> {campaña.retorno?.toLocaleString("es-CL")}
          </p>

          {/* Si agregas más métricas */}
          {campaña.impresiones && (
            <p>
              <strong>Impresiones:</strong> {campaña.impresiones}
            </p>
          )}
          {campaña.clicks && (
            <p>
              <strong>Clicks:</strong> {campaña.clicks}
            </p>
          )}
          {campaña.conversionRate && (
            <p>
              <strong>Tasa de conversión:</strong> {campaña.conversionRate}%
            </p>
          )}

          <div className="card-actions">
            <button className="btn-editar" onClick={() => onEditar(campaña)}>
              Editar
            </button>
            <button
              className="btn-eliminar"
              onClick={() => onEliminar(campaña._id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
