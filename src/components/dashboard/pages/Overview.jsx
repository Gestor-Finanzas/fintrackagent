import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import useDashboardData, { parseFechaMock, formatFechaLarga } from "../hooks/useDashboardData";
import PeriodFilter from "../components/PeriodFilter";
import SummaryCard from "../components/SummaryCard";
import ChartCard from "../components/ChartCard";
import { formatEuro, parseMonto } from "../../../utils/globalUtils";
import { coloresCategorias } from "../../../utils/categoriasColors";
import { getCategoryIcon } from "../../../utils/categoryIcons";

export default function Overview() {
  const {
    periodo, setPeriodo,
    customRange, setCustomRange, dateRangeLabel,
    ingresos, gastos, movimientos,
    totalIngresos, totalGastos, balance,
    usuario,
  } = useDashboardData();
  const navigate = useNavigate();

  // Aggregate by date for line chart
  const lineData = useMemo(() => {
    const dateMap = {};
    ingresos.forEach((i) => {
      dateMap[i.fecha] = dateMap[i.fecha] || { ing: 0, gas: 0 };
      dateMap[i.fecha].ing += parseMonto(i.monto);
    });
    gastos.forEach((g) => {
      dateMap[g.fecha] = dateMap[g.fecha] || { ing: 0, gas: 0 };
      dateMap[g.fecha].gas += parseMonto(g.monto);
    });
    const sorted = Object.entries(dateMap).sort(
      (a, b) => parseFechaMock(a[0]).getTime() - parseFechaMock(b[0]).getTime()
    );
    return {
      labels: sorted.map(([f]) => f.slice(0, 5)),
      datasets: [
        {
          label: "Ingresos",
          data: sorted.map(([, v]) => v.ing),
          borderColor: "#34D399",
          backgroundColor: "rgba(52,211,153,0.08)",
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
        {
          label: "Gastos",
          data: sorted.map(([, v]) => v.gas),
          borderColor: "#F87171",
          backgroundColor: "rgba(248,113,113,0.08)",
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    };
  }, [ingresos, gastos]);

  // Expenses by category for donut
  const donutData = useMemo(() => {
    const map = {};
    gastos.forEach((g) => {
      map[g.categoria] = (map[g.categoria] || 0) + parseMonto(g.monto);
    });
    const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
    return {
      labels: entries.map(([c]) => c),
      datasets: [
        {
          data: entries.map(([, v]) => v),
          backgroundColor: entries.map((_, i) => coloresCategorias[i % coloresCategorias.length]),
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    };
  }, [gastos]);

  // Last 5 transactions
  const recent = useMemo(() => {
    return [...movimientos]
      .sort((a, b) => parseFechaMock(b.fecha).getTime() - parseFechaMock(a.fecha).getTime())
      .slice(0, 5);
  }, [movimientos]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top", align: "center", onHover: (e) => { e.native.target.style.cursor = "pointer"; }, onLeave: (e) => { e.native.target.style.cursor = "default"; }, labels: { boxWidth: 14, boxHeight: 14, useBorderRadius: true, borderRadius: 3, font: { size: 12 }, color: "#8F9BBA", padding: 24 } },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#1B2559",
        bodyColor: "#1B2559",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        callbacks: { label: (ctx) => `${ctx.dataset.label}: ${formatEuro(ctx.parsed.y)}` },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#8F9BBA", font: { size: 11 } } },
      y: {
        grid: { color: "#F4F7FE" },
        ticks: { color: "#8F9BBA", font: { size: 11 }, callback: (v) => formatEuro(v) },
      },
    },
    animation: { duration: 500 },
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 }, color: "#8F9BBA", padding: 16 } },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#1B2559",
        bodyColor: "#1B2559",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        callbacks: { label: (ctx) => `${ctx.label}: ${formatEuro(ctx.parsed)}` },
      },
    },
    animation: { duration: 500 },
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Buenos días";
    if (h < 20) return "Buenas tardes";
    return "Buenas noches";
  };

  // Spanish date: "1 de marzo de 2026"
  const todayLabel = formatFechaLarga(new Date());

  return (
    <div className="flex flex-col gap-8">
      {/* Header editorial */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
            {todayLabel}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
            {greeting()},{" "}
            <span className="text-primary">
              {usuario.nombre.split(" ")[0]}
            </span>
            .
          </h1>
        </div>
        <PeriodFilter
          periodo={periodo}
          setPeriodo={setPeriodo}
          dateRangeLabel={dateRangeLabel}
          customRange={customRange}
          setCustomRange={setCustomRange}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Ingresos"
          value={formatEuro(totalIngresos)}
          color="text-emerald-600"
        />
        <SummaryCard
          label="Gastos"
          value={formatEuro(totalGastos)}
          color="text-red-500"
        />
        <SummaryCard
          label="Balance"
          value={formatEuro(balance)}
          color={balance >= 0 ? "text-dark" : "text-red-500"}
        />
      </div>

      {/* Ingresos vs Gastos — full width */}
      <ChartCard title="Ingresos vs Gastos">
        <div className="h-72 lg:h-80 min-h-[250px]">
          <Line data={lineData} options={chartOptions} />
        </div>
      </ChartCard>

      {/* Recent Transactions + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Últimos movimientos
            </h3>
            <button
              onClick={() => navigate("/dashboard/ingresos")}
              className="text-xs font-semibold text-dark hover:text-primary transition-colors"
            >
              Ver todos →
            </button>
          </div>
          <div className="flex flex-col divide-y divide-gray-100">
            {recent.length === 0 ? (
              <p className="text-sm text-gray-500 py-8 text-center">
                No hay movimientos para este período
              </p>
            ) : (
              recent.map((m, i) => {
                const catColor = m.tipo === "ingreso" ? "#10B981" : "#F87171";
                return (
                  <div key={i} className="flex items-center gap-4 py-3.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: catColor + "14", color: catColor }}
                    >
                      {getCategoryIcon(m.categoria, 16)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-dark truncate">
                        {m.nombre || m.categoria}
                      </p>
                      <p className="text-xs text-gray-500">
                        {m.categoria} · {m.fecha}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-bold shrink-0 ${
                        m.tipo === "ingreso" ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {m.tipo === "ingreso" ? "+" : "-"}
                      {formatEuro(parseMonto(m.monto))}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <ChartCard title="Gastos por categoría">
          <div className="h-72 lg:h-full min-h-[250px]">
            <Doughnut data={donutData} options={donutOptions} />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
