import { useEffect, useState } from "react";
import CompraModal from "./CompraModal";
import ComprasTabla from "./ComprasTabla";

import { usePurchases } from "../../../../context/PurchasesContext";
import Loader from "../../../loader";
import Swal from "sweetalert2";

export default function Compras() {
  // Datos de compras
  const { purchases, getPurchases, deletePurchase, updatePurchase, loading } =
    usePurchases();
  const [filteredCompras, setFilteredCompras] = useState([]);
  const [selectedCompra, setSelectedCompra] = useState(null);
  // Gestiona el modal
  const [showModal, setShowModal] = useState(false);

  // Datos de filtros
  const [estadoFilter, setEstadoFilter] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  useEffect(() => {
    getPurchases();
  }, []);

  // Filtrado dinámico
  useEffect(() => {
    let filtered = [...purchases];
    if (estadoFilter)
      filtered = filtered.filter((c) => c.estadoEntrega === estadoFilter);
    if (fechaDesde)
      filtered = filtered.filter(
        (c) => new Date(c.fechaCompra) >= new Date(fechaDesde)
      );
    if (fechaHasta)
      filtered = filtered.filter(
        (c) => new Date(c.fechaCompra) <= new Date(fechaHasta)
      );

    setFilteredCompras(filtered);
  }, [estadoFilter, fechaDesde, fechaHasta, purchases]);

  const handleGuardarCompra = async () => {
    await getPurchases(); // refrescamos desde el backend
    setShowModal(false);
  };

  // Eliminar compra
  const handleEliminarCompra = async (compraId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la compra permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#099404ff",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;
    try {
      await deletePurchase(compraId);
      Swal.fire({
        icon: "success",
        title: "Eliminada",
        text: "La compra fue eliminada correctamente.",
        cancelButtonColor: "#099404ff",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al eliminar la compra.",
        confirmButtonColor: "#d33",
      });
    }
  };

  // Actualizar estado de entrega
  const actualizarEstadoEntrega = async (compraId, nuevoEstado) => {
    try {
      await updatePurchase(compraId, { estadoEntrega: nuevoEstado });
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: "El estado de entrega fue actualizado.",
        confirmButtonColor: "#099404ff",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar el estado de entrega.",
      });
    }
  };

  // Actualizar estado de pago
  const actualizarEstadoPago = async (compraId, nuevoEstado) => {
    try {
      await updatePurchase(compraId, { estadoPago: nuevoEstado });
            Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: "El estado de pago fue actualizado.",
        confirmButtonColor: "#099404ff",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar el estado de pago.",
      });
    }    
  };

  // Manejo modal nueva compra
  const openNewModal = () => {
    setSelectedCompra(null);
    setShowModal(true);
  };

  // Manejo modal editar compra
  const openEditModal = (compra) => {
    setSelectedCompra(compra);
    setShowModal(true);
  };

  if (loading) {
    return <Loader size={60} color="#2e7d32" />;
  }

  return (
    <>
      {/* Header módulo compras */}
      <div className="compras">
        <div className="compras-header">
          <h2>Compras</h2>
          <button className="btn-agregar" onClick={openNewModal}>
            + Nueva compra
          </button>
        </div>
      </div>

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
            <option value="recibida">recibida</option>
            <option value="cancelada">cancelada</option>
          </select>
        </label>
        <label>
          Fecha Desde:
          <input
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
          />
        </label>
        <label>
          Fecha Hasta:
          <input
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
          />
        </label>
      </div>

      {/* Tabla compras */}
      <ComprasTabla
        compras={filteredCompras}
        onEditModal={openEditModal}
        onDeleteCompra={handleEliminarCompra}
        onActualizarEstadoEntrega={actualizarEstadoEntrega}
        onActualizarEstadoPago={actualizarEstadoPago}
      />

      {/* Modal */}
      {showModal && (
        <CompraModal
          onClose={() => setShowModal(false)}
          compraAEditar={selectedCompra}
          onGuardar={handleGuardarCompra}
        />
      )}
    </>
  );
}
