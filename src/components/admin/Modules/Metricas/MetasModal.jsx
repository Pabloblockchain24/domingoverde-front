import { useState } from "react";

export default function MetasModal({ metas, onClose, onSave }) {
  const [metaSemanal, setMetaSemanal] = useState(
    metas.find((m) => m.name === "semanal")?.value || 0
  );
  const [metaMensual, setMetaMensual] = useState(
    metas.find((m) => m.name === "mensual")?.value || 0
  );

  const handleSave = () => {
    onSave({ semanal: metaSemanal, mensual: metaMensual });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Definir metas</h2>
        <div className="modal-content">
          <label>
            Meta semanal:
            <input
              type="number"
              value={metaSemanal}
              onChange={(e) => setMetaSemanal(Number(e.target.value))}
            />
          </label>
          <label>
            Meta mensual:
            <input
              type="number"
              value={metaMensual}
              onChange={(e) => setMetaMensual(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
