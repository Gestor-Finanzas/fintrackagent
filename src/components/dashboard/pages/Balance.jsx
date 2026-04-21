import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import useDashboardData, { parseFechaMock } from "../hooks/useDashboardData";
import PeriodFilter from "../components/PeriodFilter";
import SummaryCard from "../components/SummaryCard";
import ChartCard from "../components/ChartCard";
import TransactionsTable from "../components/TransactionsTable";
import { formatEuro, parseMonto } from "../../../utils/globalUtils";
import { FaEuroSign } from "react-icons/fa";

export default function Balance() {
  const {
    periodo, setPeriodo,
    customRange, setCustomRange, dateRangeLabel,
    ingresos, gastos, movimientos,
    totalIngresos, totalGastos, balance,
  } = useDashboardData();

  // Balance evolution (cumulative)
  const balanceEvolution = useMemo(() => {
    const allDates = new Set();
    ingresos.forEach((i) => allDates.add(i.fecha));
    gastos.forEach((g) => allDates.add(g.fecha));
    const sorted = [...allDates].sort(
      (a, b) => parseFechaMock(a).getTime() - parseFechaMock(b).getTime()
    );
    let running = 0;
    const data = sorted.map((fecha) => {
      const dayInc = ingresos
        .filter((i) => i.fecha === fecha)
        .reduce((a, c) => a + parseMonto(c.monto), 0);
      const dayExp = gastos
        .filter((g) => g.fecha === fecha)
        .reduce((a, c) => a + parseMonto(c.monto), 0);
      running += dayInc - dayExp;
      return { label: fecha.slice(0, 5), value: running };
    });
    return data;
  }, [ingresos, gastos]);

  const lineData = useMemo(() => ({
    labels: balanceEvolution.map((d) => d.label),
    datasets: [
      {
        label: "Balance",
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
  }), [balanceEvolution]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff", titleColor: "#1B2559", bodyColor: "#1B2559",
        borderColor: "#E2E8F0", borderWidth: 1, padding: 12, cornerRadius: 12,
        callbacks: { label: (ctx) => `Balance: ${formatEuro(ctx.parsed.y)}` },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#8F9BBA", font: { size: 11 } } },
      y: { grid: { color: "#F4F7FE" }, ticks: { color: "#8F9BBA", font: { size: 11 }, callback: (v) => formatEuro(v) } },
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
            Situación global
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
            Balance
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
          label="Balance neto"
          value={formatEuro(balance)}
          color={balance >= 0 ? "text-dark" : "text-red-500"}
        />
      </div>

      {/* Balance Evolution Chart */}
      <ChartCard title="Evolución del balance">
        <div className="h-80 lg:h-full min-h-[280px]">
          <Line data={lineData} options={chartOptions} />
        </div>
      </ChartCard>

      {/* Income vs Expenses Comparison */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-6">
          Ingresos vs Gastos
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
              Ingresos
            </span>
            <p className="text-2xl font-bold text-emerald-600 mt-2">
              {formatEuro(totalIngresos)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {ingresos.length} movimiento{ingresos.length !== 1 ? "s" : ""} ·{" "}
              {total > 0 ? Math.round((totalIngresos / total) * 100) : 0}% del total
            </p>
          </div>

          <div className="bg-gray-100 border border-gray-400 rounded-2xl p-5">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500">
              Gastos
            </span>
            <p className="text-2xl font-bold text-red-500 mt-2">
              {formatEuro(totalGastos)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {gastos.length} movimiento{gastos.length !== 1 ? "s" : ""} ·{" "}
              {total > 0 ? Math.round((totalGastos / total) * 100) : 0}% del total
            </p>
          </div>
        </div>

        {/* Savings rate */}
        {totalIngresos > 0 && (
          <div className="mt-6 flex items-center justify-between pt-5 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <FaEuroSign className="w-3 h-3 text-primary" />
              <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                Tasa de ahorro
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
