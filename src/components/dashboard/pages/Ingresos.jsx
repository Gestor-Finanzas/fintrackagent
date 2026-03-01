import { useMemo } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import useDashboardData, { parseFechaMock } from "../hooks/useDashboardData";
import PeriodFilter from "../components/PeriodFilter";
import ChartCard from "../components/ChartCard";
import CategoryBreakdown from "../components/CategoryBreakdown";
import TransactionsTable from "../components/TransactionsTable";
import { formatEuro, parseMonto } from "../../../utils/globalUtils";
import { coloresCategorias } from "../../../utils/categoriasColors";

export default function Ingresos() {
  const {
    periodo, setPeriodo,
    customRange, setCustomRange, dateRangeLabel,
    ingresos, movimientos,
    totalIngresos,
    addMovimiento, editMovimiento, deleteMovimiento,
  } = useDashboardData();

  // Income by category
  const byCategory = useMemo(() => {
    const map = {};
    ingresos.forEach((i) => {
      map[i.categoria] = (map[i.categoria] || 0) + parseMonto(i.monto);
    });
    return Object.entries(map)
      .map(([cat, monto]) => ({ categoria: cat, monto }))
      .sort((a, b) => b.monto - a.monto);
  }, [ingresos]);

  // Line chart data
  const lineData = useMemo(() => {
    const dateMap = {};
    ingresos.forEach((i) => {
      dateMap[i.fecha] = (dateMap[i.fecha] || 0) + parseMonto(i.monto);
    });
    const sorted = Object.entries(dateMap).sort(
      (a, b) => parseFechaMock(a[0]).getTime() - parseFechaMock(b[0]).getTime()
    );
    return {
      labels: sorted.map(([f]) => f.slice(0, 5)),
      datasets: [
        {
          label: "Ingresos",
          data: sorted.map(([, v]) => v),
          borderColor: "#05CD99",
          backgroundColor: "rgba(5,205,153,0.1)",
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    };
  }, [ingresos]);

  // Donut chart data
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
    <div className="flex flex-col gap-6">
      {/* Header with integrated total */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-dash-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <h1 className="text-2xl font-bold text-dash-text">Ingresos</h1>
            </div>
            <p className="text-sm text-dash-text-secondary mt-1">
              Analiza tus fuentes de ingreso
            </p>
          </div>
          <div className="hidden sm:block h-10 w-px bg-dash-border" />
          <div className="hidden sm:block">
            <p className="text-xs text-dash-text-secondary uppercase tracking-wider">Total</p>
            <p className="text-xl font-bold text-dash-success">{formatEuro(totalIngresos)}</p>
          </div>
        </div>
        <PeriodFilter
          periodo={periodo}
          setPeriodo={setPeriodo}
          dateRangeLabel={dateRangeLabel}
          customRange={customRange}
          setCustomRange={setCustomRange}
        />
      </div>

      {/* Mobile total card */}
      <div className="sm:hidden bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
          <svg className="w-5 h-5 text-dash-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-dash-text-secondary">Total ingresos</p>
          <p className="text-lg font-bold text-dash-success">{formatEuro(totalIngresos)}</p>
        </div>
      </div>

      {/* Charts + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Evolución de ingresos" className="lg:col-span-2">
          <div className="h-80">
            <Line data={lineData} options={chartOptions} />
          </div>
        </ChartCard>
        <div className="flex flex-col gap-4">
          <ChartCard title="Por categoría">
            <div className="h-48">
              <Doughnut data={donutData} options={donutOptions} />
            </div>
          </ChartCard>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <CategoryBreakdown items={byCategory} total={totalIngresos} />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionsTable
        movimientos={movimientos}
        filterType="ingreso"
        showTypeColumn={false}
        onAdd={addMovimiento}
        onEdit={editMovimiento}
        onDelete={deleteMovimiento}
      />
    </div>
  );
}
