import { useMemo } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import useDashboardData, { parseFechaMock } from "../hooks/useDashboardData";
import PeriodFilter from "../components/PeriodFilter";
import ChartCard from "../components/ChartCard";
import CategoryBreakdown from "../components/CategoryBreakdown";
import TransactionsTable from "../components/TransactionsTable";
import { formatEuro, parseMonto } from "../../../utils/globalUtils";
import { coloresCategorias } from "../../../utils/categoriasColors";

export default function Gastos() {
  const {
    periodo, setPeriodo,
    customRange, setCustomRange, dateRangeLabel,
    gastos, movimientos,
    totalGastos,
    addMovimiento, editMovimiento, deleteMovimiento,
  } = useDashboardData();

  const byCategory = useMemo(() => {
    const map = {};
    gastos.forEach((g) => {
      map[g.categoria] = (map[g.categoria] || 0) + parseMonto(g.monto);
    });
    return Object.entries(map)
      .map(([cat, monto]) => ({ categoria: cat, monto }))
      .sort((a, b) => b.monto - a.monto);
  }, [gastos]);

  const lineData = useMemo(() => {
    const dateMap = {};
    gastos.forEach((g) => {
      dateMap[g.fecha] = (dateMap[g.fecha] || 0) + parseMonto(g.monto);
    });
    const sorted = Object.entries(dateMap).sort(
      (a, b) => parseFechaMock(a[0]).getTime() - parseFechaMock(b[0]).getTime()
    );
    return {
      labels: sorted.map(([f]) => f.slice(0, 5)),
      datasets: [
        {
          label: "Gastos",
          data: sorted.map(([, v]) => v),
          borderColor: "#F87171",
          backgroundColor: "rgba(248,113,113,0.1)",
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    };
  }, [gastos]);

  const donutData = useMemo(() => ({
    labels: byCategory.map((c) => c.categoria),
    datasets: [
      {
        data: byCategory.map((c) => c.monto),
        backgroundColor: byCategory.map((_, i) => coloresCategorias[i % coloresCategorias.length]),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  }), [byCategory]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff", titleColor: "#1B2559", bodyColor: "#1B2559",
        borderColor: "#E2E8F0", borderWidth: 1, padding: 12, cornerRadius: 12,
        callbacks: { label: (ctx) => `${formatEuro(ctx.parsed.y)}` },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#8F9BBA", font: { size: 11 } } },
      y: { grid: { color: "#F4F7FE" }, ticks: { color: "#8F9BBA", font: { size: 11 }, callback: (v) => formatEuro(v) } },
    },
    animation: { duration: 500 },
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff", titleColor: "#1B2559", bodyColor: "#1B2559",
        borderColor: "#E2E8F0", borderWidth: 1, padding: 12, cornerRadius: 12,
        callbacks: { label: (ctx) => `${ctx.label}: ${formatEuro(ctx.parsed)}` },
      },
    },
    animation: { duration: 500 },
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header editorial */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
            Análisis de gastos
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
            Gastos
          </h1>
          <p className="text-base text-gray-500 mt-3">
            <span className="text-xl font-bold text-red-500">
              {formatEuro(totalGastos)}
            </span>
          </p>
        </div>
        <PeriodFilter
          periodo={periodo}
          setPeriodo={setPeriodo}
          dateRangeLabel={dateRangeLabel}
          customRange={customRange}
          setCustomRange={setCustomRange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Evolución de gastos" className="lg:col-span-2">
          <div className="h-80 lg:h-full min-h-[280px]">
            <Line data={lineData} options={chartOptions} />
          </div>
        </ChartCard>
        <div className="flex flex-col gap-4">
          <ChartCard title="Por categoría">
            <div className="h-48">
              <Doughnut data={donutData} options={donutOptions} />
            </div>
          </ChartCard>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
            <CategoryBreakdown items={byCategory} total={totalGastos} />
          </div>
        </div>
      </div>

      <TransactionsTable
        movimientos={movimientos}
        filterType="gasto"
        showTypeColumn={false}
        onAdd={addMovimiento}
        onEdit={editMovimiento}
        onDelete={deleteMovimiento}
      />
    </div>
  );
}
