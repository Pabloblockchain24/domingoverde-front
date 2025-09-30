import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { parseISO, startOfWeek, format, getWeek } from "date-fns";
import { es } from "date-fns/locale";

export default function VentasSemanalesChart({ ventas }) {
  // Agrupar ventas por semana
  const ventasPorSemana = ventas.reduce((acc, venta) => {
    const fechaVenta = parseISO(venta.createdAt);
    const inicioSemana = startOfWeek(fechaVenta, { weekStartsOn: 1, locale: es });
    const key = format(inicioSemana, "yyyy-MM-dd");

    const subtotal = venta.productos.reduce(
      (sum, p) => sum + p.precio * p.cantidad,
      0
    );

    acc[key] = (acc[key] || 0) + subtotal;
    return acc;
  }, {});

  // Crear array ordenado de semanas
  const semanas = Object.keys(ventasPorSemana)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((semana) => {
      const fecha = new Date(semana);
      return {
        semana: `Sem. ${getWeek(fecha, { locale: es })}`,
        total: ventasPorSemana[semana],
      };
    });

  // Tomar solo las últimas 52 semanas
  const ultimas52 = semanas.slice(-52);

  return (
    <div className="chart-venta">
      <h3>Ventas de las últimas 52 semanas</h3>
      <ResponsiveContainer>
        <LineChart data={ultimas52}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="semana" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toLocaleString("es-CL")}`} />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2}>
            <LabelList
              dataKey="total"
              position="top"
              formatter={(value) => `$${value.toLocaleString("es-CL")}`}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
