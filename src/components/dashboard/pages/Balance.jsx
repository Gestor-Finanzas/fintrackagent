import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import useDashboardData, { parseFechaMock } from "../hooks/useDashboardData";
import PeriodFilter from "../components/PeriodFilter";
import SummaryCard from "../components/SummaryCard";
import ChartCard from "../components/ChartCard";
import { formatEuro, parseMonto, exportToCSV } from "../../../utils/globalUtils";

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
        borderColor: "#4318FF",
        backgroundColor: "rgba(67,24,255,0.08)",
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

  // Max for comparison bars
  const maxAmount = Math.max(totalIngresos, totalGastos, 1);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-dash-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h1 className="text-2xl font-bold text-dash-text">Balance</h1>
          </div>
          <p className="text-sm text-dash-text-secondary mt-1">
            Tu situación financiera global
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <PeriodFilter
            periodo={periodo}
            setPeriodo={setPeriodo}
            dateRangeLabel={dateRangeLabel}
            customRange={customRange}
            setCustomRange={setCustomRange}
          />
          <button
            onClick={() => exportToCSV(movimientos)}
            className="px-4 py-2 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors duration-150 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar
          </button>
        </div>
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
          icon={
            <svg className="w-5 h-5 text-dash-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Balance Evolution Chart */}
      <ChartCard title="Evolución del balance">
        <div className="h-80">
          <Line data={lineData} options={chartOptions} />
        </div>
      </ChartCard>

      {/* Income vs Expenses Comparison */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-4 h-4 text-dash-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <h3 className="text-sm font-semibold text-dash-text">Ingresos vs Gastos</h3>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-dash-text">Ingresos</span>
              <span className="text-sm font-semibold text-dash-success">{formatEuro(totalIngresos)}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-dash-success transition-all duration-500"
                style={{ width: `${(totalIngresos / maxAmount) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-dash-text">Gastos</span>
              <span className="text-sm font-semibold text-dash-danger">{formatEuro(totalGastos)}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-dash-danger transition-all duration-500"
                style={{ width: `${(totalGastos / maxAmount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* All Transactions */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 pb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-dash-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-sm font-semibold text-dash-text">Todos los movimientos</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dash-border">
                <th className="py-3 px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">Fecha</th>
                <th className="py-3 px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">Tipo</th>
                <th className="py-3 px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">Categoría</th>
                <th className="py-3 px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider text-right">Cantidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dash-border">
              {movimientos
                .slice()
                .sort((a, b) => parseFechaMock(b.fecha).getTime() - parseFechaMock(a.fecha).getTime())
                .map((m, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-3 px-6 text-sm text-dash-text">{m.fecha}</td>
                    <td className="py-3 px-6">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        m.tipo === "ingreso" ? "bg-emerald-50 text-dash-success" : "bg-red-50 text-dash-danger"
                      }`}>
                        {m.tipo === "ingreso" ? "Ingreso" : "Gasto"}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-sm text-dash-text-secondary">{m.categoria}</td>
                    <td className={`py-3 px-6 text-sm font-semibold text-right ${
                      m.tipo === "ingreso" ? "text-dash-success" : "text-dash-danger"
                    }`}>
                      {m.tipo === "ingreso" ? "+" : "-"}{formatEuro(parseMonto(m.monto))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
