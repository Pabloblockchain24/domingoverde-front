import { useState, useEffect } from "react";

export default function MarketingModal({ campañaAEditar, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "Concurso",
    inicio: "",
    fin: "",
    inversion: 0,
    alcance: 0,
    leads: 0,
    conversiones: 0,
    retorno: 0,
    estado: "Activa",
  });

  useEffect(() => {
    if (campañaAEditar) {
      setFormData({
        ...campañaAEditar,
        inicio: campañaAEditar.inicio
          ? new Date(campañaAEditar.inicio).toISOString().split("T")[0]
          : "",
        fin: campañaAEditar.fin
          ? new Date(campañaAEditar.fin).toISOString().split("T")[0]
          : "",
      });
    }
  }, [campañaAEditar]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{campañaAEditar ? "Editar Campaña" : "Crear Campaña"}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Tipo:
            <select name="tipo" value={formData.tipo} onChange={handleChange}>
              <option>Concurso</option>
              <option>Google Ads</option>
              <option>Amigos</option>
              <option>WhatsApp</option>
              <option>Visita Local</option>
              <option>Marketplace</option>
            </select>
          </label>

          <label>
            Inicio:
            <input
              type="date"
              name="inicio"
              value={formData.inicio}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Fin:
            <input
              type="date"
              name="fin"
              value={formData.fin}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Inversión:
            <input
              type="number"
              name="inversion"
              value={formData.inversion}
              onChange={handleChange}
            />
          </label>

          <label>
            Alcance:
            <input
              type="number"
              name="alcance"
              value={formData.alcance}
              onChange={handleChange}
            />
          </label>

          <label>
            Leads:
            <input
              type="number"
              name="leads"
              value={formData.leads}
              onChange={handleChange}
            />
          </label>

          <label>
            Conversiones:
            <input
              type="number"
              name="conversiones"
              value={formData.conversiones}
              onChange={handleChange}
            />
          </label>

          <label>
            Retorno:
            <input
              type="number"
              name="retorno"
              value={formData.retorno}
              onChange={handleChange}
            />
          </label>

          <label>
            Estado:
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <option>Activa</option>
              <option>Pausada</option>
              <option>Finalizada</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="submit">
              {campañaAEditar ? "Guardar Cambios" : "Crear Campaña"}
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
