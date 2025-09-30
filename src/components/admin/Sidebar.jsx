import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ activeModule, setActiveModule }) {
  const [isOpen, setIsOpen] = useState(true); // controla si se muestra u oculta
  const { logout } = useAuth(); // usar logout del contexto
  const modules = ["ventas", "compras", "inventario", "marketing", "metricas"];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Botón para ocultar/mostrar */}
      <button className="toggle-btn" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "←" : "→"}
      </button>
      <h3>Domingo Verde</h3>

      {/* Contenido del sidebar */}
      {isOpen && (
        <>
          <ul>
            {modules.map((mod) => (
              <li
                key={mod}
                className={activeModule === mod ? "active" : ""}
                onClick={() => setActiveModule(mod)}
              >
                {mod.charAt(0).toUpperCase() + mod.slice(1)}
              </li>
            ))}
          </ul>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}
