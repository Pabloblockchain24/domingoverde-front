import { useEffect, useState } from "react";
import MetasChart from "./MetasChart";
import VentasSemanalesChart from "./VentasSemanalesChart";
import MetasModal from "./MetasModal";
import {
  parseISO,
  isSameWeek,
  isSameMonth,
  startOfWeek,
  format,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { es } from "date-fns/locale";

import { useOrders } from "../../../../context/OrdersContext";
import { useGoals } from "../../../../context/GoalsContext";
import Loader from "../../../loader";

function calcularVentasSemana(ventas) {
  const ahora = new Date();
  return ventas.reduce((total, venta) => {
    const fechaVenta = parseISO(venta.createdAt);
    if (isSameWeek(fechaVenta, ahora, { weekStartsOn: 1, locale: es })) {
      const subtotal = venta.productos.reduce(
        (acc, p) => acc + p.precio * p.cantidad,
        0
      );
      return total + subtotal;
    }
    return total;
  }, 0);
}
function calcularVentasMes(ventas) {
  const ahora = new Date();
  return ventas.reduce((total, venta) => {
    const fechaVenta = parseISO(venta.createdAt);
    if (isSameMonth(fechaVenta, ahora)) {
      const subtotal = venta.productos.reduce(
        (acc, p) => acc + p.precio * p.cantidad,
        0
      );
      return total + subtotal;
    }
    return total;
  }, 0);
}

export default function Metricas() {

  const { orders, getOrders, loading: loadingOrders } = useOrders();
  const { goals, getGoals, updateGoal, loading: loadingGoals } = useGoals();
  const [showModal, setShowModal] = useState(false);
  const hoy = new Date();

  useEffect(() => {
    getOrders();
    getGoals();
  }, []);

    if (loadingOrders || loadingGoals) {
    return <Loader />;
  }

  const totalSemana = calcularVentasSemana(orders);
  const totalMes = calcularVentasMes(orders);
  const formatCurrency = (value) => `$${value.toLocaleString("es-CL")}`;
  const primerDiaSemana = startOfWeek(hoy, { weekStartsOn: 1, locale: es });
  const primerDiaFormateado = format(primerDiaSemana, "dd-MM", { locale: es });
  const ultimoDiaSemana = endOfWeek(hoy, { weekStartsOn: 1, locale: es });
  const ultimoDiaFormateado = format(ultimoDiaSemana, "dd-MM", { locale: es });
  const primerDiaMes = startOfMonth(hoy);
  const primerDiaMesFormateado = format(primerDiaMes, "dd-MM", { locale: es });
  const ultimoDiaMes = endOfMonth(hoy);
  const ultimoDiaMesFormateado = format(ultimoDiaMes, "dd-MM", { locale: es });

  const metaSemanal = goals.find((m) => m.name === "semanal")?.value || 0;
  const metaMensual = goals.find((m) => m.name === "mensual")?.value || 0;

  // =========================
  // Guardar metas en backend
  // =========================
  const handleSaveMetas = async ({ semanal, mensual }) => {
    const nuevasMetas = [
      { name: "semanal", value: semanal },
      { name: "mensual", value: mensual },
    ];

    try {
      for (const meta of nuevasMetas) {
        await updateGoal(meta.name, meta.value);
      }
      await getGoals();
    } catch (err) {
      console.error("Error al guardar metas:", err);
    }
  };

  return (
    <div className="metricas-dashboard">
      <h2>Métricas</h2>

      <div className="metas-section">
        <div>
          <h3>Ventas</h3>
          
          <button onClick={() => setShowModal(true)} className="btn-definir-metas">
            Definir metas
          </button>
          <div className="resumen-cards">
            <div>
              <h4>
                <span>Venta semanal: {formatCurrency(totalSemana)} </span> (
                {primerDiaFormateado} al {ultimoDiaFormateado})
              </h4>
              <h4>
                <span>Venta mensual: {formatCurrency(totalMes)} </span>(
                {primerDiaMesFormateado} al {ultimoDiaMesFormateado})
              </h4>
            </div>
            <div>
              <h4>
                <span>Meta semanal: {formatCurrency(metaSemanal)}</span> (
                {primerDiaFormateado} al {ultimoDiaFormateado})
              </h4>
              <h4>
                <span>Meta mensual: {formatCurrency(metaMensual)}</span> (
                {primerDiaMesFormateado} al {ultimoDiaMesFormateado})
              </h4>
            </div>
          </div>
        </div>

        <div className="metas-charts">
          <MetasChart
            client:load
            metaMensual={metaSemanal}
            ventasActuales={totalSemana}
            titulo="Ventas Semanales"
          />
          <MetasChart
            client:load
            metaMensual={metaMensual}
            ventasActuales={totalMes}
            titulo="Ventas Mensuales"
          />
        </div>
        <div className="ventas-semanales">
          <VentasSemanalesChart ventas={orders} />
        </div>
      </div>

      {showModal && (
        <MetasModal
          metas={goals}
          onClose={() => setShowModal(false)}
          onSave={handleSaveMetas}
        />
      )}
    </div>
  );
}
