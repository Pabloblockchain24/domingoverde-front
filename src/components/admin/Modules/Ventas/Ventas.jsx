import { useEffect, useState } from "react";
import { useOrders } from "../../../../context/OrdersContext";
import Loader from "../../../loader";
import Swal from "sweetalert2";

import VentaModal from "./VentaModal";
import VentasTabla from "./VentasTabla";

export default function Ventas() {
  const {
    orders,
    getOrders,
    deleteOrder,
    updateOrderEntrega,
    updateOrderPago,
    generateReviewToken,
    loading,
  } = useOrders();

  useEffect(() => {
    getOrders();
  }, []);

  // Estados locales solo para filtros
  const [filteredVentas, setFilteredVentas] = useState([]);
  const [selectedVenta, setSelectedVenta] = useState(null);

  const [estadoFilter, setEstadoFilter] = useState("");
  const [fechaVentaDesde, setFechaVentaDesde] = useState("");
  const [fechaVentaHasta, setFechaVentaHasta] = useState("");

  const [showModal, setShowModal] = useState(false);

  // Filtrado dinámico basado en orders del contexto
  useEffect(() => {
    let filtered = [...orders];
    if (estadoFilter)
      filtered = filtered.filter((o) => o.estadoEntrega === estadoFilter);
    if (fechaVentaDesde)
      filtered = filtered.filter(
        (o) => new Date(o.fechaVenta) >= new Date(fechaVentaDesde)
      );
    if (fechaVentaHasta)
      filtered = filtered.filter(
        (o) => new Date(o.fechaVenta) <= new Date(fechaVentaHasta)
      );

    setFilteredVentas(filtered);
  }, [estadoFilter, fechaVentaDesde, fechaVentaHasta, orders]);

  // guardar venta
  const handleGuardarVenta = async () => {
    await getOrders(); // refrescamos desde el backend
    setShowModal(false);
    Swal.fire("¡Guardado!", "La venta se guardó correctamente.", "success");
  };

  // Eliminar venta
  const handleEliminarVenta = async (ventaId) => {
    const result = await Swal.fire({
      title: "¿Seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;
    try {
      await deleteOrder(ventaId);
      Swal.fire("Eliminado", "La venta fue eliminada.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Ocurrió un error al eliminar la venta", "error");
    }
  };

  const handleGenerarReviewToken = async (ventaId) => {
    try {
      const data = await generateReviewToken(ventaId);

      Swal.fire({
        title: "Token de review generado ✅",
        html: `
        <p> ${data.reviewLink}</p>
      `,
        icon: "success",
        confirmButtonText: "Copiar link",
      }).then(() => {
        // Copiar link al portapapeles
        navigator.clipboard.writeText(data.reviewLink);
      });
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "Ocurrió un error al generar el token de review.",
        "error"
      );
    }
  };

  // Actualizar estado de la orden (entrega o pago)
  const actualizarEstadoEntrega = async (ventaId, nuevoEstado) => {
    try {
      await updateOrderEntrega(ventaId, nuevoEstado);
      Swal.fire(
        "Actualizado",
        "El estado de entrega fue actualizado.",
        "success"
      );
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar el estado de entrega", "error");
    }
  };

  const actualizarEstadoPago = async (ventaId, nuevoEstado) => {
    try {
      await updateOrderPago(ventaId, nuevoEstado);
      Swal.fire("Actualizado", "El estado de pago fue actualizado.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar el estado de pago", "error");
    }
  };

  // Manejo modal
  const openNewModal = () => {
    setSelectedVenta(null);
    setShowModal(true);
  };

  const openEditModal = (venta) => {
    setSelectedVenta(venta);
    setShowModal(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="ventas">
        <div className="ventas-header">
          <h2>Ventas</h2>
          <button className="btn-agregar" onClick={openNewModal}>
            + Nueva venta
          </button>
        </div>
      </div>
      <>
        {/* Filtros */}
        <div className="filters">
          <label>
            Estado entrega:
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="pendiente">pendiente</option>
              <option value="fallida">fallida</option>
              <option value="entregado">entregado</option>
            </select>
          </label>
          <label>
            Fecha Venta Desde:
            <input
              type="date"
              value={fechaVentaDesde}
              onChange={(e) => setFechaVentaDesde(e.target.value)}
            />
          </label>
          <label>
            Fecha Venta Hasta:
            <input
              type="date"
              value={fechaVentaHasta}
              onChange={(e) => setFechaVentaHasta(e.target.value)}
            />
          </label>
        </div>

        {/* Tabla */}
        <VentasTabla
          ventas={filteredVentas}
          onEditModal={openEditModal}
          onDeleteVenta={handleEliminarVenta}
          onActualizarEstadoEntrega={actualizarEstadoEntrega}
          onActualizarEstadoPago={actualizarEstadoPago}
          onGenerarReviewToken={handleGenerarReviewToken}
        />
      </>

      {/* Modal */}
      {showModal && (
        <VentaModal
          onClose={() => setShowModal(false)}
          ventaAEditar={selectedVenta}
          onGuardar={handleGuardarVenta}
        />
      )}
    </>
  );
}
