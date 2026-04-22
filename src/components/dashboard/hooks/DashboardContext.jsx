import { createContext, useContext, useState, useMemo, useCallback } from "react";
import mockData from "../../../mocks/mockDashboardData.json";
import mockUser from "../../../mocks/mockUser.json";
import { parseMonto } from "../../../utils/globalUtils";

// Chart.js se registra una sola vez en src/chartSetup.js (importado desde index.js).

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function parseFechaMock(fechaStr) {
  if (!fechaStr) return new Date();
  const parts = fechaStr.split("-");
  if (parts.length === 3 && parts[0].length <= 2) {
    const d = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    if (isNaN(d.getTime())) return new Date();
    return d;
  }
  const d = new Date(fechaStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

export function formatFechaMock(date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

export function formatFechaLarga(date) {
  const d = date.getDate();
  const m = MESES_ES[date.getMonth()];
  const y = date.getFullYear();
  return `${d} de ${m} de ${y}`;
}

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [periodo, setPeriodo] = useState("mes");
  const [movimientosMap, setMovimientosMap] = useState({});
  const [customRange, setCustomRange] = useState(null);

  const periodoData = mockData.datos[periodo] || { ingresos: [], gastos: [], movimientos: [] };

  const filterByRange = useCallback((items) => {
    if (!customRange) return items;
    return items.filter((item) => {
      const d = parseFechaMock(item.fecha);
      return d >= customRange.start && d <= customRange.end;
    });
  }, [customRange]);

  const movimientos = useMemo(() => {
    const base = movimientosMap[periodo] || periodoData.movimientos || [];
    return filterByRange(base);
  }, [periodo, movimientosMap, periodoData.movimientos, filterByRange]);

  const ingresos = useMemo(
    () => filterByRange(periodoData.ingresos || []),
    [periodoData.ingresos, filterByRange]
  );
  const gastos = useMemo(
    () => filterByRange(periodoData.gastos || []),
    [periodoData.gastos, filterByRange]
  );

  const totalIngresos = useMemo(
    () => ingresos.reduce((acc, i) => acc + parseMonto(i.monto), 0),
    [ingresos]
  );
  const totalGastos = useMemo(
    () => gastos.reduce((acc, g) => acc + parseMonto(g.monto), 0),
    [gastos]
  );
  const balance = totalIngresos - totalGastos;

  const dateRangeLabel = useMemo(() => {
    if (customRange) {
      return `${formatFechaLarga(customRange.start)} — ${formatFechaLarga(customRange.end)}`;
    }
    const allDates = [...ingresos, ...gastos].map((e) => parseFechaMock(e.fecha));
    if (allDates.length === 0) return "";
    allDates.sort((a, b) => a - b);
    const first = allDates[0];
    const last = allDates[allDates.length - 1];
    return `${first.getDate()} ${MESES_ES[first.getMonth()].slice(0, 3)} — ${last.getDate()} ${MESES_ES[last.getMonth()].slice(0, 3)} ${last.getFullYear()}`;
  }, [ingresos, gastos, customRange]);

  const usuario = useMemo(() => ({
    ...mockUser,
    nombre: mockData.usuario?.nombre || mockUser.nombre,
  }), []);

  const handleSetPeriodo = useCallback((p) => {
    setPeriodo(p);
    setCustomRange(null);
  }, []);

  const handleSetCustomRange = useCallback((start, end) => {
    if (start && end) setCustomRange({ start, end });
    else setCustomRange(null);
  }, []);

  const addMovimiento = useCallback((mov) => {
    setMovimientosMap((prev) => ({
      ...prev,
      [periodo]: [mov, ...(prev[periodo] || periodoData.movimientos || [])],
    }));
  }, [periodo, periodoData.movimientos]);

  const editMovimiento = useCallback((index, updated) => {
    setMovimientosMap((prev) => {
      const current = prev[periodo] || periodoData.movimientos || [];
      const copy = [...current];
      copy[index] = updated;
      return { ...prev, [periodo]: copy };
    });
  }, [periodo, periodoData.movimientos]);

  const deleteMovimiento = useCallback((index) => {
    setMovimientosMap((prev) => {
      const current = prev[periodo] || periodoData.movimientos || [];
      return { ...prev, [periodo]: current.filter((_, i) => i !== index) };
    });
  }, [periodo, periodoData.movimientos]);

  const value = useMemo(() => ({
    periodo,
    setPeriodo: handleSetPeriodo,
    customRange,
    setCustomRange: handleSetCustomRange,
    dateRangeLabel,
    ingresos,
    gastos,
    movimientos,
    totalIngresos,
    totalGastos,
    balance,
    usuario,
    addMovimiento,
    editMovimiento,
    deleteMovimiento,
  }), [
    periodo, handleSetPeriodo, customRange, handleSetCustomRange, dateRangeLabel,
    ingresos, gastos, movimientos, totalIngresos, totalGastos, balance, usuario,
    addMovimiento, editMovimiento, deleteMovimiento,
  ]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export default function useDashboardData() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboardData must be used inside <DashboardProvider>");
  }
  return ctx;
}
