import { useEffect, useState } from "react";
import { useOrders } from "../../../../context/OrdersContext";
import Swal from "sweetalert2";

export default function VentaModal({ onClose, ventaAEditar, onGuardar }) {

  const { createOrder, editOrder } = useOrders();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    direccion: "",
    productos: [{ nombre: "", precio: 0, cantidad: 1 }],
    total: 0,
    metodoPago: "efectivo",
    horaEntrega: "",
    fechaVenta: ""
  });

  // Si se recibe una venta para editar, se llena el formulario con sus datos
  useEffect(() => {
    if (ventaAEditar) {
      const copiaProductos = ventaAEditar.productos.map((p) => ({ ...p }));
      setFormData({ ...ventaAEditar, productos: copiaProductos });
    }
  }, [ventaAEditar]);
  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejo de cambios en los productos
  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...formData.productos];
    nuevosProductos[index][field] =
      field === "precio" || field === "cantidad" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, productos: nuevosProductos }));
    calcularTotal(nuevosProductos);
  };

  // Funciones para agregar y eliminar productos
  const agregarProducto = () => {
    setFormData((prev) => ({
      ...prev,
      productos: [...prev.productos, { nombre: "", precio: 0, cantidad: 0 }],
    }));
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = formData.productos.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, productos: nuevosProductos }));
    calcularTotal(nuevosProductos);
  };

  // Calcular total de la venta
  const calcularTotal = (productos) => {
    const total = productos.reduce(
      (acc, p) => acc + (Number(p.precio) || 0) * (Number(p.cantidad) || 0),
      0
    );
    setFormData((prev) => ({ ...prev, total }));
  };

  // Recalcular total cuando cambian los productos
  useEffect(() => {
    calcularTotal(formData.productos);
  }, [formData.productos]);

  // Manejo de envío del formulario (llamada a la API hay que sacarla de aqui)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Crea un payload limpio (sin _id en productos)
    const payload = {
      ...formData,
      productos: formData.productos.map(({ _id, ...rest }) => rest),
    };

    try {
      let data;
      if (ventaAEditar) {
        data = await editOrder(ventaAEditar._id, payload);
         Swal.fire("¡Guardado!", "Los cambios se guardaron correctamente.", "success");
      } else {
        data = await createOrder(payload);
        Swal.fire("¡Creado!", "La venta se creó exitosamente.", "success");
      }
      onGuardar(data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Hubo un problema al guardar la venta.", "error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{ventaAEditar ? "Editar Venta" : "Nueva Venta"}</h2>
        <form onSubmit={handleSubmit} className="venta-form">
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
            Apellido:
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Celular:
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Dirección:
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </label>

          <div className="productos">
            <h3>Productos</h3>
            {formData.productos.map((producto, index) => (
              <div key={index} className="producto-item">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={producto.nombre || ""}
                  onChange={(e) =>
                    handleProductoChange(index, "nombre", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Precio"
                  value={producto.precio === 0 ? "" : producto.precio}
                  onChange={(e) =>
                    handleProductoChange(index, "precio", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={producto.cantidad === 0 ? "" : producto.cantidad}
                  onChange={(e) =>
                    handleProductoChange(index, "cantidad", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => eliminarProducto(index)}
                  disabled={formData.productos.length === 1}
                >
                  ❌
                </button>
              </div>
            ))}
            <button type="button" onClick={agregarProducto}>
              ➕ Agregar Producto
            </button>
          </div>

          <label>
            Total:
            <input type="number" value={formData.total} readOnly />
          </label>

          <label>
            Método de Pago:
            <select
              name="metodoPago"
              value={formData.metodoPago}
              onChange={handleChange}
            >
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </label>

          <label>
            Hora de Entrega:
            <input
              type="time"
              name="horaEntrega"
              value={formData.horaEntrega}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Fecha Venta:
            <input
              type="date"
              name="fechaVenta"
              value={formData.fechaVenta}
              onChange={handleChange}
              required
            />
          </label>


          <div className="modal-actions">
            <button type="submit" className="btn-primary">
              {ventaAEditar ? "Guardar Cambios" : "Crear Venta"}
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
