import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import useDashboardData, { parseFechaMock } from "../hooks/useDashboardData";
import PeriodFilter from "../components/PeriodFilter";
import SummaryCard from "../components/SummaryCard";
import ChartCard from "../components/ChartCard";
import TransactionsTable from "../components/TransactionsTable";
import { formatEuro, parseMonto } from "../../../utils/globalUtils";
import { FaEuroSign } from "react-icons/fa";

export default function Balance() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const {
    periodo, setPeriodo,
    customRange, setCustomRange, dateRangeLabel,
    ingresos, gastos, movimientos,
    totalIngresos, totalGastos, balance,
  } = useDashboardData();

  const balanceEvolution = useMemo(() => {
    const allDates = new Set();
    ingresos.forEach((i) => allDates.add(i.fecha));
    gastos.forEach((g) => allDates.add(g.fecha));
    const sorted = [...allDates].sort(
      (a, b) => parseFechaMock(a).getTime() - parseFechaMock(b).getTime()
    );
    return sorted.reduce((acc, fecha) => {
      const dayInc = ingresos
        .filter((i) => i.fecha === fecha)
        .reduce((a, c) => a + parseMonto(c.monto), 0);
      const dayExp = gastos
        .filter((g) => g.fecha === fecha)
        .reduce((a, c) => a + parseMonto(c.monto), 0);
      const previous = acc.length > 0 ? acc[acc.length - 1].value : 0;
      return [...acc, { label: fecha.slice(0, 5), value: previous + dayInc - dayExp }];
    }, []);
  }, [ingresos, gastos]);

  const lineData = useMemo(() => ({
    labels: balanceEvolution.map((d) => d.label),
    datasets: [
      {
        label: t("common.balance"),
        data: balanceEvolution.map((d) => d.value),
        borderColor: "#818CF8",
        backgroundColor: "rgba(129,140,248,0.08)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  }), [balanceEvolution, t]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff", titleColor: "#1E3A5F", bodyColor: "#1E3A5F",
        borderColor: "#E2E8F0", borderWidth: 1, padding: 12, cornerRadius: 12,
        callbacks: { label: (ctx) => `${t("common.balance")}: ${formatEuro(ctx.parsed.y, lang)}` },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#8F9BBA", font: { size: 11 } } },
      y: { grid: { color: "#F4F7FE" }, ticks: { color: "#8F9BBA", font: { size: 11 }, callback: (v) => formatEuro(v, lang) } },
    },
    animation: { duration: 500 },
  };

  const total = totalIngresos + totalGastos;

  return (
    <div className="flex flex-col gap-8">
      {/* Header editorial */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
            {t("balancePage.eyebrow")}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
            {t("balancePage.title")}
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
          label={t("balancePage.balanceNet")}
          value={formatEuro(balance, lang)}
          color={balance >= 0 ? "text-dark" : "text-red-500"}
        />
      </div>

      {/* Balance Evolution Chart */}
      <ChartCard title={t("balancePage.evolutionChart")}>
        <div className="h-80 lg:h-full min-h-[280px]">
          <Line data={lineData} options={chartOptions} />
        </div>
      </ChartCard>

      {/* Income vs Expenses Comparison */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-6">
          {t("balancePage.compareTitle")}
        </h3>

        {/* Proportion bar */}
        <div className="flex h-2 rounded-full overflow-hidden mb-6 bg-gray-100">
          <div
            className="bg-emerald-500 transition-all duration-500"
            style={{ width: total > 0 ? `${(totalIngresos / total) * 100}%` : "50%" }}
          />
          <div
            className="bg-red-400 transition-all duration-500"
            style={{ width: total > 0 ? `${(totalGastos / total) * 100}%` : "50%" }}
          />
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-100 border border-gray-400 rounded-2xl p-5">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500">
              {t("dashboard.summary.income")}
            </span>
            <p className="text-2xl font-bold text-emerald-600 mt-2">
              {formatEuro(totalIngresos, lang)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {t("balancePage.movementsCount", {
                count: ingresos.length,
                pct: total > 0 ? Math.round((totalIngresos / total) * 100) : 0,
              })}
            </p>
          </div>

          <div className="bg-gray-100 border border-gray-400 rounded-2xl p-5">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500">
              {t("dashboard.summary.expenses")}
            </span>
            <p className="text-2xl font-bold text-red-500 mt-2">
              {formatEuro(totalGastos, lang)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {t("balancePage.movementsCount", {
                count: gastos.length,
                pct: total > 0 ? Math.round((totalGastos / total) * 100) : 0,
              })}
            </p>
          </div>
        </div>

        {/* Savings rate */}
        {totalIngresos > 0 && (
          <div className="mt-6 flex items-center justify-between pt-5 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <FaEuroSign className="w-3 h-3 text-primary" />
              <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                {t("balancePage.savingsRate")}
              </span>
            </div>
            <span
              className={`text-sm font-bold ${
                balance >= 0 ? "text-dark" : "text-red-500"
              }`}
            >
              {Math.round((balance / totalIngresos) * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* All Transactions */}
      <TransactionsTable movimientos={movimientos} showTypeColumn={true} />
    </div>
  );
}
