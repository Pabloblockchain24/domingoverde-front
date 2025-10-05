import { useEffect, useState } from "react";
import { usePurchases } from "../../../../context/PurchasesContext";
import Swal from "sweetalert2";

export default function CompraModal({ onClose, compraAEditar, onGuardar }) {
  const { createPurchase, updatePurchase } = usePurchases();

  // Estado del formulario
  const [formData, setFormData] = useState({
    proveedor: "",
    productos: [{ nombre: "", precio: 0, cantidad: 1 }],
    total: 0,
    metodoPago: "efectivo",
    fechaCompra: "",
  });

  // Si se recibe una compra para editar, se llena el formulario con sus datos
  useEffect(() => {
    if (compraAEditar) {
      const copiaProductos = compraAEditar.productos.map((p) => ({ ...p }));
      setFormData({ ...compraAEditar, productos: copiaProductos });
    }
  }, [compraAEditar]);

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
      productos: [...prev.productos, { nombre: "", precio: 0, cantidad: 1 }],
    }));
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = formData.productos.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, productos: nuevosProductos }));
    calcularTotal(nuevosProductos);
  };

  // Calcular total de la compra
  const calcularTotal = (productos) => {
    const total = productos.reduce(
      (acc, p) => acc + (Number(p.precio) || 0) * (Number(p.cantidad) || 1),
      0
    );
    setFormData((prev) => ({ ...prev, total }));
  };

  useEffect(() => {
    calcularTotal(formData.productos);
  }, [formData.productos]);

  // Manejo de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      productos: formData.productos.map(({ _id, ...rest }) => rest),
    };

    try {
      if (compraAEditar) {
        await updatePurchase(compraAEditar._id, payload);
        Swal.fire({
          icon: "success",
          title: "¡Compra actualizada!",
          text: "La compra se actualizó correctamente.",
          confirmButtonColor: "#168300ff",
        });
      } else {
        await createPurchase(payload);
        Swal.fire({
          icon: "success",
          title: "¡Compra creada!",
          text: "La compra se registró correctamente.",
          confirmButtonColor: "#168300ff",
        });
      }
      onGuardar();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema al guardar la compra.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{compraAEditar ? "Editar Compra" : "Nueva Compra"}</h2>
        <form onSubmit={handleSubmit} className="compra-form">
          <label>
            Proveedor:
            <input
              type="text"
              name="proveedor"
              value={formData.proveedor}
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
                  value={producto.nombre}
                  onChange={(e) =>
                    handleProductoChange(index, "nombre", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Costo"
                  value={producto.precio === 0 ? "" : producto.precio}
                  onChange={(e) =>
                    handleProductoChange(index, "precio", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={producto.cantidad === 1 ? "" : producto.cantidad}
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
            Fecha compra:
            <input
              type="date"
              name="fechaCompra"
              value={formData.fechaCompra}
              onChange={handleChange}
              required
            />
          </label>

          <div className="modal-actions">
            <button type="submit" className="btn-primary">
              {compraAEditar ? "Guardar Cambios" : "Crear Compra"}
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
