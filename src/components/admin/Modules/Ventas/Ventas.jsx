import { useEffect, useState } from "react";
import { useOrders } from "../../../../context/OrdersContext";
import Loader from "../../../loader";

import VentaModal from "./VentaModal";
import VentasTabla from "./VentasTabla";

export default function Ventas() {
  const { orders, getOrders, deleteOrder, updateOrderEntrega, updateOrderPago, loading } = useOrders();

  useEffect(() => {
    getOrders();
  }, []);

  // Estados locales solo para filtros
  const [filteredVentas, setFilteredVentas] = useState([]);
  const [selectedVenta, setSelectedVenta] = useState(null);

  const [estadoFilter, setEstadoFilter] = useState("");
  const [fechaPedidoDesde, setFechaPedidoDesde] = useState("");
  const [fechaPedidoHasta, setFechaPedidoHasta] = useState("");
  const [fechaEntregaDesde, setFechaEntregaDesde] = useState("");
  const [fechaEntregaHasta, setFechaEntregaHasta] = useState("");

  const [showModal, setShowModal] = useState(false);

  // Filtrado dinámico basado en orders del contexto
  useEffect(() => {
    let filtered = [...orders];
    if (estadoFilter)
      filtered = filtered.filter((o) => o.estadoEntrega === estadoFilter);
    if (fechaPedidoDesde)
      filtered = filtered.filter(
        (o) => new Date(o.createdAt) >= new Date(fechaPedidoDesde)
      );
    if (fechaPedidoHasta)
      filtered = filtered.filter(
        (o) => new Date(o.createdAt) <= new Date(fechaPedidoHasta)
      );
    if (fechaEntregaDesde)
      filtered = filtered.filter((o) => {
        const fechaEntrega = new Date(o.createdAt);
        fechaEntrega.setDate(fechaEntrega.getDate() + 1);
        return fechaEntrega >= new Date(fechaEntregaDesde);
      });
    if (fechaEntregaHasta)
      filtered = filtered.filter((o) => {
        const fechaEntrega = new Date(o.createdAt);
        fechaEntrega.setDate(fechaEntrega.getDate() + 1);
        return fechaEntrega <= new Date(fechaEntregaHasta);
      });

    setFilteredVentas(filtered);
  }, [
    estadoFilter,
    fechaPedidoDesde,
    fechaPedidoHasta,
    fechaEntregaDesde,
    fechaEntregaHasta,
    orders,
  ]);

  // guardar venta
  const handleGuardarVenta = async () => {
    await getOrders(); // refrescamos desde el backend
    setShowModal(false);
  };

  // Eliminar venta
  const handleEliminarVenta = async (ventaId) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta orden?")) return;

    try {
      await deleteOrder(ventaId);
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la orden");
    }
  };

  // Actualizar estado de la orden (entrega o pago)
  const actualizarEstadoEntrega = async (ventaId, nuevoEstado) => {
    try {
      await updateOrderEntrega(ventaId, nuevoEstado);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el estado de entrega");
    }
  };

    const actualizarEstadoPago = async (ventaId, nuevoEstado) => {
      try {
        await updateOrderPago(ventaId, nuevoEstado);
      } catch (error) {
        console.error(error);
        alert("Error al actualizar el estado de pago");
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
              Fecha Pedido Desde:
              <input
                type="date"
                value={fechaPedidoDesde}
                onChange={(e) => setFechaPedidoDesde(e.target.value)}
              />
            </label>
            <label>
              Fecha Pedido Hasta:
              <input
                type="date"
                value={fechaPedidoHasta}
                onChange={(e) => setFechaPedidoHasta(e.target.value)}
              />
            </label>
            <label>
              Fecha Entrega Desde:
              <input
                type="date"
                value={fechaEntregaDesde}
                onChange={(e) => setFechaEntregaDesde(e.target.value)}
              />
            </label>
            <label>
              Fecha Entrega Hasta:
              <input
                type="date"
                value={fechaEntregaHasta}
                onChange={(e) => setFechaEntregaHasta(e.target.value)}
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
