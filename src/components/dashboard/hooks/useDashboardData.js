import { useState, useMemo, useCallback } from "react";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement,
} from "chart.js";
import mockData from "../../../mocks/mockDashboardData.json";
import mockUser from "../../../mocks/mockUser.json";
import { parseMonto } from "../../../utils/globalUtils";

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement
);

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function parseFechaMock(fechaStr) {
  if (!fechaStr) return new Date();
  const parts = fechaStr.split("-");
  if (parts.length === 3 && parts[0].length <= 2) {
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  }
  return new Date(fechaStr);
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

export default function useDashboardData() {
  const [periodo, setPeriodo] = useState("mes");
  const [movimientosMap, setMovimientosMap] = useState({});
  const [customRange, setCustomRange] = useState(null); // { start: Date, end: Date } or null

  const periodoData = mockData.datos[periodo] || { ingresos: [], gastos: [], movimientos: [] };

  // Filter by custom date range if active
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

  // Compute date range label
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

  const usuario = {
    ...mockUser,
    nombre: mockData.usuario?.nombre || mockUser.nombre,
  };

  const handleSetPeriodo = useCallback((p) => {
    setPeriodo(p);
    setCustomRange(null);
  }, []);

  const handleSetCustomRange = useCallback((start, end) => {
    if (start && end) {
      setCustomRange({ start, end });
    } else {
      setCustomRange(null);
    }
  }, []);

  const addMovimiento = useCallback(
    (mov) => {
      setMovimientosMap((prev) => ({
        ...prev,
        [periodo]: [mov, ...(prev[periodo] || periodoData.movimientos || [])],
      }));
    },
    [periodo, periodoData.movimientos]
  );

  const editMovimiento = useCallback(
    (index, updated) => {
      setMovimientosMap((prev) => {
        const current = prev[periodo] || periodoData.movimientos || [];
        const copy = [...current];
        copy[index] = updated;
        return { ...prev, [periodo]: copy };
      });
    },
    [periodo, periodoData.movimientos]
  );

  const deleteMovimiento = useCallback(
    (index) => {
      setMovimientosMap((prev) => {
        const current = prev[periodo] || periodoData.movimientos || [];
        return { ...prev, [periodo]: current.filter((_, i) => i !== index) };
      });
    },
    [periodo, periodoData.movimientos]
  );

  return {
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
  };
}
