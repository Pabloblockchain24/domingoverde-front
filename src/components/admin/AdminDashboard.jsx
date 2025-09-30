import { useState } from "react";
import Sidebar from "./Sidebar";
import Ventas from "./Modules/Ventas/Ventas";
import Compras from "./Modules/Compras/Compras";
import Metricas from "./Modules/Metricas/Metricas";
import Inventario from "./Modules/Inventario/Inventario";
import Marketing from "./Modules/Marketing/Marketing";

export default function AdminDashboard() {
  const [activeModule, setActiveModule] = useState("ventas");

  const renderModule = () => {
    switch (activeModule) {
      case "ventas":
        return <Ventas />;
      case "compras":
        return <Compras />;
      case "metricas":
        return <Metricas />;
      case "inventario":
        return <Inventario />;
      case "marketing":
        return <Marketing />;
      default:
        return <Ventas />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <div className="dashboard-content">
        {renderModule()}
      </div>
    </div>
  );
}
