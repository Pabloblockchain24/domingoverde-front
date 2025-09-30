import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, Title, DoughnutController } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export default function MetasChart({ metaMensual = 1000000, ventasActuales = 0, titulo = "Avance" }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const restante = Math.max(metaMensual - ventasActuales, 0);

    const chart = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Ventas actuales", "Meta restante"],
        datasets: [
          {
            data: [ventasActuales, restante],
            backgroundColor: ["#4CAF50", "#616161ff"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: titulo, font: { size: 18 } },
          legend: { position: "bottom" },
          datalabels: {
            color: "#ffffffff",
            font: { size: 12},
            formatter: (value) => {
              return `${value.toLocaleString()}`;
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    return () => chart.destroy();
  }, [metaMensual, ventasActuales, titulo]);

  return (
    <div style={{ width: "250px", height: "250px", margin: "0 auto" }}>
      <canvas ref={chartRef} />
    </div>
  );
}
