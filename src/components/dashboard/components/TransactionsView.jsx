import { useMemo } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import useDashboardData, { parseFechaMock } from "../hooks/useDashboardData";
import PeriodFilter from "./PeriodFilter";
import ChartCard from "./ChartCard";
import CategoryBreakdown from "./CategoryBreakdown";
import TransactionsTable from "./TransactionsTable";
import { formatEuro, parseMonto } from "../../../utils/globalUtils";
import { coloresCategorias } from "../../../utils/categoriasColors";
import {
  chartColors,
  baseLineOptions,
  baseDonutOptions,
} from "../../../utils/chartColors";

/**
 * Vista genérica para Ingresos o Gastos.
 * Todo el contenido (datasets, totales, colores, textos) se deriva de `type`.
 */
export default function TransactionsView({ type }) {
  const { t } = useTranslation();
  const {
    periodo, setPeriodo,
    customRange, setCustomRange, dateRangeLabel,
    ingresos, gastos, movimientos,
    totalIngresos, totalGastos,
    addMovimiento, editMovimiento, deleteMovimiento,
  } = useDashboardData();

  const isIncome = type === "ingreso";
  const items = isIncome ? ingresos : gastos;
  const total = isIncome ? totalIngresos : totalGastos;
  const lineColor = isIncome ? chartColors.income : chartColors.expense;
  const lineBgColor = isIncome ? chartColors.incomeFill : chartColors.expenseFill;
  const totalColor = isIncome ? "text-emerald-600" : "text-red-500";

  const byCategory = useMemo(() => {
    const map = {};
    items.forEach((it) => {
      map[it.categoria] = (map[it.categoria] || 0) + parseMonto(it.monto);
    });
    return Object.entries(map)
      .map(([cat, monto]) => ({ categoria: cat, monto }))
      .sort((a, b) => b.monto - a.monto);
  }, [items]);

  const lineData = useMemo(() => {
    const dateMap = {};
    items.forEach((it) => {
      dateMap[it.fecha] = (dateMap[it.fecha] || 0) + parseMonto(it.monto);
    });
    const sorted = Object.entries(dateMap).sort(
      (a, b) => parseFechaMock(a[0]).getTime() - parseFechaMock(b[0]).getTime()
    );
    return {
      labels: sorted.map(([f]) => f.slice(0, 5)),
      datasets: [
        {
          label: isIncome ? t("dashboard.summary.income") : t("dashboard.summary.expenses"),
          data: sorted.map(([, v]) => v),
          borderColor: lineColor,
          backgroundColor: lineBgColor,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    };
  }, [items, lineColor, lineBgColor, isIncome, t]);

  const donutData = useMemo(() => ({
    labels: byCategory.map((c) => c.categoria),
    datasets: [
      {
        data: byCategory.map((c) => c.monto),
        backgroundColor: byCategory.map(
          (_, i) => coloresCategorias[i % coloresCategorias.length]
        ),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  }), [byCategory]);

  const chartOptions = useMemo(() => ({
    ...baseLineOptions,
    plugins: {
      ...baseLineOptions.plugins,
      tooltip: {
        ...baseLineOptions.plugins.tooltip,
        callbacks: { label: (ctx) => `${formatEuro(ctx.parsed.y)}` },
      },
    },
    scales: {
      ...baseLineOptions.scales,
      y: {
        ...baseLineOptions.scales.y,
        ticks: {
          ...baseLineOptions.scales.y.ticks,
          callback: (v) => formatEuro(v),
        },
      },
    },
  }), []);

  const donutOptions = useMemo(() => ({
    ...baseDonutOptions,
    plugins: {
      ...baseDonutOptions.plugins,
      tooltip: {
        ...baseDonutOptions.plugins.tooltip,
        callbacks: { label: (ctx) => `${ctx.label}: ${formatEuro(ctx.parsed)}` },
      },
    },
  }), []);

  const eyebrow = isIncome
    ? `${t("common.total")} ${t("dashboard.summary.income").toLowerCase()}`
    : `${t("common.total")} ${t("dashboard.summary.expenses").toLowerCase()}`;
  const title = isIncome ? t("dashboard.summary.income") : t("dashboard.summary.expenses");
  const chartTitle = `${t("dashboard.charts.evolution")} · ${title.toLowerCase()}`;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
            {eyebrow}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
            {title}
          </h1>
          <p className="text-base text-gray-600 mt-3">
            <span className={`text-xl font-bold ${totalColor}`}>
              {formatEuro(total)}
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
        <ChartCard title={chartTitle} className="lg:col-span-2">
          <div className="h-80 lg:h-full min-h-[280px]">
            <Line data={lineData} options={chartOptions} />
          </div>
        </ChartCard>
        <div className="flex flex-col gap-4">
          <ChartCard title={t("dashboard.charts.categoriesBreakdown")}>
            <div className="h-48">
              <Doughnut data={donutData} options={donutOptions} />
            </div>
          </ChartCard>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
            <CategoryBreakdown items={byCategory} total={total} />
          </div>
        </div>
      </div>

      <TransactionsTable
        movimientos={movimientos}
        filterType={type}
        showTypeColumn={false}
        onAdd={addMovimiento}
        onEdit={editMovimiento}
        onDelete={deleteMovimiento}
      />
    </div>
  );
}
