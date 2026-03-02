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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-dash-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h1 className="text-2xl font-bold text-dash-text">Balance</h1>
          </div>
          <p className="text-sm text-dash-text-secondary mt-1">
            Tu situación financiera global
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
          label="Balance neto"
          value={formatEuro(balance)}
          color={balance >= 0 ? "text-dash-accent" : "text-dash-danger"}
          iconBg="bg-indigo-50"
          icon={<FaEuroSign className="w-4 h-4 text-dash-accent" />}
        />
      </div>

      {/* Balance Evolution Chart */}
      <ChartCard title="Evolución del balance">
        <div className="h-80 lg:h-full min-h-[280px]">
          <Line data={lineData} options={chartOptions} />
        </div>
      </ChartCard>

      {/* Income vs Expenses Comparison */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <svg className="w-4 h-4 text-dash-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <h3 className="text-sm font-semibold text-dash-text">Ingresos vs Gastos</h3>
        </div>

        {/* Proportion bar */}
        <div className="flex h-2.5 rounded-full overflow-hidden mb-6">
          <div
            className="bg-dash-success transition-all duration-500 rounded-l-full"
            style={{ width: total > 0 ? `${(totalIngresos / total) * 100}%` : "50%" }}
          />
          <div
            className="bg-dash-danger transition-all duration-500 rounded-r-full"
            style={{ width: total > 0 ? `${(totalGastos / total) * 100}%` : "50%" }}
          />
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Ingresos */}
          <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-emerald-50/60">
            <div className="w-9 h-9 rounded-full bg-dash-success/10 flex items-center justify-center mb-1">
              <svg className="w-4 h-4 text-dash-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
            <span className="text-xs font-medium text-dash-text-secondary uppercase tracking-wider">Ingresos</span>
            <span className="text-lg font-bold text-dash-success">{formatEuro(totalIngresos)}</span>
            <span className="text-xs text-dash-text-secondary">
              {ingresos.length} movimiento{ingresos.length !== 1 ? "s" : ""}
            </span>
            <span className="text-[11px] font-medium text-dash-success/70 mt-0.5">
              {total > 0 ? Math.round((totalIngresos / total) * 100) : 0}% del total
            </span>
          </div>

          {/* Gastos */}
          <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-red-50/60">
            <div className="w-9 h-9 rounded-full bg-dash-danger/10 flex items-center justify-center mb-1">
              <svg className="w-4 h-4 text-dash-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
            <span className="text-xs font-medium text-dash-text-secondary uppercase tracking-wider">Gastos</span>
            <span className="text-lg font-bold text-dash-danger">{formatEuro(totalGastos)}</span>
            <span className="text-xs text-dash-text-secondary">
              {gastos.length} movimiento{gastos.length !== 1 ? "s" : ""}
            </span>
            <span className="text-[11px] font-medium text-dash-danger/70 mt-0.5">
              {total > 0 ? Math.round((totalGastos / total) * 100) : 0}% del total
            </span>
          </div>
        </div>

        {/* Savings rate */}
        {totalIngresos > 0 && (
          <div className="mt-5 flex items-center justify-between p-3 rounded-xl bg-indigo-50/50 border border-dash-accent/10">
            <div className="flex items-center gap-2">
              <FaEuroSign className="w-3 h-3 text-dash-accent" />
              <span className="text-xs font-medium text-dash-text">Tasa de ahorro</span>
            </div>
            <span className={`text-sm font-bold ${balance >= 0 ? "text-dash-accent" : "text-dash-danger"}`}>
              {Math.round((balance / totalIngresos) * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* All Transactions */}
      <TransactionsTable
        movimientos={movimientos}
        showTypeColumn={true}
      />
    </div>
  );
}
