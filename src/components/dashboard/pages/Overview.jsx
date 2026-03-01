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
          borderColor: "#05CD99",
          backgroundColor: "rgba(5,205,153,0.08)",
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
        {
          label: "Gastos",
          data: sorted.map(([, v]) => v.gas),
          borderColor: "#EE5D50",
          backgroundColor: "rgba(238,93,80,0.08)",
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
      legend: { display: true, position: "top", labels: { boxWidth: 12, font: { size: 12 }, color: "#8F9BBA" } },
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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dash-text">
            {greeting()}, {usuario.nombre.split(" ")[0]}
          </h1>
          <p className="text-sm text-dash-text-secondary mt-1">
            {todayLabel}
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Ingresos"
          value={formatEuro(totalIngresos)}
          color="text-dash-success"
          iconBg="bg-emerald-50"
          icon={
            <svg className="w-5 h-5 text-dash-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          }
        />
        <SummaryCard
          label="Gastos"
          value={formatEuro(totalGastos)}
          color="text-dash-danger"
          iconBg="bg-red-50"
          icon={
            <svg className="w-5 h-5 text-dash-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          }
        />
        <SummaryCard
          label="Balance"
          value={formatEuro(balance)}
          color={balance >= 0 ? "text-dash-accent" : "text-dash-danger"}
          iconBg="bg-indigo-50"
          icon={
            <svg className="w-5 h-5 text-dash-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18m-7 6h7" />
            </svg>
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Ingresos vs Gastos" className="lg:col-span-2">
          <div className="h-72">
            <Line data={lineData} options={chartOptions} />
          </div>
        </ChartCard>
        <ChartCard title="Gastos por categoría">
          <div className="h-72">
            <Doughnut data={donutData} options={donutOptions} />
          </div>
        </ChartCard>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-dash-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-sm font-semibold text-dash-text">Últimos movimientos</h3>
          </div>
          <button
            onClick={() => navigate("/dashboard/ingresos")}
            className="text-xs font-medium text-dash-accent hover:underline"
          >
            Ver todos
          </button>
        </div>
        <div className="flex flex-col divide-y divide-dash-border">
          {recent.length === 0 ? (
            <p className="text-sm text-dash-text-secondary py-8 text-center">
              No hay movimientos para este período
            </p>
          ) : (
            recent.map((m, i) => {
              const catColor = m.tipo === "ingreso" ? "#05CD99" : "#EE5D50";
              return (
                <div key={i} className="flex items-center gap-3 py-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: catColor + "14", color: catColor }}
                  >
                    {getCategoryIcon(m.categoria, 16)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dash-text truncate">
                      {m.nombre || m.categoria}
                    </p>
                    <p className="text-xs text-dash-text-secondary">{m.categoria} &middot; {m.fecha}</p>
                  </div>
                  <span
                    className={`text-sm font-semibold shrink-0 ${
                      m.tipo === "ingreso" ? "text-dash-success" : "text-dash-danger"
                    }`}
                  >
                    {m.tipo === "ingreso" ? "+" : "-"}{formatEuro(parseMonto(m.monto))}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
