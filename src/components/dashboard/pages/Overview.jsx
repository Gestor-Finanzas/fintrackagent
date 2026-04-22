import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import useDashboardData, { parseFechaMock, formatFechaLarga } from "../hooks/useDashboardData";
import { useProfile } from "../../../contexts/ProfileContext";
import PeriodFilter from "../components/PeriodFilter";
import SummaryCard from "../components/SummaryCard";
import ChartCard from "../components/ChartCard";
import { formatEuro, parseMonto } from "../../../utils/globalUtils";
import { coloresCategorias } from "../../../utils/categoriasColors";
import { getCategoryIcon } from "../../../utils/categoryIcons";
import { translateCategory } from "../../../utils/translateCategory";

export default function Overview() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { firstName } = useProfile();
  const {
    periodo, setPeriodo,
    customRange, setCustomRange, dateRangeLabel,
    ingresos, gastos, movimientos,
    totalIngresos, totalGastos, balance,
  } = useDashboardData();
  const navigate = useNavigate();

  // Estado local para el toggle de la leyenda (click oculta/muestra la serie).
  // Replicamos el comportamiento nativo de Chart.js pero en HTML para poder
  // controlar la separación leyenda ↔ gráfico con Tailwind.
  const [hiddenSeries, setHiddenSeries] = useState({ ingresos: false, gastos: false });
  const toggleSeries = (key) => setHiddenSeries((prev) => ({ ...prev, [key]: !prev[key] }));

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
          label: t("dashboard.summary.income"),
          data: sorted.map(([, v]) => v.ing),
          borderColor: "#34D399",
          backgroundColor: "rgba(52,211,153,0.08)",
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          hidden: hiddenSeries.ingresos,
        },
        {
          label: t("dashboard.summary.expenses"),
          data: sorted.map(([, v]) => v.gas),
          borderColor: "#F87171",
          backgroundColor: "rgba(248,113,113,0.08)",
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          hidden: hiddenSeries.gastos,
        },
      ],
    };
  }, [ingresos, gastos, t, hiddenSeries]);

  // Expenses by category for donut
  const donutData = useMemo(() => {
    const map = {};
    gastos.forEach((g) => {
      map[g.categoria] = (map[g.categoria] || 0) + parseMonto(g.monto);
    });
    const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
    return {
      labels: entries.map(([c]) => translateCategory(c, t)),
      datasets: [
        {
          data: entries.map(([, v]) => v),
          backgroundColor: entries.map((_, i) => coloresCategorias[i % coloresCategorias.length]),
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    };
  }, [gastos, t]);

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
      // Leyenda nativa desactivada: la pintamos nosotros en HTML arriba del
      // canvas para poder controlar la separación visual con Tailwind.
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#1E3A5F",
        bodyColor: "#1E3A5F",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        callbacks: { label: (ctx) => `${ctx.dataset.label}: ${formatEuro(ctx.parsed.y, lang)}` },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#8F9BBA", font: { size: 11 } } },
      y: {
        grid: { color: "#F4F7FE" },
        ticks: { color: "#8F9BBA", font: { size: 11 }, callback: (v) => formatEuro(v, lang) },
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
        titleColor: "#1E3A5F",
        bodyColor: "#1E3A5F",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        callbacks: { label: (ctx) => `${ctx.label}: ${formatEuro(ctx.parsed, lang)}` },
      },
    },
    animation: { duration: 500 },
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return t("dashboard.greeting.morning");
    if (h < 20) return t("dashboard.greeting.afternoon");
    return t("dashboard.greeting.evening");
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
              {firstName}
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
          label={t("dashboard.summary.income")}
          value={formatEuro(totalIngresos, lang)}
          color="text-emerald-600"
        />
        <SummaryCard
          label={t("dashboard.summary.expenses")}
          value={formatEuro(totalGastos, lang)}
          color="text-red-500"
        />
        <SummaryCard
          label={t("dashboard.summary.balance")}
          value={formatEuro(balance, lang)}
          color={balance >= 0 ? "text-dark" : "text-red-500"}
        />
      </div>

      {/* Ingresos vs Gastos — full width */}
      <ChartCard title={t("dashboard.charts.incomeVsExpenses")}>
        {/* Leyenda personalizada — click para ocultar/mostrar serie. */}
        <div className="flex items-center justify-center gap-6 mb-5">
          {[
            { key: "ingresos", label: t("dashboard.summary.income"), color: "#34D399" },
            { key: "gastos", label: t("dashboard.summary.expenses"), color: "#F87171" },
          ].map((serie) => (
            <button
              key={serie.key}
              type="button"
              onClick={() => toggleSeries(serie.key)}
              className={`flex items-center gap-2 text-xs font-medium transition-opacity duration-150 ${
                hiddenSeries[serie.key] ? "opacity-40 line-through" : "opacity-100"
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-sm shrink-0"
                style={{ backgroundColor: serie.color }}
              />
              <span className="text-gray-500">{serie.label}</span>
            </button>
          ))}
        </div>
        <div className="h-72 lg:h-80 min-h-[250px]">
          <Line data={lineData} options={chartOptions} />
        </div>
      </ChartCard>

      {/* Recent Transactions + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              {t("dashboard.transactions.recent")}
            </h3>
            <button
              onClick={() => navigate("/dashboard/balance")}
              className="text-xs font-semibold text-dark hover:text-primary transition-colors"
            >
              {t("common.seeAll")} →
            </button>
          </div>
          <div className="flex flex-col divide-y divide-gray-100">
            {recent.length === 0 ? (
              <p className="text-sm text-gray-500 py-8 text-center">
                {t("dashboard.transactions.empty")}
              </p>
            ) : (
              recent.map((m, i) => {
                const catColor = m.tipo === "ingreso" ? "#10B981" : "#F87171";
                const itemKey = `${m.fecha}-${m.categoria}-${m.monto}-${i}`;
                return (
                  <div key={itemKey} className="flex items-center gap-4 py-3.5">
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
                        {translateCategory(m.categoria, t)} · {m.fecha}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-bold shrink-0 ${
                        m.tipo === "ingreso" ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {m.tipo === "ingreso" ? "+" : "-"}
                      {formatEuro(parseMonto(m.monto), lang)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <ChartCard title={t("dashboard.charts.expensesByCategory")}>
          <div className="h-72 lg:h-full min-h-[250px]">
            <Doughnut data={donutData} options={donutOptions} />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
